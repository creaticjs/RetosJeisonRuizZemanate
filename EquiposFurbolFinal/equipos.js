var cateFutbol=document.getElementById("categoriasObjeto");
var btn = document.getElementById('btn');
var form = document.getElementById("formulario");
var botonc = document.getElementById('crearEqui');
var fEstrellas = document.getElementById("estrellasF");
var fNombre = document.getElementById("letra");
var fUrlimage = document.getElementById("urlimageF");
var fDt = document.getElementById("dtF");
var fJugadores = document.getElementById("jugadoresF");
var fEstadioimg = document.getElementById("estadioF");
var fCategoria = document.getElementById("categoriaF");



var nEstrellas= "";

class EquipodeFutbol{

  constructor(estrellitas,nombre,urlimage,dt,juegadores,reseña,estadioimg,estadio,categoria){
      
      this.estrellitas = estrellitas;
      this.nombre= nombre;
      this.urlimage= urlimage;
      this.dt= dt;
      this.juegadores= juegadores;
      this.reseña= reseña;
      this.estadioimg= estadioimg;
      this.estadio=estadio;
      this.categoria=categoria;
  }

  mostrar(){

   cateFutbol.innerHTML=this.nombre;
  // document.cateFutbol.write("<br/> <strong>" + this.nombre + "</strong> <br/>");
    
      
  }

}


var equiposObjetos=[];

equiposObjetos.push(new EquipodeFutbol("🌟🌟🌟🌟🌟","Nacional","imagenes/logoNacional.png","Almidon Nacional",["matias","carebata","panseroti","carroLoco","yucaFrita"],"Reseña Equipo","imagenes/estadioNacional.jpg","Estadio Atanasio Girardot","Categoria A"));
equiposObjetos.push(new EquipodeFutbol("🌟🌟🌟","America","imagenes/logoAmerica.png","Americanito DT",["Caballon","Arepudo","Salchipapa","Mazamorra","Rosconsito"],"El americano","imagenes/estadioAmerica.jpg","Estadio Pascual Guerrero","Categoria B"));
equiposObjetos.push(new EquipodeFutbol("🌟","Millonarios","imagenes/logoMillonarios.png","Millonariesito DT",["Millonariesito1","Millonariesito2","Millonariesito3","Millonariesito4","Millonariesito5"],"El americano","imagenes/estadioMillonarios.jpg","Estadio El Campín","Categoria A"));
equiposObjetos.push(new EquipodeFutbol("🌟🌟🌟🌟🌟🌟🌟🌟","Tolima","imagenes/logoTolima.png","Tolimita DT",["Tolimon","Tolimudo","Tolinsote","Totoludo","Tokimon"],"El americano","imagenes/estadioTolima.jpg","Estadio Manuel Murillo Toro","Categoria B"));
equiposObjetos.push(new EquipodeFutbol("🌟🌟🌟🌟","Medellin","imagenes/logoMedellin.png","Medellinsito DT",["Medellino","Medilludo","Medillunsote","Medillinito","Medillonote"],"El americano","El medillinsito Estadio Atanasio Girardot","imagenes/estadioMedellin.jpg","Categoria A"));
equiposObjetos.push(new EquipodeFutbol("🌟🌟","Pasto","imagenes/logoPasto.png","Pastusito DT",["Paston","Pastusin","Pastico","Pastisal","Pastote"],"El americano","Estadio Departamental Libertad","imagenes/estadioPasto.jpg","Categoria B"));

equiposObjetos.push(new EquipodeFutbol("🌟🌟🌟🌟🌟","Cali","imagenes/logoPasto.png","Pastusito DT",["Paston","Pastusin","Pastico","Pastisal","Pastote"],"El americano","Estadio Departamental Libertad","imagenes/estadioPasto.jpg","Categoria B"));
equiposObjetos.push(new EquipodeFutbol("🌟🌟🌟","Junior","imagenes/logoPasto.png","Pastusito DT",["Paston","Pastusin","Pastico","Pastisal","Pastote"],"El americano","Estadio Departamental Libertad","imagenes/estadioPasto.jpg","Categoria B"));
equiposObjetos.push(new EquipodeFutbol("🌟🌟🌟🌟🌟","Equidad","imagenes/logoPasto.png","Pastusito DT",["Paston","Pastusin","Pastico","Pastisal","Pastote"],"El americano","Estadio Departamental Libertad","imagenes/estadioPasto.jpg","Categoria B"));
equiposObjetos.push(new EquipodeFutbol("🌟","Once Caldas","imagenes/logoPasto.png","Pastusito DT",["Paston","Pastusin","Pastico","Pastisal","Pastote"],"El americano","Estadio Departamental Libertad","imagenes/estadioPasto.jpg","Categoria B"));



var selCategoria = document.getElementById("equiposCategoria");



selCategoria.onchange = function ()
{
    x=this.options[this.selectedIndex].text;
    console.log(x);
    if(x == "Categoria A"){
        var catFutbol= equiposObjetos.filter(function(cateEquipos){
            return cateEquipos.categoria == "Categoria A";
          })
         
         
           //...
           var cTable = document.getElementById('cuerpoTabla')
           var auxT = "";
           catFutbol.forEach(function(equipo,index){
               auxT += "<tr><td>"+equipo.nombre+"</td><td>"+equipo.estrellitas+"</td><td>"+equipo.dt+"</td><td>"+equipo.juegadores+"</td><td>"+equipo.categoria+"</td><tr>";
           })
           cTable.innerHTML = auxT;

    }

    if(x=="Categoria B"){
        var catFutbol= equiposObjetos.filter(function(cateEquipos){
            return cateEquipos.categoria == "Categoria B";
          })
         
         
           //...
           var cTable = document.getElementById('cuerpoTabla')
           var auxT = "";
           catFutbol.forEach(function(equipo,index){
               auxT += "<tr><td>"+equipo.nombre+"</td><td>"+equipo.estrellitas+"</td><td>"+equipo.dt+"</td><td>"+equipo.juegadores+"</td><td>"+equipo.categoria+"</td><tr>"
           })
           cTable.innerHTML = auxT;

    }
 
}

function myFunction() {
    $(document).ready(function()
    {
       $("#mostrarmodal").modal("show");
    })
}
    


form.addEventListener('submit',function(e){
    e.preventDefault();
    

        dEstrella=parseInt(fEstrellas.value);

        for(var i=0;i<dEstrella;i++)
        {
            if(i==0)
            {
                nEstrellas= "";
            }
           nEstrellas= "🌟" + nEstrellas;
         
           
        }


        equiposObjetos.push(new EquipodeFutbol(nEstrellas,fNombre.value,fUrlimage.value,fDt.value,fJugadores.value,"Reseñaa","Estadio Departamental Libertad",fEstadioimg.value,"Categoria B")); 
});

