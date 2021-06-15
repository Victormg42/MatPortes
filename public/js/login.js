window.onload = function() {

}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function validarLogin() {
    var inputs = document.getElementsByClassName('validar');
    var mensaje = document.getElementById('msg-login');
    // console.log(inputs)
    var val = true;
    for (let i = 0; i < inputs.length; i++) {
        if ((inputs[i].type == 'email' || inputs[i].type == 'password') && inputs[i].value == '') {
            inputs[i].style.border = '2px solid red';
            val = false;
            mensaje.innerHTML = 'El usuario o contraseña son incorrectos';
        } else if ((inputs[i].type == 'email' || inputs[i].type == 'password') && inputs[i].value !== '') {
            inputs[i].style.border = '2px solid white';
        }
    }
    if (val) {
        return true;
    } else {
        return false;
    }
}