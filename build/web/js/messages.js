function panelbandeja()
{
    document.getElementById("allsmsbandeja").style.display = 'none';
    document.getElementById("resultbuscar").style.display = 'block';
    return true;
}
var busqueda = false;
var tecla;

function teclanew(e)
{
    console.log(e.keyCode);
    if (busqueda)
    {
        if (e.keyCode === 27)
        {
            var elemento = document.getElementById("resultbuscar");
            while (elemento.firstChild) {
                elemento.removeChild(elemento.firstChild);
            }
            busqueda = false;
            document.getElementById("txtbusqueda").value = '';
            document.getElementById("allsmsbandeja").style.display = 'block';
            document.getElementById("resultbuscar").style.display = 'none';
        } else
        if (e.keyCode !== 37 || e.keyCode !== 38 || e.keyCode !== 39 || e.keyCode !== 40) {
            var f = document.getElementById("txtbusqueda").value;
            if (f.length > 0) {
                console.log(f);
                var h = {datobusco: {data: f}};
                websocket.send(JSON.stringify(h));
                console.log(JSON.stringify(h));
                console.log(h);
            } else {
                var elemento = document.getElementById("resultbuscar");
                while (elemento.firstChild) {
                    elemento.removeChild(elemento.firstChild);
                }
            }
        }
    } else {
        busqueda = panelbandeja();
        teclanew(e);
    }
}
var ff;
function vermenu(e) {
    ff = e.id;
}
var x, y;

window.onmousemove = function () {
    x = window.event.clientX;
    y = window.event.clientY;
};

document.onclick = captura_click;
var tt;
function captura_click(e) {
    var HaHechoClick;
    if (e === null) {
        HaHechoClick = event.srcElement;
    } else {
        HaHechoClick = e.target;
    }
    if (HaHechoClick.className === "claseimgtext" || HaHechoClick.className === "imgmenu")
    {
        tt = HaHechoClick;
        if ($(".chtsmsusercentersmsenvia .hora #" + ff).length > 0)
        {
            document.getElementById("rmenu").className = "show";
            document.getElementById("rmenu").style.top = (5 + y) + 'px';
            document.getElementById("rmenu").style.left = (x - 44) + 'px';
        } else {
            document.getElementById("rmenu").className = "show";
            document.getElementById("rmenu").style.top = (5 + y) + 'px';
            document.getElementById("rmenu").style.left = (5 + x) + 'px';
        }
    } else
        document.getElementById("rmenu").className = "hide";

}

function removesms()
{
    var send = {deletesms: {myuser: id, idsms: ff.substring(3, ff.length), idfri: idfriendchatnow.id}};

    mysendsms = {chatsend: {iduser: idfriendchatnow.id, username: idfriendchatnow.username,
            message: document.getElementById("textsend").value, idsend: id, usersend: username}};
    document.getElementById("centersms").removeChild(document.getElementById("todo" + ff.substring(3, ff.length)));
    
    for (var t = 0; t < chatall.length; t++)
    {
        if(chatall[t][5]===ff.substring(3, ff.length))
        {
            chatall.splice(t, 1);
            break;
        }
    }
    for (var t = 0; t < chats.length; t++)
    {
        var h = chats[t];
        if (idfriendchatnow.id === h[0])
        {
            h[3] = chatall[chatall.length - 1][2];
            h[5] = chatall[chatall.length - 1][4];

            $("#"+h[0]+" .bandejasuserdata .bandejasuserdatasms .smsmd")[0].innerHTML = h[3];
            $("#"+h[0]+" .bandejasuserdata .bandejasuserdatasms .hrsms")[0].innerHTML = h[5];
            break;
        }
    }

    websocket.send(JSON.stringify(send));
    console.log("enviado a borrar");
}