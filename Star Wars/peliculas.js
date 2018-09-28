/*
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
 {vid2.play(); $("#movie2").removeClass("animated hinge");

}
  
});
*/

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

           
    
        
            $(".modal-body iframe").remove();
            $('<iframe class="peliO"  frameborder="0" allowfullscreen></iframe>')
                .attr("src", `${peli}` )
                .appendTo(".modal-body")
                
            
            })

          $('#myModal').on('hidden.bs.modal', function () {
           
            $(".modal-body iframe").remove();
            $('<iframe class="peliO" frameborder="0" allowfullscreen></iframe>')
                .attr("src", "" )
                .appendTo(".modal-body")
                 
          })
    });

   //$('#saludo').click(saludito);
   //$('#saludo').on('click',function(){
       peticion('https://swapi.co/api/films')
       .then(function(data){
          //var peliculas=
           console.log(data);

          var peliculas=[];
          peliculas=data; 
  
          var imagenesPelis=['https://store.hmv.com/HMVStore/media/product/270866/01-270866.jpg','https://vignette.wikia.nocookie.net/starwars/images/9/98/Aotctpb.jpg/revision/latest?cb=20110206033257','https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg','https://images-na.ssl-images-amazon.com/images/I/51E9TTSPP9L.jpg','https://sc-events.s3.amazonaws.com/23367/4818681/58d3b2ae321ed9585528fbb6431d5bfa2d38fb20553fba7f30840a81e1c26b32/e9a66672-02a3-464d-8635-0208ad0f5a94.jpg','https://images-na.ssl-images-amazon.com/images/I/91%2BCydthCeL._SL1500_.jpg','https://img04.mgo-images.com/image/thumbnail?id=MMV483CF9EC6C8AADE3703CA236599AF02E0&ql=70&sizes=310x465']
              
        // console.log(imagenesPelis);

           var cTable = document.getElementById('cuerpoTabla');
           var auxT = "";
           peliculas.results.forEach(function(peliculas,index){
              
           var x=(imagenesPelis[index]);
          
          

                auxT += "<tr><td>"+peliculas.title+"</td><td>"+peliculas.episode_id+"</td><td>"+peliculas.director+"</td><td>"+peliculas.release_date+"</td><td>"+ `<img id="img2" src='${x}'  align="center" />` +"</td><td>"+index +"</td><tr>";
          
               
             // })
             
                })
           cTable.innerHTML = auxT;

          

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



 
