window.onload = function() {
    readUsuarios();
    register = document.getElementById('form-panel-two');
    users = document.getElementById('mostrarUsuarios');
    password = document.getElementById('formPasswd');
    update = document.getElementById('formUpdate');
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

function mostrarFormRegistro() {
    register.style.display = "block";
    users.style.display = "none";
    password.style.display = "none";
    update.style.display = "none";
    // REVIEW
    getRolREgister();
    // END REVIEW
}

function mostrarTablaUsuarios() {
    readUsuarios();
    register.style.display = "none";
    users.style.display = "block";
    password.style.display = "none";
}

function openFormPassword(id) {
    // 25-05-21
    password.style.display = "flex";
    // password.style.display = "block";
    // end 25-05-21
    update.style.display = "none";
    document.getElementById('id').value = id;
}

function openFormUpdate(id, nombre, dni, apellido1, apellido2, telefono, correo) {
    var mensaje = document.getElementById('msg2');
    mensaje.textContent = "";
    mensaje.value = "";
    mensaje.innerHTML = "";
    update.style.display = "flex";
    password.style.display = "none";
    document.getElementById('u_id').value = id;
    document.getElementById('udni').value = dni;
    document.getElementById('unombre').value = nombre;
    document.getElementById('upapellido').value = apellido1;
    document.getElementById('u_sapellido').value = apellido2;
    document.getElementById('utelefono').value = telefono;
    document.getElementById('uemail').value = correo;
    // REVIEW
    select = document.getElementById('u_rol');
    getRolUser();
    getRol();
    // END REVIEW
}

function generatePassword() {
    var inputPass = document.getElementById('new_password');
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    var contraseña = "";
    for (i = 0; i < 8; i++) {
        contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    inputPass.value = contraseña;
}

function readUsuarios() {
    var section = document.getElementById('mostrarUsuarios');
    var token = document.getElementById('token').getAttribute('content');
    var ajax = new objetoAjax();
    ajax.open('POST', 'getUsuarios', true);
    var datasend = new FormData();
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            // console.log(respuesta)
            var tabla = '';
            tabla += '<thead>';
            tabla += '<tr>';
            tabla += '<th>DNI</th>';
            tabla += '<th>Nombre</th>';
            tabla += '<th>Primer Apellido</th>';
            tabla += '<th>Segundo Apellido</th>';
            tabla += '<th>Teléfono</th>';
            tabla += '<th>Email</th>';
            tabla += '<th>Rol</th>';
            tabla += '</tr>';
            tabla += '</thead>';
            for (let i = 0; i < respuesta.length; i++) {
                //const element = array[index];
                tabla += '<tbody>';
                tabla += '<tr>';
                tabla += '<td>' + respuesta[i].id_card + '</td>';
                tabla += '<td>' + respuesta[i].nombre_user + '</td>';
                tabla += '<td>' + respuesta[i].apellido1 + '</td>';
                tabla += '<td>' + respuesta[i].apellido2 + '</td>';
                tabla += '<td>' + respuesta[i].telefono + '</td>';
                tabla += '<td>' + respuesta[i].correo + '</td>';
                tabla += '<td>' + respuesta[i].nombre_rol + '</td>';
                tabla += '<td><i onclick="openFormPassword(' + respuesta[i].idUser + ');" class="fas fa-key"></i></td>';
                tabla += '<td><i onclick="openFormUpdate(' + respuesta[i].idUser + ',&#039;' + respuesta[i].nombre_user + '&#039;,&#039;' + respuesta[i].id_card + '&#039;,&#039;' + respuesta[i].apellido1 + '&#039;,&#039;' + respuesta[i].apellido2 + '&#039;,&#039;' + respuesta[i].telefono + '&#039;,&#039;' + respuesta[i].correo + '&#039;)" class="fas fa-user-edit"></i></i></td>';
                tabla += '</td>';
                tabla += '</tr>';
                tabla += '</tbody>';
            }
            section.innerHTML = tabla;
        }
    }
    ajax.send(datasend);
}

function validarRegistro(event) {
    // console.log('event:', event)
    var inputs = document.getElementsByClassName('validar-register');
    var password1 = document.getElementById('rpassword1').value;
    var password2 = document.getElementById('rpassword2').value;
    var mensaje = document.getElementById('mensaje');
    var val = true;
    for (let i = 0; i < inputs.length; i++) {
        if ((inputs[i].type == 'email' || inputs[i].type == 'password' || inputs[i].type == 'text') && inputs[i].value == '') {
            inputs[i].style.border = '2px solid red';
            val = false;
        } else if ((inputs[i].type == 'email' || inputs[i].type == 'password' || inputs[i].type == 'text') && inputs[i].value !== '') {
            inputs[i].style.border = '2px solid white';
        }
    }

    if (val == false) {
        event.preventDefault();
    } else {
        registerUser();
        readUsuarios();
        return false;
    }
}

function registerUser() {
    var ajax = new objetoAjax();
    var dni = document.getElementById('rdni').value;
    var nombre = document.getElementById('rnombre').value;
    var apellido1 = document.getElementById('papellido').value;
    var apellido2 = document.getElementById('sapellido').value;
    var telefono = document.getElementById('rtelefono').value;
    var email = document.getElementById('remail').value;
    var passwd1 = document.getElementById('rpassword1').value;
    var passwd2 = document.getElementById('rpassword2').value;
    var rol = document.getElementById('rol').value;
    var estado = document.getElementById('estado').value;
    var token = document.getElementById('token').getAttribute('content');
    var mensaje = document.getElementById('mensaje');
    mensaje.textContent = "";
    ajax.open('POST', 'registerUser', true);
    var datasend = new FormData();
    datasend.append('dni', dni);
    datasend.append('nombre', nombre);
    datasend.append('apellido1', apellido1);
    datasend.append('apellido2', apellido2);
    datasend.append('telefono', telefono);
    datasend.append('correo', email);
    datasend.append('contraseña', passwd1);
    datasend.append('contraseña2', passwd2);
    datasend.append('rol', rol);
    datasend.append('estado', estado);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                mensaje.style.color = '#1b941b';
                mensaje.innerHTML = 'Usuario registrado correctamente';
            } else {
                // REVIEW
                // console.log('resultado negativo: ', respuesta.messages)
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

function updateUser() {
    var ajax = new objetoAjax();
    var id = document.getElementById('u_id').value;
    var dni = document.getElementById('udni').value;
    var nombre = document.getElementById('unombre').value;
    var apellido1 = document.getElementById('upapellido').value;
    var apellido2 = document.getElementById('u_sapellido').value;
    var telefono = document.getElementById('utelefono').value;
    var email = document.getElementById('uemail').value;
    var rol = document.getElementById('u_rol').value;
    var estado = document.getElementById('u_estado').value;
    var token = document.getElementById('token').getAttribute('content');
    var mensaje = document.getElementById('msg2');
    mensaje.textContent = "";
    ajax.open('POST', 'updateUser', true);
    var datasend = new FormData();
    datasend.append('id', id);
    datasend.append('udni', dni);
    datasend.append('unombre', nombre);
    datasend.append('upapellido', apellido1);
    datasend.append('apellido2', apellido2);
    datasend.append('utelefono', telefono);
    datasend.append('uemail', email);
    datasend.append('rol', rol);
    datasend.append('estado', estado);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            // console.log('respuesta:', respuesta)
            if (respuesta.resultado == 'OK') {
                mensaje.style.color = '#1b941b';
                mensaje.innerHTML = 'Usuario modificado correctamente';
                readUsuarios();
            } else {
                // console.log('resultado negativo: ', respuesta.messages)
                mensaje.style.color = '#e08080';
                for (let i = 0; i < respuesta.messages.length; i++) {
                    mensaje.innerHTML += respuesta.messages[i];
                    mensaje.innerHTML += '<br>';
                }
                // mensaje.innerHTML = respuesta.resultado;
            }
        }
    }
    ajax.send(datasend);
}

function passwordUser() {
    var ajax = new objetoAjax();
    var password = document.getElementById('new_password').value;
    var id = document.getElementById('id').value;
    var token = document.getElementById('token').getAttribute('content');
    var mensaje = document.getElementById('msgPassword');
    ajax.open('POST', 'passwordUser', true);
    var datasend = new FormData();
    datasend.append('password', password);
    datasend.append('id', id);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            // console.log('respuesta:', respuesta)
            if (respuesta.resultado == 'OK') {
                mensaje.innerHTML = 'Contraseña generada';
            } else {
                mensaje.innerHTML = respuesta.resultado;
            }
        }
    }
    ajax.send(datasend);
}

function getRol() {
    select = document.getElementById('u_rol');
    while (select.hasChildNodes()) {
        select.removeChild(select.firstChild);
    }
    var ajax = new objetoAjax();
    ajax.open('GET', 'getRol', true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var rols = JSON.parse(ajax.responseText);
            // console.log('respuesta:', rols);
            for (let i = 0; i < rols.length; i++) {
                const option = document.createElement('option');
                option.setAttribute('value', rols[i].id);
                option.setAttribute('id', rols[i].id);
                let textNode = document.createTextNode(rols[i].nombre);
                if (idRolUser) {
                    if (rols[i].id == idRolUser) {
                        option.selected = 'selected';
                    }
                }
                option.appendChild(textNode);
                select.appendChild(option);

                // console.log('idddddd user: ', idRolUser);

            }
        }
    }
    ajax.send();
}

function getRolREgister() {
    var rol = document.getElementById('rol');
    while (rol.hasChildNodes()) {
        rol.removeChild(rol.firstChild);
    }
    var ajax = new objetoAjax();
    ajax.open('GET', 'getRol', true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var rols = JSON.parse(ajax.responseText);
            // console.log('respuesta:', rols);
            for (let i = 0; i < rols.length; i++) {
                const option = document.createElement('option');
                option.setAttribute('value', rols[i].id);
                option.setAttribute('id', rols[i].id);
                let textNode = document.createTextNode(rols[i].nombre);
                option.appendChild(textNode);
                rol.appendChild(option);
            }
        }
    }
    ajax.send();
}

var idRolUser;

function getRolUser() {
    var datasend = new FormData();
    var token = document.getElementById('token').getAttribute('content');
    var id = document.getElementById('u_id').value;
    // console.log('iddddd del usuario: ', id);
    var ajax = new objetoAjax();
    datasend.append('id', id);
    datasend.append('_token', token);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            // console.log('getRolUser: ', respuesta);
            idRolUser = respuesta.idRol;
        }
    }
    ajax.open('POST', 'getRolUser', true);
    ajax.send(datasend);
}