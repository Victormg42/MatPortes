window.onload = function() {
    ajax = new objetoAjax();
    catalogoContents = document.getElementById('catalogo--contents');
    renderNextLevelHierarchy();
    $(document).ready(function() {
        checkAcceptCookies();
    });
    getDataPromo();
    hero();
    // mesAlert();
}

var catalogBlocked = false;
var jerarquia;
var navigationStack = [];

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

function renderDataHierarchy(respuesta) {
    while (catalogoContents.firstChild) {
        catalogoContents.removeChild(catalogoContents.firstChild);
    }
    var catalogo = document.getElementById('catalogo');
    catalogo.classList.remove('hide');
    catalogo.classList.add('show');
    setTimeout(function() {
        catalogo.classList.remove('show');
        catalogBlocked = false;
    }, 1000);
    for (let i = 0; i < respuesta.length; i++) {
        // console.log('response renderDataHierarchy: ', respuesta);
        const containerCard = document.createElement('div'); // Creación del contenedor para este card
        containerCard.className = 'container--card'; // add class
        if(respuesta[i].img_hormann == 1) {
            const logoHormann = document.createElement('img');
            logoHormann.className = 'logo--h'; // add class
            logoHormann.setAttribute('src', 'img/hormann.jpg');
            containerCard.appendChild(logoHormann);
        }
        if (respuesta[i].numSub == '0') {
            containerCard.setAttribute('onclick', 'navigateToProducts(' + respuesta[i].id + ')');
        } else {
            containerCard.setAttribute('onclick', 'renderNextLevelHierarchy(' + respuesta[i].id + ', "' + respuesta[i].nombre + '")');
        }
        catalogoContents.appendChild(containerCard);
        const h3 = document.createElement('h3');
        const h2 = document.createElement('h2');
        const info = document.createElement('i');
        info.classList.add('fas');
        info.classList.add('fa-info-circle');
        // info.setAttribute('onclick', 'openModalInfo(event, '+ respuesta[i].id +')')
        info.setAttribute('onclick', 'openModalInfo(event, ' + respuesta[i].id + ', ' + i + ')')
        h2.textContent = respuesta[i].texto_ayuda;
        h3.textContent = respuesta[i].nombre;
        containerCard.style.backgroundImage = "url('storage/" + respuesta[i].ruta_img + "')";
        containerCard.appendChild(h2);
        containerCard.appendChild(h3);
        containerCard.appendChild(info);
    }
}

function onHideCatalog(id) {
    // Petición ajax con respuesta a onNewDataAvailable
    var token = document.getElementById('token').getAttribute('content');
    var ajax = new objetoAjax();
    var datasend = new FormData();
    datasend.append('_token', token);
    if (id) {
        datasend.append('id', id);
    }
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            jerarquia = JSON.parse(ajax.responseText);
            renderDataHierarchy(jerarquia);
        }
    }
    ajax.open('POST', 'getNextLevelHierarchy', true);
    ajax.send(datasend);
}

function drawBreadCrumb() {
    var breadCrumb = document.getElementById('breadCrumb');
    const iHome = document.createElement('i');
    iHome.classList.add('fas');
    iHome.classList.add('fa-home');
    const iRight = document.createElement('i');
    iRight.classList.add('fas');
    iRight.classList.add('fa-angle-right');
    while (breadCrumb.firstChild) { // borrem tots els fills
        breadCrumb.removeChild(breadCrumb.firstChild);
    }
    for (let i = 0; i < navigationStack.length; i++) {
        const a = document.createElement('a');
        if (i == 0) {
            iHome.setAttribute('onclick', 'onBreadCrumbClick()');
            breadCrumb.appendChild(iHome);
        } else {
            breadCrumb.appendChild(iRight);
            a.textContent = navigationStack[i].nombre;
            a.setAttribute('onclick', 'onBreadCrumbClick(' + navigationStack[i].id + ')');
            a.setAttribute('onclick', 'onBreadCrumbClick(' + navigationStack[i].id + ')');
        }
        breadCrumb.appendChild(a);
    }
}

function onBreadCrumbClick(id) {
    if (catalogBlocked) {
        return; // sortim de la funció
    }
    catalogBlocked = true;
    // console.log('id en crumb', id);
    if (id == undefined) { // Home
        navigationStack = [];
    } else {
        do { // ens quedem fins al id actual (els altres els eliminem)
            var item = navigationStack.pop();
            if (item.id == id) {
                break;
            }
        } while (true)
    }
    let stackTop = navigationStack.length > 0 ? navigationStack[navigationStack.length - 1] : null; // recupera l'últim element. Si no n'hi ha cap es queda en null
    drawHierarchyLevel(stackTop ? stackTop.id : undefined, stackTop ? stackTop.nombre : 'home')
}

function drawHierarchyLevel(id, nombre) {
    drawBreadCrumb();
    let section = document.getElementById('catalogo');
    section.classList.add('hide');
    setTimeout(onHideCatalog.bind(this, id), 1000); // crea copia de la función onHideCatalog y fuerza parámetro con el valor de id
}

function renderNextLevelHierarchy(id, nombre) {
    if (catalogBlocked) {
        return; // sortim de la funció
    }
    catalogBlocked = true;
    if (id) {
        navigationStack.push({ id: id, nombre: nombre });
    }
    drawHierarchyLevel(id, nombre);
}

function navigateToProducts(id) {
    window.location = 'navigateToProducts/' + id;
}

function openModalInfo(event, id, i) { // Obre el modal d'informació
    event.stopPropagation(); // Evita que navegui al següent nivell de la jerarquia
    var modalInfo = document.getElementById('modal--info');
    let titleInfo = document.getElementById('title--info');
    let contentInfo = document.getElementById('info');
    while (contentInfo.firstChild) {
        contentInfo.removeChild(contentInfo.firstChild);
    }
    titleInfo.textContent = jerarquia[i].nombre;
    const p = document.createElement('p');
    p.textContent = jerarquia[i].info;
    contentInfo.appendChild(p);
    modalInfo.style.display = "block";
}

function closeModalInfo() { // Tanca el modal d'informació
    var modalInfo = document.getElementById('modal--info');
    modalInfo.style.display = "none";
}

// Revisa si las cookies han sido aceptadas, y oculta el panel.s
function checkAcceptCookies() {
    if (localStorage.acceptCookies == 'true') {} else {
        $('#div-cookies').show();
    }
}

function acceptCookies() {
    localStorage.acceptCookies = 'true';
    $('#div-cookies').hide();
}

function hero() {
    let logoHormann = document.querySelector('.container--img-logo img');
    // setTimeout(function() {
    //     logoHormann.style.transform = "rotateY(180deg)";
    // }, 2000);
    // setTimeout(function() {
    //     logoHormann.style.transform = "rotateY(0deg)";
    // }, 4000);
    
}