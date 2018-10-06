console.log('Inicio');
$(function(){
 var imgcard="";
 var infocard= document.getElementById('infoCard');
 var infoCard="";
  //carrusel 
    var instance = M.Carousel.init({
        fullWidth: true,
        indicators: true
      });
    
      // Or with jQuery
    
      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });

      
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'right'
    });
  });
       


  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();

    

  });



  ////// selec ciudad para pronostico clima
  var selCiudad = document.getElementById("selCiudad");

   selCiudad.onchange = function ()
  {
   //document.getElementById("nombre").innerHTML = this.value;
  //console.log();
  var nomCiudad=this.options[this.selectedIndex].text;  // obtengo el nombre de la ciudad del objeto ontenido en la peticion ajax
  
  console.log(nomCiudad);  

  var nomCSelec=nomCiudad.toLowerCase();; // pasar a minusculas
  
  console.log(nomCSelec); 
  
  ////////para limpiar la cadena de caracteres especiales y tildes
  function getCleanedString(cadena){
    // Definimos los caracteres que queremos eliminar
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
 
    // Los eliminamos todos
    for (var i = 0; i < specialChars.length; i++) {
        cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }   
 
    // Lo queremos devolver limpio en minusculas
    cadena = cadena.toLowerCase();
 
    // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
    cadena = cadena.replace(/ /g,"_");
 
    // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi,"a");
    cadena = cadena.replace(/é/gi,"e");
    cadena = cadena.replace(/í/gi,"i");
    cadena = cadena.replace(/ó/gi,"o");
    cadena = cadena.replace(/ú/gi,"u");
    cadena = cadena.replace(/ñ/gi,"n");
    return cadena;
 }
////

//
 nomCSelec = getCleanedString(nomCSelec); // funcion de limpiar cadena de texto
 console.log(nomCSelec); 

 //pregunto si es determinada ciudad

  if(nomCSelec =="popayan")
  {
    latCiudad= 2.433;
    longCiudad= -76.617;
    imgcard= "Imagenes/Popayan.jpg";
    
  }

  if(nomCSelec =="cali")
  {

    latCiudad= 3.43722;
    longCiudad= -76.5225;
    imgcard= "Imagenes/cali.jpeg";
   
  }

  if(nomCSelec =="medellin")
  {
    latCiudad= 6.268844;
    longCiudad= -75.6664322;
    imgcard= "Imagenes/medellin.jpg";
  
 
  }

  if(nomCSelec =="bogota")
  {
    latCiudad= 4.6097102;
    longCiudad= -74.081749;
    imgcard= "Imagenes/bogota.jpg";
   
  }

  if(nomCSelec =="cartagena")
  {
    latCiudad= 10.3997200;
    longCiudad= -75.5144400;
    imgcard= "Imagenes/cartagena.jpg";
    
 
  }

 
  peticionPromesaUrl(latCiudad,longCiudad,imgcard); 

  
//contenido card html img
    $("#imgCardCiudad").attr("src",imgcard); 

  
  console.log(imgcard);
}

if(selCiudad.value=="")
{
  $("#imgCardCiudad").attr("src","Imagenes/LocalizacionEurekaHere.png"); 
 
}




   //$('#saludo').click(saludito);
   //$('#saludo').on('click',function(){
      
});

function peticionPromesaUrl(latCiudad,longCiudad){

  peticion('https://weather.cit.api.here.com/weather/1.0/report.json',latCiudad,longCiudad) //URL PARA API CLIMA
  .then(function(data){
      console.log(data);

      var ciudad= document.getElementById('ciudad');
      var ciudad2= document.getElementById('ciudad2');
      var ciudad3= document.getElementById('ciudad3');
    
      var climita= data.observations.location[0];
      console.log(climita);
    
      var auxC = "";
      var auxC2 = "";
      var auxC3 = "";
      auxC += climita.city+"<i class='material-icons right '> more_vert</i> </span>";
      auxC2 += climita.city+"<i class='material-icons right'>close</i></span>";
      
      auxC3 += "<br> Pais: "+climita.country+"<br>Distancia: "+climita.distance+"<br>Latitud: "+climita.latitude+"<br>Longitud: "+climita.longitude+"<br>Departamento: "
      +climita.state +"<br>Zona Horaria: "+climita.timezone+"<br>";
     
   
     ciudad.innerHTML =  auxC ;
     ciudad2.innerHTML =  auxC2 ;
     ciudad3.innerHTML =  auxC3 ;

     

  })
  .catch(function(err){
   console.log(err);
  })

}

function peticion(url,latCiudad,longCiudad,param){


    return new Promise(function (resolve,reject) {  

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            data: {
              product: 'observation',
              latitude:`${latCiudad}`,
              longitude: `${longCiudad}`,
              oneobservation: 'true',
              app_id: '3SLTlzLjpUjIAssqyDmi',
              app_code: 'HP2Z0U8o4pljWZctTWQYCg'
            },
            success: function (data) {
              alert(JSON.stringify(data));
            }
          })

   .done(function (data) {
  resolve(data);



     })

.fail(function(){

reject("ERROR 🎇")
})      

.always(function(){
    console.log('Always')
});


    });

 //   $('#loading').show();


}

