window.onload = function() {
    modal = document.getElementById('modal--pwd');
    readUser();
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

function readUser() {
    var ajax = new objetoAjax();
    var token = document.getElementById('token').getAttribute('content');
    ajax.open('POST', 'readUser', true);
    var datasend = new FormData();
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            document.getElementById('dni').value = respuesta[0].id_card;
            document.getElementById('nombre').value = respuesta[0].nombre;
            document.getElementById('apellido1').value = respuesta[0].apellido1;
            document.getElementById('apellido2').value = respuesta[0].apellido2;
            document.getElementById('telefono').value = respuesta[0].telefono;
            document.getElementById('correo').value = respuesta[0].correo;
        }
    }
    ajax.send(datasend);
}

function openModalPassword() {
    modal.style.display = "block";
    modal.style.zIndex = "100";
}

function closeModalPassword() {
    modal.style.display = "none";
}

function cambiarPassword() {
    var ajax = new objetoAjax();
    var pass_nueva = document.getElementById('passwd_nueva');
    var pass_repetir = document.getElementById('passwd_repetir');
    var token = document.getElementById('token').getAttribute('content');
    var mensaje = document.getElementById('msg');
    ajax.open('POST', 'cambiarPassword', true);
    var datasend = new FormData();
    datasend.append('pass_nueva', pass_nueva.value);
    datasend.append('pass_repetir', pass_repetir.value);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'Las dos passwords no coinciden') {
                pass_nueva.style.border = '2px solid red';
                pass_repetir.style.border = '2px solid red';
                mensaje.style.color="red";
            } else {
                pass_nueva.style.border = '1px solid gray';
                pass_repetir.style.border = '1px solid gray';
                document.getElementById('change_passwd').reset();
                mensaje.style.color="green";
            }
            mensaje.innerHTML = respuesta.resultado;
        }
    }
    ajax.send(datasend);
}

function cambiarUser() {
    var ajax = new objetoAjax();
    var nombre = document.getElementById('nombre').value;
    var apellido1 = document.getElementById('apellido1').value;
    var apellido2 = document.getElementById('apellido2').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    // var gmail = document.getElementById('gmail').value;
    var dni = document.getElementById('dni').value;
    var token = document.getElementById('token').getAttribute('content');
    var mensaje = document.getElementById('msg1');
    mensaje.textContent = "";
    ajax.open('POST', 'cambiarUser', true);
    var datasend = new FormData();
    datasend.append('nombre', nombre);
    datasend.append('apellido1', apellido1);
    datasend.append('apellido2', apellido2);
    datasend.append('telefono', telefono);
    // datasend.append('gmail', gmail);
    datasend.append('correo', correo);
    datasend.append('dni', dni);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                mensaje.style.color = '#1b941b';
                mensaje.innerHTML = 'Datos modificados correctamente';
                readUser();
            } else {
                // REVIEW
                mensaje.style.color = '#e08080';
                for (let i = 0; i < respuesta.messages.length; i++) {
                    mensaje.innerHTML += respuesta.messages[i];
                    mensaje.innerHTML += '<br>';
                }
                // END REVIEW
            }
        }
    }
    ajax.send(datasend);
}