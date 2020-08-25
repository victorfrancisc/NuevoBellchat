

/* global speechSynthesis */




window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let reclogin = new webkitSpeechRecognition();
reclogin.lang = "es-ES";
reclogin.continuous = true;
reclogin.interimResults = false;
const results = "";
const frase = "";
const texto = "";
const fraseusuario = "";
const resultssuario = "";
var bandejaEs = false;
var ingrusuario = false;
var autoLogin = false;
var bandejapass = false;
var actimodal = false;
var apelli = false;
var nuevousuer = false;
var datos;

var comandos = ["inicio", "nuevo usuario", "ingresar usuario", "ingresar clave", "cerrar usuario", "manual",
    "cerrar clave", "limpiar usuario", "verificar usuario", "verificar clave", "limpiar clave", "confirmar usuario",
    "confirmar clave", "control final", "registrar nombre", "limpiar nombre", "cerrar nombre", "registrar apellido",
    "limpiar apellido", "cerrar apellido", "registrar usuario", "limpiar nuevo usuario", "cerrar nuevo usuario", "verificar datos"];



var user = ["name", "apell", "user", "pass", "dire", "pho", "eml"];


function inicislogin()
{
    if (bandejaEs === true)
    {
        reclogin.onresult = (event) =>
        {
            const resultslogin = event.results;
            const fraselogin = resultslogin[resultslogin.length - 1][0].transcript;
            var recolectdato=fraselogin.charAt(0).toLowerCase()+fraselogin.slice(1).toLowerCase();
            console.log(recolectdato);
            if (recolectdato.toString().trim() === vericom(recolectdato.toString().trim()))
            {
                switch (fraselogin.toLowerCase().toString().trim())
                {
                    case "inicio":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionar al página de inicio"));
                        reclogin.abort();
                        location.href = "./appmessages/faces/faces/index.xhtml";
                        break;

                    case "nuevo usuario":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Mostrando modal de ingreso del usuario"));
                        modal("a");
                        break;
                    case "manual":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionando a guia de control del sistema"));
                        reclogin.abort();
                        location.href = "";
                        break;
                    case "ingresar usuario":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionar al ingreso del Usuario"));
                        focusuario();
                        ingrusuario = true;
                        break;
                    case"cerrar usuario":
                        ingrusuario = false;
                        speechSynthesis.speak(new SpeechSynthesisUtterance("cerrar ingreso de usuario"));

                        break;

                    case "limpiar usuario":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("comenzando a borrar usuario"));
                        borra("textuser");
                        break;

                    case "ingresar clave":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionar al ingreso de la clave"));
                        focupass();
                        bandejapass = true;
                        break;
                    case "cerrar clave":
                        bandejapass = false;
                        speechSynthesis.speak(new SpeechSynthesisUtterance("cerrar ingreso de clave"));
                        break;
                    case "limpiar clave":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("comenzando a borrar clave"));
                        borra("textpassword");
                        break;

                    case "verificar usuario":
                        var usuariotex = document.getElementById("textuser");
                        speechSynthesis.speak(new SpeechSynthesisUtterance("el usuario que ha ingresado es " + usuariotex.value));
                        break;
                    case "verificar clave":
                        var passtex = document.getElementById("textpassword");
                        speechSynthesis.speak(new SpeechSynthesisUtterance("la clave que ha ingresado es " + passtex.value));
                        break;

                    case "registrar nombre":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Ingrese sus dos nombres"));
                        inseruser("name");
                        actimodal = true;
                        break;
                    case "limpiar nombre":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("limpiando nombres"));
                        borra("name");
                        break;
                    case "cerrar nombre":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("cerrando nombres"));
                        actimodal = false;
                        cambiocolor("name")
                        break;

                    case "registrar apellido":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Ingrese sus dos apellidos"));
                        inseruser("apell");
                        apelli = true;
                        break;
                    case "limpiar apellido":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("limpiando nombres"));
                        borra("apell");
                        break;
                    case "cerrar apellido":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("cerrando nombres"));
                        apelli = false;
                        cambiocolor("apell");
                        break;

                    case "registrar usuario":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Ingrese el nuevo usuario"));
                        inseruser("user");
                        nuevousuer = true;
                        break;
                    case "limpiar nuevo usuario":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("limpiando usuario"));
                        borra("user");
                        break;
                    case "cerrar nuevo usuario":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("cerrando usuario"));
                        nuevousuer = false;
                        cambiocolor("user");
                        break;

                    case "verificar datos":
                        login();
                        break;
                    case "control final":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Cerrando control de voz automatico"));
                        reclogin.abort();
                        bandejaEs = false;
                        break;


                }
            }
            if (ingrusuario === true)
            {
                if (recolectdato.toString().trim() !== "ingresar usuario" && recolectdato.toString().trim() !== "limpiar usuario")
                {

                    document.getElementById("textuser").value += fraselogin;
                }
            }
            if (bandejapass === true)
            {
                if (recolectdato.toString().trim() !== "ingresar clave")
                {

                    document.getElementById("textpassword").value += fraselogin;
                }

            }
            if (actimodal === true)
            {
                if (recolectdato.toString().trim() !== "registrar nombre" && recolectdato.toString().trim() !== "limpiar nombre")
                {
                    document.getElementById("name").value += fraselogin;
                }
            }
            if (apelli === true)
            {
                if (fraselogin.toString().trim() !== "registrar apellido" && fraselogin.toString().trim() !== "limpiar apellido")
                {
                    document.getElementById("apell").value += fraselogin;
                }

            }
            if (nuevousuer === true)
            {
                if (recolectdato.toString().trim() !== "registrar usuario" && recolectdato.toString().trim() !== "limpiar nuevo usuario")
                {
                    document.getElementById("user").value += fraselogin;
                }

            }
        };
    }



}
function ingresodeUsuario()
{

}


function borra(id)
{
    if (id === "textuser")
    {
        bandejaEs = false;
        document.getElementById(id).value = "";
    }
    if (id === "textpassword")
    {
        bandejapass = false;
        document.getElementById(id).value = "";

    }
    if (id === "name")
    {
        actimodal = false;
        document.getElementById(id).value = "";

    }
    if (id === "apell")
    {
        apelli = false;
        document.getElementById(id).value = "";

    }

    if (id === "user")
    {
        apelli = false;
        document.getElementById(id).value = "";

    }

}

function focusuario()
{
    document.getElementById("textuser").focus();
    document.getElementById("textuser").style.border = "red solid 1px";
    if (document.getElementById("textpassword").length > 0)
    {
        document.getElementById("textpassword").style.border = "black solid 1px";
    }
}
function focupass()
{
    document.getElementById("textuser").style.border = "black solid 1px";
    document.getElementById("textpassword").focus();
    document.getElementById("textpassword").style.border = "red solid 1px";
    if (document.getElementById("textuser").length > 0)
    {
        document.getElementById("textuser").style.border = "black solid 1px";
    }
}
function inseruser(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).style.border = "red solid 1px";

}
function cambiocolor(id)
{
    document.getElementById(id).style.border = "black solid 1px";
}

document.getElementById('bntStar').addEventListener("click", () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance("iniciando control de voz"));
    reclogin.start();
    inicislogin();
});

document.getElementById('bntmuteLogin').addEventListener("click", () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance("Cerrando control de voz"));
    reclogin.abort();

});
window.onload = function () {
    autoLogin = true;
    bandejaEs = true;
    reclogin.start();
    inicislogin();
};

function vericom(comando)
{
    for (var Co = 0; Co < comandos.length; Co++)
    {
        if (comandos[Co] === comando)
        {
            return comando;
        }
    }

}
