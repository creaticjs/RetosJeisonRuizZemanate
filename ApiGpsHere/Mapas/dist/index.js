 var basedeDatos
  var datosFirebase;
  // Initialize Firebase
var config = {
 apiKey: "AIzaSyAJuk6713qP9OF4owHVYRYOMYKJcQb_QKQ",
 authDomain: "gpsnode-erueka.firebaseapp.com",
 databaseURL: "https://gpsnode-erueka.firebaseio.com",
 projectId: "gpsnode-erueka",
 storageBucket: "gpsnode-erueka.appspot.com",
 messagingSenderId: "252376198761"
};

firebase.initializeApp(config);

 basedeDatos = firebase.database();
 var ref =  basedeDatos.ref("EurekaTechnology");

ref.orderByChild("tipo").on("child_added", function(snapshot){
//repite el proceso como cuantas referencias encuentre y los asigna a la lista "d"
     
  var d = snapshot.val();     
/*  $('#mensajes').append(`</p><p>${data.val().body}<p/>`);
 });*/
 datosFirebase=  d;

 console.log("Firebase: ");
console.log(datosFirebase);
console.log("Latitud: ");
console.log(datosFirebase.data[0]);
console.log("Longitud: ");
console.log(datosFirebase.data[1]);


(function () {
    'use strict';
    
    var app_id = "3SLTlzLjpUjIAssqyDmi";
    var app_code = "HP2Z0U8o4pljWZctTWQYCg";
    
    var tollExtUrl = "https://tce.cit.api.here.com/2/calculateroute.json";
    
    // Initialize communication with the platform, to access your own data, change the values below
    // https://developer.here.com/documentation/geovisualization/topics/getting-credentials.html
    
    // We recommend you use the CIT environment. Find more details on our platforms below
    // https://developer.here.com/documentation/map-tile/common/request-cit-environment-rest.html
    
    const platform = new H.service.Platform({
        app_id,
        app_code,
        useCIT: true,
        useHTTPS: true
    });
    
    const COLORS = {
        fastest: '#08ea94',
        cheapest: '#c37e63'
    };
    
    //initialize a map
    const pixelRatio = devicePixelRatio > 1 ? 2 : 1;
    let defaultLayers = platform.createDefaultLayers({tileSize: 256 * pixelRatio});
    let mapTileService = platform.getMapTileService({'type': 'base'});
    let fleetStyleLayer = mapTileService.createTileLayer(
        'maptile',
        'reduced.night',
        256 * pixelRatio,
        'png8',
        {ppi: pixelRatio > 1 ? 320 : 100}
    );
    const map = new H.Map(
        document.getElementsByClassName('dl-map')[0],
        fleetStyleLayer,
        {pixelRatio}
    );
    
    window.addEventListener('resize', function() {
        map.getViewPort().resize();
    });
    
    //make the map interactive
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    let ui = H.ui.UI.createDefault(map, defaultLayers);
    ui.removeControl('mapsettings');
    
    const startPoint = {
        lat: datosFirebase.data[0],
        lon:  datosFirebase.data[1]
    };
    const endPoint = {
        lat: datosFirebase.data[0],
        lon: datosFirebase.data[1]
    };
    
    //set map bounds
    map.setViewBounds(new H.geo.Rect(
        endPoint.lat, endPoint.lon,
        startPoint.lat, startPoint.lon
    ), false);
    
    const routingService = platform.getRoutingService();
    let cheapestRouteProvider = null;
    let fastestRouteProvider = null;
    let duration = {};
    let cost = {};
    let distance = {};
    let layers = {};
    let vspec = '3;0;0;2;0;0;5;340;0;7500;7500;0;0;0;1;4;1;0';
    
    function createLayer(provider, strokeColor, dataToRows) {
        const lineWidthScale = d3.scalePow().exponent(2).domain([10, 20]).range([7, 20]);
        return new H.datalens.ObjectLayer(
            provider, {
                pixelRatio,
                dataToRows(rows) {
                    return rows.map((row, k) => {
                        if (!k) {
                            return;
                        }
                        const prevRow = rows[k - 1];
                        return {
                            strip: new H.geo.Strip([
                                parseFloat(prevRow.split(',')[0]),
                                parseFloat(prevRow.split(',')[1]),
                                0,
                                parseFloat(row.split(',')[0]),
                                parseFloat(row.split(',')[1]),
                                0
                            ]),
                            row: prevRow
                        }
                    }).filter(Boolean);
                },
                rowToMapObject({strip}) {
                    return new H.map.Polyline(strip);
                },
                rowToStyle({row}, zoom) {
                    let lineWidth = lineWidthScale(zoom);
                    if (lineWidth < 1) {
                        lineWidth = 1;
                    }
                    return {
                        style: {
                            lineWidth,
                            strokeColor
                        }
                    }
                }
            }
        );
    }
    
    function calculateFastestRoute() {
        return new Promise((resolve, reject) => {
                routingService.calculateRoute({
                    mode: 'fastest;truck',
                    representation: 'display',
                    routeattributes : 'waypoints,summary',
                    waypoint0: startPoint.lat + ',' + startPoint.lon,
                    waypoint1: endPoint.lat   + ',' + endPoint.lon
                },  (routing) => {
                    let data = routing.response.route[0];
                    resolve(data);
    
                    distance.fastest = (data.summary.distance/1000).toFixed(2);
                    duration.fastest = (data.summary.travelTime/3600).toFixed(2);
                },(err) => {
                    reject(err);
                }
            );
        });
    }
    
    calculateFastestRoute().then((data) => {
        fastestRouteProvider = new H.datalens.Provider(data.shape);
        layers.fastest = createLayer(fastestRouteProvider, COLORS.fastest);
        map.addLayer(layers.fastest);
    });
    
    /**
     *
     * @param {object} from
     * @param {object} to
     */
    function calculateCheapestRoute(from, to) {
        let params = {
            app_id,
            app_code,
            cost_optimize: 1, // 1: get the route with lowest overall cost
            mode: 'fastest;truck',
            currency: 'EUR',
            vspec,
            representation: 'display',
            waypoint0: from.lat + ',' + from.lon,
            waypoint1: to.lat   + ',' + to.lon
        };
    
        let urlParams = Object.keys(params).map((i) =>
            i + '=' + params[i]
        ).join('&');
    
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', `${tollExtUrl}?${urlParams}`, true);
            request.onload = () => {
                if (request.status == 200) {
                    let data = JSON.parse(request.response).response.route[0];
                    let formattedData = data.leg[0].link.map((row) => {
                        return row.shape.map((r, k, arr) => {
                            if (k === 0 || k % 2) {
                                return;
                            }
                            return arr[k] + ',' + arr[k-1];
                        }).filter(Boolean).reduce((cur, prev) => {
                            return prev.concat(cur);
                        }, []);
                    }).filter(Boolean);
    
                    // Distance is returned in meters
                    distance.cheapest = (data.summary.distance/1000).toFixed(2);
                    duration.cheapest = (data.summary.travelTime/3600).toFixed(2);
                    cost = JSON.parse(request.response).costs;
    
                    setHtml();
    
                    resolve(formattedData);
                } else {
                    reject(new Error(`An error occurred while
                                        loading the toll service`));
                }
            };
            request.send();
        });
    }
    
    calculateCheapestRoute(startPoint, endPoint).then((data) => {
        cheapestRouteProvider = new H.datalens.Provider(data);
        layers.cheapest = createLayer(cheapestRouteProvider, COLORS.cheapest);
        map.addLayer(layers.cheapest);
    });
    
    map.addEventListener('tap', (event) => {
        let point = map.screenToGeo(event.currentPointer.viewportX,
                                    event.currentPointer.viewportY);
        endPoint.lat = point.lat;
        endPoint.lon = point.lng;
    
        calculateCheapestRoute(startPoint, endPoint).then((data) => {
            cheapestRouteProvider.setData(data);
        });
        calculateFastestRoute().then((data) => {
            fastestRouteProvider.setData(data.shape);
        });
    });
    
    // init legend panel
    let panel = new Panel('Truck Routing');
    ui.addControl('panel', panel);
    const multiselectLabel = new Label();
    const multiselect = new Multiselect(Object.keys(COLORS).reduce(
        (values, v) => {
            values[v] = `<span style="color: ${
                COLORS[v]
            }">${v}</span>`;
            return values;
        }, {}
    ));
    panel.addChild(multiselectLabel);
    multiselectLabel.setHTML(`Route selection between Munich and Innsbruck`);
    
    panel.addChild(multiselect);
    multiselect.addEventListener('change', () => {
        let values = multiselect.getValue();
        (Object.keys(layers)).forEach(value => {
            map.removeLayer(layers[value]);
            if (values.indexOf(value) !== -1) {
                map.addLayer(layers[value]);
            }
        });
    });
    
    let transportModeLabel = new Label();
    panel.addChild(transportModeLabel);
    transportModeLabel.setHTML('Select type of truck');
    
    let transportModeSelect = new Select({
        smallTruck: 'Truck 7,5t',
        truck: 'Truck 11t',
    });
    panel.addChild(transportModeSelect);
    transportModeSelect.addEventListener('change', (e) => {
        let opts = {
            smallTruck: '3;0;0;2;0;0;5;340;0;7500;7500;0;0;0;1;4;1;0',
            truck: '3;2;1;2;3;0;5;400;400;11000;11000;0;0;0;1;4;1;0'
        };
        vspec = opts[transportModeSelect.getValue()];
        calculateCheapestRoute(startPoint, endPoint).then((data) => {
            cheapestRouteProvider.setData(data);
        });
    });
    
    let infoPanel = new Label();
    panel.addChild(infoPanel);
    
    // for now placeholders, values will come
    function setHtml() {
        infoPanel.setHTML(`
            <h3>Duration</h3>
            <span style="color:${COLORS.fastest}">${duration.fastest}h</span>&nbsp;
            <span style="color:${COLORS.cheapest}">${duration.cheapest}h</span>
            <h3>Cost</h3>
            <span style="color:${COLORS.cheapest}">${cost.totalCost} \u20AC </span>
            <h3>Distance</h3>
            <span style="color:${COLORS.fastest}">${distance.fastest}km </span>&nbsp;
            <span style="color:${COLORS.cheapest}">${distance.cheapest}km </span>
        `);
    }
    
    }());


//cierre firebase
});


