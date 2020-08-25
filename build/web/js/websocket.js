var Url;
var websocket;
//var textoenvio = document.getElementById("textsend");
var bandeja = document.getElementById("bandeja");
var id;

function onOpen()
{
    id = getUrlVars();
    id = id.id;
    console.log(id);
    websocket.send(id);
    console.log("conectado..");
    ini = true;
}
var ini = false;
var mysendsms;

function pasaremjin(id)
{
    document.getElementById("textsend").value += id;
}
function enviartext()
{
    console.log(document.getElementById("textsend").length);
    mysendsms = {chatsend: {iduser: idfriendchatnow.id, username: idfriendchatnow.username,
            message: document.getElementById("textsend").value, idsend: id, usersend: username}};
    websocket.send(JSON.stringify(mysendsms));
    document.getElementById("textsend").value = "";
    var inicio = new Date();
    addsmssends(mysendsms.chatsend.message, inicio.getHours() +":"+inicio.getMinutes(), "a673");
}
function onClose()
{
    console.log("desconectado..");
}
var t;
var username;
var chats;
var chatall;
function onMessage(event)
{
    var returnonmessage;
    if (ini)
    {
        console.log(event.data);
        t = JSON.parse(event.data);
        username = t.myinfo;
        // document.getElementById("username").innerHTML = username;
        chats = t.mychatinfo.mychat;
        for (var u = 0; u < chats.length; u++)
        {
            var inf = chats[u];
            document.getElementById("allsmsbandeja").appendChild(adduserconec(inf[0], "", inf[1], inf[3], inf[5]));
        }
        ini = false;
    } else {
        returnonmessage = JSON.parse(event.data);
        console.log(returnonmessage);
        if (returnonmessage.hasOwnProperty('data'))
        {
            chatall = returnonmessage.data;
            var dt = chatall;
            var elemento = document.getElementById("centersms");
            while (elemento.firstChild) {
                elemento.removeChild(elemento.firstChild);
            }
            for (var i = 0; i < dt.length; i++)
            {
                var inf = dt[i];
                if (inf[0] === id)
                {
                    addsmsreceive(inf[2], inf[4], inf[5]);
                } else {
                    addsmssends(inf[2], inf[4], inf[5]);
                }
            }
        } else if (returnonmessage.hasOwnProperty('returnrecibe'))
        {
            chats = returnonmessage.returnrecibe.chatfriend.mychat;
            chatall = returnonmessage.returnrecibe.mychatallfriend.data;
            var father = document.getElementById("allsmsbandeja");

            for (var i = 0; i < chats.length; i++)
            {
                var inf = chats[i];
                if (inf[0].toString().trim() === returnonmessage.returnrecibe.idrec.toString().trim())
                {
                    if (document.getElementById(inf[0])) {
                        father.removeChild(document.getElementById(inf[0]));
                    }
                    var child = father.firstChild;
                    father.insertBefore(adduserconec(inf[0], "", inf[1], inf[3], inf[5]), child);
                    if (idfriendchatnow.id === returnonmessage.returnrecibe.idrec.toString().trim())
                    {
                        addsmsreceive(inf[3], inf[5]);
                        viewchatfriends(idfriendchatnow.id, 'fgfd');
                    }
                }
            }
            console.log(returnonmessage);
        } else if (returnonmessage.hasOwnProperty('returnenvia'))
        {
            chats = returnonmessage.returnenvia.chatfriend.mychat;
            chatall = returnonmessage.returnenvia.mychatallfriend.data;
            var father = document.getElementById("allsmsbandeja");
            for (var i = 0; i < chats.length; i++)
            {
                var inf = chats[i];
                if (inf[0] === mysendsms.chatsend.iduser)
                {
                    if (document.getElementById(inf[0])) {
                        father.removeChild(document.getElementById(inf[0]));
                    }
                    var child = father.firstChild;
                    father.insertBefore(adduserconec(inf[0], "", inf[1], inf[3], inf[5]), child);
                    viewchatfriends(idfriendchatnow.id, 'fgfd');
                }
            }
            var elemento = document.getElementById("centersms");
            while (elemento.firstChild) {
                elemento.removeChild(elemento.firstChild);
            }
            var dt = chatall;
            for (var i = 0; i < dt.length; i++)
            {
                var inf = dt[i];
                if (inf[0] === id)
                {
                    addsmsreceive(inf[2], inf[4], inf[5]);
                } else {
                    addsmssends(inf[2], inf[4], inf[5]);
                }
            }
            console.log(returnonmessage);
        } else if (returnonmessage.hasOwnProperty('returnbusco')) {

            var data = returnonmessage.returnbusco;
            j = data;
            for (var i = 0; i < data.length; i++) {
                var g = data[i];
                newfriends('photo', g[1], g[0]);

            }
            console.log(returnonmessage);

        } else if (returnonmessage.hasOwnProperty('newfriendhcat')) {
            datamomentbuscar = returnonmessage.newfriendhcat;
            var elemento = document.getElementById("centersms");
            while (elemento.firstChild) {
                elemento.removeChild(elemento.firstChild);
            }
            addinfofriend(datamomentbuscar[0][2], datamomentbuscar[0][6], datamomentbuscar[0][7], datamomentbuscar[0][8], datamomentbuscar[0][4]);
            var cht = {id: datamomentbuscar[0][0], username: datamomentbuscar[0][1]};
            idfriendchatnow = cht;
        }
    }

}
var datamomentbuscar;
var j;
function onError()
{
    console.log("ERROR..");

}
function salir()
{
    websocket.onclose();
    websocket.send("1");
}
var use;
function unir()
{
    var y = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    console.log(y + document.location.host + "/appmessages/" + "endpoint");
    websocket = new WebSocket(y + document.location.host + "/appmessages/" + "endpoint");
    websocket.onopen = onOpen;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
    websocket.onclose = onClose;
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function adduserconec(id, photo, name, sms, hora)
{
    var bandejasuser = document.createElement("div");
    bandejasuser.setAttribute("class", "bandejasuser");
    bandejasuser.setAttribute("id", id);
    bandejasuser.setAttribute("onclick", "viewchatfriends(this.id,'click')");

    var bandejasuserimg = document.createElement("div");
    bandejasuserimg.setAttribute("class", "bandejasuserimg");

    var bandejasuserdata = document.createElement("div");
    bandejasuserdata.setAttribute("class", "bandejasuserdata");

    var bandejasuserdataname = document.createElement("div");
    bandejasuserdataname.setAttribute("class", "bandejasuserdataname");


    var bandejasuserdatasms = document.createElement("div");
    bandejasuserdatasms.setAttribute("class", "bandejasuserdatasms");

    var smsmd = document.createElement("div");
    smsmd.setAttribute("class", "smsmd");

    var hrsms = document.createElement("div");
    hrsms.setAttribute("class", "hrsms");

    var img = document.createElement("img");
//    if (ImageExist("../imagen/chat/" + id + ".jpg").height !== 0)
//    {
//        img.setAttribute("src", "../imagen/chat/" + id + ".jpg");
//    } else

    img.setAttribute("src", "../images/index/ciega.png");

    img.setAttribute("alt", "");
    img.setAttribute("title", "user1");

    var div = document.createElement("div");
        div.setAttribute("class", "cl");
    div.innerHTML = name;

var div1 = document.createElement("div");
    div1.setAttribute("class", "nsms");
var div2 = document.createElement("div");
    smsmd.innerHTML = sms;
    hrsms.innerHTML = hora;
    bandejasuser.appendChild(bandejasuserimg);
    bandejasuser.appendChild(bandejasuserdata);
    bandejasuserimg.appendChild(img);
    bandejasuserdata.appendChild(bandejasuserdataname);
    bandejasuserdata.appendChild(bandejasuserdatasms);
    bandejasuserdataname.appendChild(div);
        bandejasuserdataname.appendChild(div1);
                div1.appendChild(div2);
;


    bandejasuserdatasms.appendChild(smsmd);
    bandejasuserdatasms.appendChild(hrsms);
    return bandejasuser;
}
function ImageExist(url)
{
    var img = new Image();
    img.src = url;
    return img;
}
function addsmsreceive(sms, hor, id)
{
    var chtsmsusercentersmsrecibe = document.createElement("div");
    chtsmsusercentersmsrecibe.setAttribute("class", "chtsmsusercentersmsrecibe");
    chtsmsusercentersmsrecibe.setAttribute("id", "todo" + id);

    chtsmsusercentersmsrecibe.appendChild(allsms(sms, hor, 'negro', id));
    document.getElementById("centersms").appendChild(chtsmsusercentersmsrecibe);
}
function addsmssends(sms, hor, id)
{
    var chtsmsusercentersmsenvia = document.createElement("div");
    chtsmsusercentersmsenvia.setAttribute("class", "chtsmsusercentersmsenvia");
    chtsmsusercentersmsenvia.setAttribute("id", "todo" + id);
    chtsmsusercentersmsenvia.appendChild(allsms(sms, hor, 'blanco', id));

    document.getElementById("centersms").appendChild(chtsmsusercentersmsenvia);
}
function allsms(sms, hor, tp, id)
{
    var allsms = document.createElement("div");
    allsms.setAttribute("class", "allsms");


    var texto = document.createElement("div");
    texto.setAttribute("class", "texto");
    texto.innerHTML = sms;

    var hora = document.createElement("div");
    hora.setAttribute("class", "hora");
    var div = document.createElement("div");
    div.setAttribute("class", "imgmenu");
    div.setAttribute("id", "sms" + id);
    div.setAttribute("onclick", "vermenu(this)");


    var imgu = document.createElement("img");
    imgu.setAttribute("class", "claseimgtext");

    imgu.setAttribute("src", "../images/chat/menu" + tp + "1.png");

    var div1 = document.createElement("div");
    div1.setAttribute("class", "txthora");

    var h3 = document.createElement("h4");
    h3.innerHTML = hor;

    allsms.appendChild(texto);
    allsms.appendChild(hora);
    hora.appendChild(div);
    div.appendChild(imgu);
    hora.appendChild(div1);
    div1.appendChild(h3);

    return allsms;
}

function addinfofriend(name, addr, ema, pho, fech)
{
    document.getElementById("namefriend").innerHTML = name;
    document.getElementById("nameallfriend").innerHTML = name;
    document.getElementById("addresfriend").innerHTML = addr;
    document.getElementById("emailfriend").innerHTML = ema;
    document.getElementById("phonefriend").innerHTML = pho;
    document.getElementById("nacifriend").innerHTML = fech;
    document.getElementById("allcha").style.display = 'block';
    document.getElementById("infoallfriend").style.display = 'block';
}
var idfriendchatnow;
function viewchatfriends(g, uu)
{
    var send = {chatfriend: {myuser: id, idfriend: g}};
    for (var u = 0; u < chats.length; u++)
    {
        var inf = chats[u];
        if (inf[0] === g)
        {
            var cht = {id: inf[0], username: inf[1]};
            idfriendchatnow = cht;
            addinfofriend(inf[2], inf[6], inf[7], inf[8], inf[4]);
            document.getElementById(g).querySelectorAll('.bandejasuserdata')[0].querySelector('.bandejasuserdata .bandejasuserdataname div').style.color = 'white';
            document.getElementById(g).style.background = '#4A8AF9';
            document.getElementById(g).style.color = 'white';
        } else
        {
            document.getElementById(inf[0]).style.background = 'white';
            document.getElementById(inf[0]).querySelectorAll('.bandejasuserdata')[0].querySelector('.bandejasuserdata .bandejasuserdataname div').style.color = 'black';
            document.getElementById(inf[0]).style.color = 'black';
        }

    }
    if (uu === 'click') {
        websocket.send(JSON.stringify(send));
    }
}
function unpack(str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        bytes.push(char >>> 8);
        bytes.push(char & 0xFF);
    }
    return bytes;
}
function newfriends(photo, name, id)
{
    var bandejasuserbuscar = document.createElement("div");
    bandejasuserbuscar.setAttribute("class", "bandejasuserbuscar");
    bandejasuserbuscar.setAttribute("id", 'bus' + id);
    bandejasuserbuscar.setAttribute("ondblclick", "dobleclick(this)");
    bandejasuserbuscar.setAttribute("onclick", "unclick(this)");

    var bandejasuserimgbuscar = document.createElement("div");
    bandejasuserimgbuscar.setAttribute("class", "bandejasuserimgbuscar");

    var bandejasuserdatabuscar = document.createElement("div");
    bandejasuserdatabuscar.setAttribute("class", "bandejasuserdatabuscar");

    var div = document.createElement("div");
    div.innerHTML = name;
    var img = document.createElement("img");
    img.setAttribute("src", "../images/chat/8566.jpg");
    bandejasuserbuscar.appendChild(bandejasuserimgbuscar);
    bandejasuserimgbuscar.appendChild(img);


    bandejasuserbuscar.appendChild(bandejasuserdatabuscar);
    bandejasuserdatabuscar.appendChild(div);
    document.getElementById("resultbuscar").appendChild(bandejasuserbuscar);
}
function unclick(f)
{
    var elementos = document.getElementById("resultbuscar").querySelectorAll('.bandejasuserbuscar');
    for (var u = 0; u < elementos.length; u++)
    {
        elementos[u].style.background = 'white';
        elementos[u].style.color = 'black';
    }
    document.getElementById(f.id).style.background = '#4A8AF9';
    document.getElementById(f.id).style.color = 'white';

}
function dobleclick(f)
{
    var have = false;
    document.getElementById("allsmsbandeja").style.display = 'block';
    document.getElementById("resultbuscar").style.display = 'none';
    var idfri = {id: f.id.substring(3, f.id.length)};
    for (var i = 0; i < chats.length; i++) {
        var po = chats[i];
        if (po[0] === idfri.id)
        {
            viewchatfriends(idfri.id, 'click');
            have = true;
            busqueda = false;
            document.getElementById("txtbusqueda").value = '';
            break;
        }
    }
    if (!have)
    {
        var send = {chatfriendnew: {myuser: id, idfriend: f.id.substring(3, f.id.length)}};
        websocket.send(JSON.stringify(send));
        busqueda = false;
        document.getElementById("txtbusqueda").value = '';

    }
}