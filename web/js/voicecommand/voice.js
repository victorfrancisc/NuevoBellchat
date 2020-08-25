

/* global speechSynthesis */

var comandos = ["mensajes", "login", "registrar", "manual", "deslizar", "iniciar comando de voz", "control final"];



window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = new webkitSpeechRecognition();
rec.lang = "es-ES";
rec.continuous = true;
rec.interimResults = false;
const results = "";
const frase = "";
var auto = false;





function inici()
{

    if (auto === true)
    {
        rec.onresult = (event) =>
        {
            const results = event.results;
            const frase = results[results.length - 1][0].transcript;
            console.log(frase.toString());
            if (frase.toLowerCase().toString().trim() === vericom(frase.toString().trim()))
                switch (frase.toLowerCase().toString().trim())
                {
                    case "mensajes":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionando a la página de mensajes"));
                        rec.abort();
                        location.href = "http://localhost:8080/ProyectoVI/faces/pages/chat.xhtml";
                        break;

                    case "login":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionando a la página de login"));
                        rec.abort();
                        location.href = "./faces/pages/login.xhtml";
                        break;
                    case "registrar":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionando a la página de registrar"));
                        rec.abort();
                        location.href = "http://localhost:8080/ProyectoVI/faces/pages/pcheckin.xhtml";
                        break;

                    case "deslizar":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("deslizando"));
                        inciDespla();
                        break;
                    case "manual":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionando a guia de control del sistema"));
                        rec.abort();
                        location.href = "http://localhost:8080/ProyectoVI/faces/pages/Handbook.xhtml";
                        break;



                    case "control final":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Cerrando control de voz automatico"));
                        rec.abort();
                        auto = false;
                        break;

                }
        };
    }



}

document.getElementById('bntStar').addEventListener("click", () => {
    rec.abort();
    auto = false;
    speechSynthesis.speak(new SpeechSynthesisUtterance("iniciando control de voz"));
    rec.start();
    inici();
});

document.getElementById('bntmute').addEventListener("click", () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance("Cerrando control de voz"));
    rec.abort();

});

var timerId = 0;

window.onload = function () {
    auto = true;
    rec.start();
    inici();
};

function inciDespla()
{

    timerId = setInterval('dale()', 10);
    contador = 0;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
let  contador = 0;
function  dale()
{
    if (contador <= 1100)
    {
        document.body.scrollTop = document.documentElement.scrollTop = contador++;
        console.log("Vertical: " + window.scrollY);
    }
}

function stop()
{
    clearInterval(timerId);
}
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
