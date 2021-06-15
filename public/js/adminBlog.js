document.addEventListener("DOMContentLoaded", function(event) {
    renderBlog();
});

var entries;


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

function renderBlog() {
    let titulo = document.querySelector('.container--titulo input');
    let descripcion = document.querySelector('.container--descripcion input');
    let imgAntes = document.querySelector('.container--img-antes input');
    let imgDespues = document.querySelector('.container--img-despues input');
    if (titulo) {
        titulo.value = "";
    }
    if (descripcion) {
        descripcion.value = "";
    }
    if (imgAntes) {
        imgAntes.value = "";
    }
    if (imgDespues) {
        imgDespues.value = "";
    }

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            entries = JSON.parse(ajax.responseText);
            drawBlog(entries);
        }
    }
    ajax.open('get', 'renderBlog', true);
    ajax.send();
}

function drawBlog(entries) {
    let divContainerBlog = document.querySelector('.container--blog');
    while (divContainerBlog.firstChild) { // borrem tots els fills
        divContainerBlog.removeChild(divContainerBlog.firstChild);
    }
    for (let i = 0; i < entries.length; i++) {
        const containerTitleBlog = document.createElement('div');
        containerTitleBlog.classList.add('container--title-blog');
        divContainerBlog.appendChild(containerTitleBlog);
        // h2 titulo
        const tituloBlog = document.createElement('h2');
        tituloBlog.textContent = entries[i].titulo;
        containerTitleBlog.appendChild(tituloBlog);
        // Eliminar
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.setAttribute('onclick', 'onClickDropEntry(event,' + entries[i].id + ')');
        containerTitleBlog.appendChild(iTrash);
    }
}

function onClickOpenAddBlog() {
    let btnNewEntry = document.querySelector('.new--blog');
    btnNewEntry.style.display='block';
}

function onClickAddBlog(event) {
    var token = document.getElementById('token').getAttribute('content');
    let titulo = document.querySelector('.container--titulo input');
    let descripcion = document.querySelector('.container--descripcion input');
    let imageFileBefore = document.querySelector('.container--img-antes input').files[0];
    let imageFileAfter = document.querySelector('.container--img-despues input').files[0];
    if (titulo.value == '') {
        titulo.style.border = "2px solid red";
    } else {
        titulo.style.borderColor = "rgb(118, 118, 118)";
        titulo.style.borderStyle = "solid";
        titulo.style.borderWidth = "1px";
    }
    if (descripcion.value == '') {
        descripcion.style.border = "2px solid red";
    } else {
        descripcion.style.borderColor = "rgb(118, 118, 118)";
        descripcion.style.borderStyle = "solid";
        descripcion.style.borderWidth = "1px";
    }
    if (titulo.value == '' || descripcion.value == '') {
        event.preventDefault();
    } else {
        var datasend = new FormData();
        datasend.append('_token', token);
        datasend.append('titulo', titulo.value);
        datasend.append('descripcion', descripcion.value);
        datasend.append('imageFileBefore', imageFileBefore);
        datasend.append('imageFileAfter', imageFileAfter);
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                // REVIEW
                renderBlog();
                // END REVIEW
            }
        }
        ajax.open('POST', 'addNewEntryBlog', true);
        ajax.send(datasend);
    }
}

function onClickDropEntry(event, idEntry) {
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idEntry);
    opcion = confirm("¿Está seguro/a de borrar esta entrada?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                renderBlog();
            }
        }
        ajax.open('POST', 'dropEntryBlog', true);
        ajax.send(datasend);
    }
}