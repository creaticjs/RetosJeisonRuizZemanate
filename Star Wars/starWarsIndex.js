 //para video
 "use strict";
var wrapper = $('.wrapper');
wrapper.scrollTop(50);

var vid2=document.getElementById("movie2");

wrapper.scroll(function(){
 var st = wrapper.scrollTop(); 

  if (st > 5)//you can change it according to your screen size 
 {vid2.pause();$("#movie2").addClass("animated hinge");}
  else
 {vid2.play(); $("#movie2").removeClass("animated hinge");}
  
});
 
/// 
 
        function getP(url){
            return new Promise(function(resolve, reject){
                var httpX = new XMLHttpRequest();
                httpX.onload = function(){
                    //console.log(this.responseText);
                    resolve(JSON.parse(this.responseText));
                }
                httpX.onerror = function(){
                    reject(Error('Error 🤮'));
                }
                httpX.open('GET',url,true);
                httpX.send()
            });
        }
        
        var usuarios = []; //promesas 
        var urls= ['https://swapi.co/api/vehicles/',
                'https://swapi.co/api/starships/',
                'https://swapi.co/api/films',
                'https://swapi.co/api/species/'];
                
        urls.forEach(function(url){
           usuarios.push( getP(url) ); 
        });
        //usuarios.then()
        Promise.all(usuarios)
        .then(function(data){
            console.log(data);
        })


//PARA SNIMACION STARWARS
/* Learn how to create this and much more with this email course:

https://cssanimation.rocks/courses/animation-101/

MANY THANKS TO @tadywankenobi for the following JS to handle the text in the byline:

The following JS takes in the byline and splits it into letters, each one wrapped in a span. We need to create the spans as nodes, we can't just add them to the HTML using innerHTML, as to do so would mean the CSS won't affect the span because it doesn't recognise the tag as existing. It's an old problem we run into time and again.

*/

var byline = document.getElementById('byline');  	// Find the H2
bylineText = byline.innerHTML;										// Get the content of the H2
bylineArr = bylineText.split('');									// Split content into array
byline.innerHTML = '';														// Empty current content

var span;					// Create variables to create elements
var letter;

for(i=0;i<bylineArr.length;i++){									// Loop for every letter
  span = document.createElement("span");					// Create a <span> element
  letter = document.createTextNode(bylineArr[i]);	// Create the letter
  if(bylineArr[i] == ' ') {												// If the letter is a space...
    byline.appendChild(letter);					// ...Add the space without a span
  } else {
		span.appendChild(letter);						// Add the letter to the span
  	byline.appendChild(span); 					// Add the span to the h2
  }
}
