//Se utiliza para hacer consultas al DOM
/*
console.log('Inicio');
$(function(){
console.log('Ready 🐕');
x=sumar(5,7);
console.log('La suma es '+ x);
});

function sumar (a,b) { 
    return a+b;
 }*/

 console.log('Inicio');
$(function(){

   // $('#saludo').click(saludito);
    $('#saludo').on('click',function(){
        console.log('Evento Eejcutado');
        
   var elem=$(this);
   elem.text('Cambioooo');
    })
    });

function saludito(e) {  
    //console.log(e);
 
   var elem=$(this);
   elem.text('Cambioooo');
   console.log(elem.text());
      alert('Un pato saludo');
}
