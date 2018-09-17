$(function () {
  function parseTableHeaders() {
    var tableHeaders = $('#results thead th');
    var headers = [];
    for (var i=1; i<tableHeaders.length; i++) {
      headers.push($(tableHeaders[i]).text());
    }
    return headers;
  }

  function parseTableTeamScore($team, headers) {
    var score = {};
    var tableScores = $team.find('td');
    for (var i=1; i<tableScores.length; i++) {
      score[headers[i-1]] = parseInt($(tableScores[i]).text())
    }
    return score;
  }

  function parseScoreUntilNow() {
    var headers = parseTableHeaders();
    var score = {};
    var teams = $('#results tbody tr');
    for (var i=0; i<teams.length; i++) {
      var $team = $(teams[i]);
      var teamName = $team.data('name');
      var teamScore = parseTableTeamScore($team, headers);
      score[teamName] = teamScore;
    }
    return score;
  }

  var scoreUntilNow = parseScoreUntilNow();

  function isNonNegativeInteger(str) {
    var parsed = parseInt(str);
    return !isNaN(parsed) && parsed >= 0
  }

  function matchPrediction($match) {
    var teams = $match.find('input');
    var prediction = {isValid: false, teams: [], score: [], raw: []};
    for (var i=0; i < teams.length; i++) {
      var $team = $(teams[i]);
      var value = $team.val();
      prediction.raw.push(value);
      prediction.isValid = prediction.isValid || value.length > 0;
      var score = parseInt(value);
      score = isNaN(score) ? 0 : score;
      prediction.score.push(score);
      var name = $team.attr('name');
      prediction.teams.push(name);
    }
    return prediction;
  }

  function predictionsForDate(dateSelector) {
    var matches = $(dateSelector).find('.match');
    var predictions = [];
    for (var j=0; j<matches.length; j++) {
      var prediction = matchPrediction($(matches[j]));
      if (prediction.isValid) {
        predictions.push(prediction)
      }
    }
    return predictions;
  }

  function validateInput(e) {
    var $input = $(e.currentTarget);
    var isValidInput = isNonNegativeInteger($input.val());
    if (isValidInput) {
      // TODO: shift+tab ?
      if (parseInt($input.val()) > 9) {
        $input.val(9);
      }
      focusNextInput(e.currentTarget);
    } else {
      $input.val('');
    }
  }

  function enableDate18IfNecessary(predictionForDate17) {
    var date18button = $('#date-selector span[data-target="date-18"]');
    var previousPredictionIsComplete = predictionForDate17.length == 5;
    for (var i=0; i<predictionForDate17.length; i++) {
      var matchPrediction = predictionForDate17[i];
      previousPredictionIsComplete = (previousPredictionIsComplete
        && matchPrediction.raw[0].length > 0
        && matchPrediction.raw[1].length > 0
      );
    }
    if (date18button.hasClass('disabled') && previousPredictionIsComplete) {
      selectDate({currentTarget: date18button});
      $(window).scrollTop(0);
    }
  }

  var sendedEvents = {};
  function sendAnalyticsEvents(predictions, prefix) {
    for (var i=0; i<predictions.length; i++) {
      var prediction = predictions[i];
      var isValid = prediction.raw[0].length > 0 && prediction.raw[1].length > 0;
      if (isValid) {
        var key = prefix + prediction.teams[0] + '-' + prediction.teams[1];
        var value = prediction.score[0].toString() + '-' + prediction.score[1].toString();
        if (sendedEvents[key] !== value) {
          sendedEvents[key] = value;
          ga('send', 'event', key, value);
        }
      }
    }
  }

  function updateTable(e) {
    var predictionsForDate17 = predictionsForDate('#date-17');
    sendAnalyticsEvents(predictionsForDate17, 'fecha17-')
    enableDate18IfNecessary(predictionsForDate17);
    var predictionsForDate18 = predictionsForDate('#date-18');
    sendAnalyticsEvents(predictionsForDate18, 'fecha18-')
    predictions = predictionsForDate17.concat(predictionsForDate18);
    var newScore = combineScoreWithPredictions(scoreUntilNow, predictions);
    renderTable(newScore);
    reorderTable(newScore);
    validateInput(e)
  }

  function updatePJ(score, team) {
    score[team]['PJ'] += 1;
  }

  function updatePG(score, team) {
    score[team]['PG'] += 1;
  }

  function updatePP(score, team) {
    score[team]['PP'] += 1;
  }

  function updatePE(score, team) {
    score[team]['PE'] += 1;
  }

  function updateGF(score, team, amount) {
    score[team]['GF'] += amount;
  }

  function updateGC(score, team, amountAgainst) {
    score[team]['GC'] += amountAgainst;
  }

  function updateDG(score, team) {
    score[team]['DG'] = score[team]['GF'] - score[team]['GC'];
  }

  function updatePTs(score, team) {
    score[team]['PTs'] = score[team]['PG'] * 3 + score[team]['PE'];
  }

  function combineScoreWithPredictions(score, predictions) {
    var newScore = $.extend(true, {}, score);
    for (var i=0; i<predictions.length; i++) {
      for (var j=0; j<2; j++) {
        var teamName = predictions[i].teams[j];
        updatePJ(newScore, teamName);
        var thisTeamScore = predictions[i].score[j];
        var otherTeamScore = predictions[i].score[(j+1)%2];
        if (thisTeamScore > otherTeamScore) {
          updatePG(newScore, teamName);
        } else if (thisTeamScore < otherTeamScore) {
          updatePP(newScore, teamName);
        } else {
          updatePE(newScore, teamName);
        }
        updateGF(newScore, teamName, thisTeamScore);
        updateGC(newScore, teamName, otherTeamScore);
        updateDG(newScore, teamName);
        updatePTs(newScore, teamName);
      }
    }
    return newScore;
  }

  function renderTable(score) {
    var tableRows = $('#results tbody tr');
    var headers = parseTableHeaders();
    for (var i=0; i<tableRows.length; i++) {
      var row = $(tableRows[i]);
      var teamName = row.data('name');
      var cols = row.find('td');
      for (var j=1; j<cols.length; j++) {
        $(cols[j]).text(score[teamName][headers[j-1]]);
      }
    }
  }

  function reorderTable(score) {
    var rows = $('#results tbody tr');
    rows.sort(function (a, b) {
      // (return 1) == teamB is above teamA
      var teamA = $(a).data('name');
      var teamB = $(b).data('name');
      if (score[teamA]['PTs'] > score[teamB]['PTs']) {
        return -1
      } else if (score[teamA]['PTs'] < score[teamB]['PTs']) {
        return 1
      } else if (score[teamA]['DG'] > score[teamB]['DG']) {
        return -1
      } else if (score[teamA]['DG'] < score[teamB]['DG']) {
        return 1
      } else if (score[teamA]['GF'] > score[teamB]['GF']) {
        return -1
      } else if (score[teamA]['GF'] < score[teamB]['GF']) {
        return 1
      }
      // TODO
      return 0
    });
    $('#results tbody').html(rows);
  }

  function selectDate(e) {
    var dateButton = $(e.currentTarget);
    dateButton.removeClass('disabled').addClass('selected');
    dateButton.siblings().removeClass('selected');

    var dateContainer = $('#' + $(e.currentTarget).data('target'));
    dateContainer.removeClass('hidden')
    $(dateContainer.find('input')[0]).focus();
    dateContainer.siblings('.date-matches').addClass('hidden');
  };

  function focusNextInput(input) {
    var $input = $(input);
    var nextInputSibling = $input.nextAll('input');
    if (nextInputSibling.length > 0) {
      nextInputSibling.focus();
    } else {
      $($input.parent().next().find('input')[0]).focus();
    }
  }

  function hideOnboarding() {
    $('#onboarding').addClass('hidden');
    $('#date-18 input[name="ecuador"]').focus();
  }

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;
  })(window,document,'script','','ga');
  ga('create', 'UA-103783679-1', 'auto');
  ga('send', 'pageview');

  $('#matches input').on('keyup paste', updateTable);
  $('#date-selector span').on('click', selectDate)
  $('#start-playing').on('click', hideOnboarding);
})
