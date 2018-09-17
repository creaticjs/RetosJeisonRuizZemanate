var datosperfil={};
        
function getRequestGit(){
    var peticion  = new  XMLHttpRequest();
    peticion.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            datosperfil = JSON.parse(this.responseText)
            document.getElementById('nombre').innerHTML = datosperfil.name
            document.getElementById('bio').innerHTML = datosperfil.bio
            var imagen=document.getElementById('avatar');
            imagen.setAttribute('src',datosperfil.avatar_url)
            console.log(datosperfil);
            renderRepositorios(datosperfil.repos_url);
        }
    }
    peticion.open('GET','https://api.github.com/users/jeisonsrz',true);
    peticion.send();
}
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("pagina Cargada🤠");
    getRequestGit();
});
function renderRepositorios(url){
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState==4 && this.status == 200){
            data = JSON.parse(this.responseText);
            document.getElementById('repositorios').innerHTML = this.responseText;
        }
    }
    req.open('GET',url,true);
    req.send();
}