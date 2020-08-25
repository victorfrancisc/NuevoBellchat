

/* global speechSynthesis */

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let rectext = new webkitSpeechRecognition();
rectext.lang = "es-ES";
rectext.continuous = true;
rectext.interimResults = false;
var bandera = false;
var comandosms = ["borrar mensaje", "verificar mensaje", "enviar mensaje", "escribir mensaje", "fin del mensaje", "control final"];
var escribir = false;
function inicipasedevoz()
{

    rectext.onresult = (event) =>
    {
        const results = event.results;
        var frasesms = results[results.length - 1][0].transcript;
        var recolect=frasesms.charAt(0).toLowerCase()+frasesms.slice(1).toLowerCase();
          console.log(recolect);
        if (recolect.toString().trim() === verificarsms(recolect.trim()))
        {
            switch (recolect.toString().trim())
            {
                case "enviar mensaje":
                    break;
                case "escribir mensaje":
                    speechSynthesis.speak(new SpeechSynthesisUtterance("Dictar mensaje"));
                    document.getElementById("textsend").focus();
                    escribir = true;
                    break;
                case "borrar mensaje":
                    speechSynthesis.speak(new SpeechSynthesisUtterance("borrando todo el mensaje"));
                    document.getElementById("textsend").value = "";
                    break;
                case "fin del mensaje":
                    speechSynthesis.speak(new SpeechSynthesisUtterance("cerrando ingreso de mensaje"));
                    escribir = false;
                    break;

                case "verificar mensaje":
                    speechSynthesis.speak(new SpeechSynthesisUtterance("reproduccir mensaje, " + document.getElementById("textsend").value));
                    break;
                case "control final":
                    speechSynthesis.speak(new SpeechSynthesisUtterance("cerrando control de voz").value);
                    rectext.abort();
                    break;
            }

        }

        if (escribir === true)
        {
            if (recolect.toString().trim() !== "escribir mensaje" && recolect.toString().trim() !== "borrar texto")
            {
                document.getElementById("textsend").value += recolect;
            }
        }


    };

}
function verificarsms(id)
{
    for (var Cosms = 0; Cosms < comandosms.length; Cosms++)
    {
        if (comandosms[Cosms] === id)
        {
            return id;
        }
    }

}
function control(id)
{
    document.getElementById(id).addEventListener("click", () => {
        speechSynthesis.speak(new SpeechSynthesisUtterance("iniciando control de voz"));
        rectext.start();
        bandera = true;
        inicipasedevoz();
    });

}
function closeauto(id)
{
    if (bandera !== false)
    {
        document.getElementById(id).addEventListener("click", () => {
            speechSynthesis.speak(new SpeechSynthesisUtterance("cerrando control de voz"));
            rectext.abort();
            bandera = false;

        });
    } else {
        speechSynthesis.speak(new SpeechSynthesisUtterance("No ha activado el control de voz"));
    }
}