
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        testAPI();
    } else {
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '331770507840180',
        cookie: true,
        xfbml: true,
        version: 'v7.0'
    });
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};
function cerrar()
{
    FB.logout(function (response) {
        console.log(response);
        //document.getElementById('status').innerHTML = 'ya ha cerrado sesion';
    });
}

function iniciarsesion() {
    cerrar();
    FB.login(function (response) {
        console.log(response);

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
                FB.api('/me?fields=name,email,birthday', function (response) {
                    
                console.log('Good to see you, ' + response.name + '.');
                console.log(response);
                var h = response.name.toString().split(' ');
                document.getElementById("name").value = h[0];
                document.getElementById("apell").value = h[1];

               // document.getElementById("formId:textfour").value = response.birthday;
                document.getElementById("user").value = response.email;
                document.getElementById("eml").value = response.email;
                modal('a');
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
      //  document.getElementById('status').innerHTML = 'ya ha iniciado sesión';
    });
}
function onSignIn(googleUser) {
    signOut();
    var profile = googleUser.getBasicProfile();
    console.log(profile);
    document.getElementById("name").value = profile.GW;
    document.getElementById("apell").value = profile.FU;
    document.getElementById("user").value = profile.zu;
    document.getElementById("eml").value = profile.zu;
    modal('a');
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
