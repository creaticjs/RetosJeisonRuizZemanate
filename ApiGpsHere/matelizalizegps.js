
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
});

