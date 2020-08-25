/* global speechSynthesis */

function login()
{
    $.ajax({
        type: "POST",
        url: "../iniciarsesion",
        data: {user: document.getElementById("textuser").value,
            pass: document.getElementById("textpassword").value},
        success: function (response) {
            console.log(response);
            if (parseInt(response) > 0)
            {
                window.location.href ='../pages/messages.xhtml?id=' + response;
                console.log("excelente");
            } else
            {
                 speechSynthesis.speak(new SpeechSynthesisUtterance("Datos incorrectos"));
            }
        }
    });
}
function modal(a)
{
    if (a === 'a')
        document.getElementById("mod").style.display = 'flex';
    else
        document.getElementById("mod").style.display = 'none';
}

function openfie()
{
    document.getElementById('ju:fileimp').click();
}
function onFileSelected() {
    var archivo = document.getElementById("ju:fileimp").files;
    var reader = new FileReader();
    if (archivo.length > 0) {
        reader.readAsDataURL(archivo[0]);
        reader.onloadend = function () {
            document.getElementById("imghh").src = reader.result;
        }
    }
}

function validateradio(a)
{

    if (a.id === "rdsi")
    {
        if (document.getElementById("rdno").checked) {
            document.getElementById("rdno").checked = false;
            document.getElementById("tp").disabled = false;
            document.getElementById("grd").disabled = false;
            document.getElementById("desc").disabled = false;
        }
    } else if (a.id === "rdno")
    {
        if (document.getElementById("rdsi").checked)
        {
            document.getElementById("rdsi").checked = false;
            document.getElementById("tp").disabled = true;
            document.getElementById("grd").disabled = true;
            document.getElementById("desc").disabled = true;
        }
    } else if (document.getElementById(a.id).checked)
    {
        document.getElementById(a.id).checked = false;
    }
}
function validate_fecha(fecha)
{
    var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
    if (fecha.search(patron) == 0)
    {
        var values = fecha.split("-");
        if (isValidDate(values[2], values[1], values[0]))
        {
            return true;
        }
    }
    return false;
}
function ja()
{
    validate_fecha(document.getElementById("fnc").value);
}
function savepeople()
{
    var json = {peoples: {}, credenciales: {}, discapacidad: {}};
    var per, cred, disc;
    var name = document.getElementById("name").value, apellido = document.getElementById("apell").value
            , dir = document.getElementById("dire").value, email = document.getElementById("eml").value, tele = document.getElementById("pho").value
            , fec = document.getElementById("fnc").value, user = document.getElementById("user").value, pass = document.getElementById("pass").value,
            disi = document.getElementById("rdsi").checked, disno = document.getElementById("rdno").checked
            , tipdis = document.getElementById("tp").value, grad = document.getElementById("grd").value,
            des = document.getElementById("desc").value;
    var sis = true, dis = false;
    if (name.length > 0 && apellido.length > 0 && dir.length > 0 && email.length > 0 && tele.length > 0 &&
            fec.length > 0 && user.length > 0 && pass.length > 0)
    {
        if (disi)
        {
            dis = true;
            if (tipdis > 0 && grad.length > 0)
            {
                per = {name: name, ape: apellido, dir: dir, email: email, tele: tele, fec: fec};

                cred = {user: user, pass: pass};

                disc = {tipo: tipdis, grado: grad, desc: des};
            } else
                sis = false;

        } else
        {
            dis = false;
            per = {name: name, ape: apellido, dir: dir, email: email, tele: tele, fec: fec};

            cred = {user: user, pass: pass};
            disc = {};
        }
        if (sis && dis)
        {
            json.peoples = per;
            json.credenciales = cred;
            json.discapacidad = disc;
        } else if (sis && dis === false)
        {
            json.peoples = per;
            json.credenciales = cred;
        } else {
            alert("algo anda mal xd.....");
            return;
        }
        $.ajax({
            type: "POST",
            url: "../registrar",
            data: {json: JSON.stringify(json)},
            success: function (response) {
                console.log('my ajax dice: ' + response);
                if (parseInt(response) > 0)
                {
                    document.getElementById("ju:idp").value = response;
                    document.getElementById("ju:btncom").click();
                    removealllogin();
                }
            }
        });

        console.log(json);
        alert("excelente");
    } else {
        alert("algo anda mal xd.....");
        return;
    }
}
function removealllogin()
{
    document.getElementById("name").value = '';
    document.getElementById("apell").value = '';
    document.getElementById("dire").value = '';
    document.getElementById("eml").value = '';
    document.getElementById("pho").value = '';
    document.getElementById("fnc").value = 'dd/mm/yyyy';
    document.getElementById("user").value = '';
    document.getElementById("pass").value = '';
    document.getElementById("rdsi").checked = false;
    document.getElementById("rdno").checked = true;
    document.getElementById("tp").disabled = true;
    document.getElementById("grd").disabled = true;
    document.getElementById("desc").disabled = true;
    document.getElementById("tp").value = '0';
    document.getElementById("grd").value = '';
    document.getElementById("desc").value = '';
}