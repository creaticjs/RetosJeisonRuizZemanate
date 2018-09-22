//CONSOLAAAAA GOOGLE

//JQUERY ATRIBUTOS 

$('a');
$('a').attr('href'); "http://crezionsoftware.com"
$('a').attr('href','ada');  //PARA CAMBIAR EL ATRIBUTO DE ESTA ETIQUETA
$('a').attr('href'); "ada"

$('a').attr('href','http://crezionsoftware.com');   


SELECTORES 

 /* <a href="http://crezionsoftware.com">Link a la pgina</a>
    <div style="background: red"id="contenedor" >

        <p>Hola</p>
    </div>
    <div class="colorn">
        <p>COLOR N</p>
    </div>
    <div class="colorn">
            <p>COLOR N222</p>
        </div>*/

 $('#contenedor').html('<p>Hola ke ace</p>');
 $('body').html('cualquiercosa');

 $('.colorn').html('<p>CAMBIOOO en clase colorn</p>');


$("input[name='nombre']").hide();
$("input[name='nombre']").show();

$("input,h1").hide();  //para ocultar
$("input,h1").show();


$('ul li'); // lista de varios elementos
$('ul li').filter('.colorn');
$('ul li').filter('.colorn').hide();
$('ul li').filter('.colorn').show(); //filtrar por la lista y los que tengan solo esa clase
$('ul li').first().text('CAMBIO'); // cambiar texto del primer elemento
$('ul li').filter('.colorn').text('CAMBIO'); // cambiar texto del primer elemento

$('ul li').eq(2).text(); // buscar por el indice del elemento.
$('ul li').eq(2).text('PATO'); // buscar por el indice del elemento. y lo cambia

$('body').find('input').eq(1).hide();

$('body').html(); //devuelve todo el codigo html

$('body').html(<h1>CAMBIOOO :O</h1>); //devuelve todo el codigo html y lo cambia por cambio :o

//CAMIBAR ATRIBUTOS CSS

$('h1').css({
    fontSize : "100px",
    color: 'red'
})

//cambiar etiqueta por diferentes clases
$('h1').addClass('colorn');

$('h1').toggleClass('colornormal');

$('h1').toggleClass('colornormal'); //o sino mejor con toggle

//eventooooooooooos

$('#saludo').trigger('click')

/*    $('#saludo').on('click',function(){
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
      alert('Un pato saludo');*/


      https://daneden.github.io/animate.css/
      www.enrique7mc.com/2016/05/lista-apis-publicas/