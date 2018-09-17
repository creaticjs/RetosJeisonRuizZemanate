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
            document.getElementById('company').innerHTML = datosperfil.company
            document.getElementById('location').innerHTML = datosperfil.location
            document.getElementById('public_repos').innerHTML = datosperfil.public_repos
            document.getElementById('followers').innerHTML = datosperfil.followers
            document.getElementById('following').innerHTML = datosperfil.following
            document.getElementById('fecha_de_creacion').innerHTML = datosperfil.created_at
            document.getElementById('ultima_Actualizacion').innerHTML = datosperfil.updated_at
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