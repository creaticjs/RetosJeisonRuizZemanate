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
        var urls= ['https://swapi.co/api/films'];
                
        urls.forEach(function(url){
           usuarios.push( getP(url) ); 
        });
        //usuarios.then()
        Promise.all(usuarios)
        .then(function(data){
            var peliculas=[];
            peliculas=data;
           
             //...
          var cTable = document.getElementById('cuerpoTabla')
          var auxT = "";
          peliculas.forEach(function(peliculas,index){
              auxT += "<tr><td>"+peliculas.title+"</td><td>"+peliculas.title+"</td><td>"+peliculas.title+"</td><td>"+peliculas.title+"</td><td>"+peliculas.title+"</td><tr>";
          })
          cTable.innerHTML = auxT;

          console.log(peliculas);
        })


         