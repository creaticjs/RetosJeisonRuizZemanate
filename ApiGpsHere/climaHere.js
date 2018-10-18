console.log('Inicio');
$(function(){
 var imgcard="";
 var infocard= document.getElementById('infoCard');
 var infoCard="";
 var descripcion="";

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
      direction: 'up'
    });
  });
       


  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();

    

  });

  ///texto en boton
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, options);
  });
  
  // Or with jQuery
  
  $(document).ready(function(){
    $('.tooltipped').tooltip();
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
switch(nomCSelec){

  case "popayan":
  
  latCiudad= 2.433;
  longCiudad= -76.617;
  imgcard= "Imagenes/Popayan.jpg";
  desPop ="Popayán es una ciudad ubicada en el oeste de Colombia, al sudoeste de Bogotá. Es conocida por sus edificios encalados de la época colonial y como centro religioso con procesiones populares de Semana Santa...."
  desCiu = desPop ;
  url = "https://es.wikipedia.org/wiki/Popay%C3%A1n";
  break
  
  case "cali":

  latCiudad= 3.43722;
  longCiudad= -76.5225;
  imgcard= "Imagenes/cali.jpeg";
  desCali= "Cali es una ciudad de Colombia situada en el departamento de Valle del Cauca, al sudoeste de Bogotá. Es famosa por la salsa y el gran número de discotecas del barrio de Juanchito. La catedral de San Pedro...."
  desCiu = desCali;
  break

  case "medellin":

  latCiudad= 6.268844;
  longCiudad= -75.6664322;
  imgcard= "Imagenes/medellin.jpg";
  desMed= "Medellín es la capital de la provincia montañosa de Antioquia (Colombia). Apodada la 'ciudad de la eterna primavera' por su clima templado, acoge anualmente la Feria de las Flores...."
  desCiu = desMed;
  break


  case "bogota":

  latCiudad= 4.6097102;
  longCiudad= -74.081749;
  imgcard= "Imagenes/bogota.jpg";
  break


  case "cartagena":

  latCiudad= 10.3997200;
  longCiudad= -75.5144400;
  imgcard= "Imagenes/cartagena.jpg";
  break

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
      var descipCiudad= document.getElementById('descripcionC');
      var climita= data.observations.location[0];
      console.log(climita);
    
      var auxC = "";
      var auxC2 = "";
      var auxC3 = "";

      if(climita.city==='Vereda El Patio'){
        climita.city='Medellín'
      }

      auxC += climita.city+"<i class='material-icons right '> more_vert</i> </span>";
      auxC2 += climita.city+"<i class='material-icons right'>close</i></span>";
      
      auxC3 += "<br> Pais: "+climita.country+"<br>Distancia: "+climita.distance+"<br>Latitud: "+climita.latitude+"<br>Longitud: "+climita.longitude+"<br>Departamento: "
      +climita.state +"<br>Zona Horaria: "+climita.timezone+"<br>";
     
   
     ciudad.innerHTML =  auxC ;
     ciudad2.innerHTML =  auxC2 ;
     ciudad3.innerHTML =  auxC3 ;
     var botoncito = "<a class='btn-floating btn-large waves-effect waves-light red'><i class='material-icons'>add</i></a>";
     descipCiudad.innerHTML =  desCiu + botoncito;
     

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

