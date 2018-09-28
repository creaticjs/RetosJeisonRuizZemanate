

console.log('Inicio');

$(function(){
        
   $('#cuerpoTabla').on('click', 'tr',function(){
    var peli="";
    var linkPeliculas=['https://www.rapidvideo.com/e/FMZDSIVUWN?c1_file=http://ver-pelis.me/subti/anuncio.srt&c1_label=Ver%20Pelis'
    ,'https://www.rapidvideo.com/e/FNHSGDTIJV?c1_file=http://ver-pelis.me/subti/anuncio.srt&c1_label=Ver%20Pelis',
    'https://www.rapidvideo.com/e/FMZDX1NA6Q?c1_file=http://ver-pelis.me/subti/anuncio.srt&c1_label=Ver%20Pelis',
    'https://www.rapidvideo.com/e/FUHAJT6YA3',
    'https://www.rapidvideo.com/e/FNJISHMQVU?c1_file=http://ver-pelis.me/subti/anuncio.srt&c1_label=Ver%20Pelis',
    'https://www.rapidvideo.com/e/FUHJMXCGCX',
    'https://www.rapidvideo.com/e/FP2SJB2X7C?c1_file=http://ver-pelis.me/subti/anuncio.srt&c1_label=Ver%20Pelis'
    ];
     
        $("#myModal").modal("show");
        
       
        var tp=$(this).closest('tr').children()[0].textContent;
        var xx=$(this).closest('tr').children()[5].textContent;

        $("#nomP").text(`${tp}`);

        $("#tituloP").text(`Has Click en El boton ▶ para ver la PELICULA: ${tp} 🎬 `);
        console.log(xx);

        switch (xx) {
            case "0":
            peli = linkPeliculas[xx];
          
                break;
            case "1":
            peli = linkPeliculas[xx];
                break;
            case "2":
            peli = linkPeliculas[xx];
                break;
            case "3":
            peli = linkPeliculas[xx];
                break;
            case "4":
            peli = linkPeliculas[xx];
                break;
            case "5":
            peli = linkPeliculas[xx];
                break;
            case "6":
                peli = linkPeliculas[xx];
                    break;
        }
       
        $('#myModal').on('shown.bs.modal', function () {


        
        })
          $('#myModal').on('hidden.bs.modal', function () {
           
         
                 
          })
    });

   //$('#saludo').click(saludito);
   //$('#saludo').on('click',function(){
       peticion('https://swapi.co/api/people/')
       .then(function(data){
          //var peliculas=
           console.log(data);

          var personaje=[];
          personaje=data; 
  
          var imagenesPelis=['https://bit.ly/2zE0d57','https://bit.ly/2xYv1eR','https://bit.ly/2R7qpvu','https://bit.ly/2Qh3LQ7','https://bit.ly/2Qj7nBj','https://bit.ly/2QdL3sH','https://bit.ly/2DM2hfc','https://bit.ly/2MDpj7q','https://bit.ly/2N9thox','https://bit.ly/2Isi5CQ']
              
        // console.log(imagenesPelis);

           var cTable = document.getElementById('cuerpoTabla');
           var auxT = "";
           personaje.results.forEach(function(personaje,index){
              
           var x=(imagenesPelis[index]);
          
          

                auxT += "<tr><td>"+personaje.name+"</td><td>"+personaje.birth_year+"</td><td>"+personaje.gender+"</td><td>"+personaje.height+"</td><td>"+ `<img id="img3" src='${x}'  align="center" />` +"</td><td>"+index +"</td><tr>";
          
               
          
             
                })
           cTable.innerHTML = auxT;

           var imagP = document.getElementById('imaP');
           var auxTp = `<img id="img3" src='${x}'  align="center" />`;
           imagP.innerHTML = auxTp;
           
         
         
           

          

       })
       .catch(function(err){
        console.log(err);
       })

   
});



function peticion(url,param){


    return new Promise(function (resolve,reject) {  


           $.ajax({
       type: "get",
       url: url,
       data:param,
       dataType: "json",
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



 

        