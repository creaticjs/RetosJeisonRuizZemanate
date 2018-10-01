function validacion(){

var nom = document.getElementById("UserName").value;
var pass = document.getElementById("Password").value;

if(nom == ""){
alert("Por favor Digite el Usuario. ")
return false;
}

if(pass == ""){
    alert("Por favor Digite su clave. ")
    return false;
}

if(nom=="jeison" && pass =="eureka"){
return true;
}


}