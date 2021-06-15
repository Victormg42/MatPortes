window.onload = function() {
    renderDataPromo();
}

var dataPromo;

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

function renderDataPromo() { // Obtenir les dades de la promoció
    let editPromo = document.getElementById('editPromo');
    while(editPromo.firstChild) { // borrem tots els fills de form
        editPromo.removeChild(editPromo.firstChild);
    }
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            dataPromo = JSON.parse(ajax.responseText);
            drawPromo();
        }
    }
    ajax.open('GET', 'getDataPromo', true);
    ajax.send();
}

function drawPromo() {
    // console.log('respuesta dataPromo: ', dataPromo);
    let editPromo = document.getElementById('editPromo');
    const containerPdf = document.createElement('div');
    containerPdf.classList.add('container--pdf')
    const h2Pdf = document.createElement('h2');
    h2Pdf.textContent = 'PDF';
    const contentPdf = document.createElement('div');
    contentPdf.classList.add('content--pdf');
    const nombrePdf = document.createElement('a');
    nombrePdf.setAttribute('href', 'storage/'+dataPromo[0].url_pdf);
    nombrePdf.setAttribute('target', '_blank');
    nombrePdf.textContent = dataPromo[0].nombre;

    const iEdit = document.createElement('i');
    iEdit.classList.add('fas');
    iEdit.classList.add('fa-edit');
    iEdit.setAttribute('onclick', 'onClickEditPdf(event, '+ dataPromo[0].idPromo +')');

    editPromo.appendChild(containerPdf);
    containerPdf.appendChild(h2Pdf);
    containerPdf.appendChild(contentPdf);
    contentPdf.appendChild(nombrePdf);
    contentPdf.appendChild(iEdit);

    const containerImg = document.createElement('div');
    containerImg.classList.add('container--img')
    const containerTitleImg = document.createElement('div');
    containerTitleImg.classList.add('container--title-img')
    const h2Image = document.createElement('h2');
    h2Image.textContent = 'IMÁGENES';

    const iAddImg = document.createElement('i');
    iAddImg.setAttribute('onclick', 'onClickOpenFormAddImg()')
    iAddImg.classList.add('fas');
    iAddImg.classList.add('fa-plus-circle');

    editPromo.appendChild(containerImg);
    containerImg.appendChild(containerTitleImg);
    containerTitleImg.appendChild(h2Image);
    containerTitleImg.appendChild(iAddImg);
    for (let i = 0; i < dataPromo.length; i++) {
        if (!dataPromo[i].url_img) {
            continue;
        }
        const contentImg = document.createElement('div');
        contentImg.classList.add('content--img');
        const img = document.createElement('img');
        img.setAttribute('src', 'storage/'+ dataPromo[i].url_img);
        img.setAttribute('name', 'oldImage');
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.setAttribute('onclick', 'onClickDropImg(event,'+ dataPromo[i].idImagen + ')');

        containerImg.appendChild(contentImg);
        contentImg.appendChild(img);
        contentImg.appendChild(iTrash);
    }
}

function onClickEditPdf(event, idPromo) {
    let contentPdf = document.querySelector('.content--pdf');
    const divFile = document.createElement('div');
    divFile.classList.add('container--filePdf');
    const inputFile = document.createElement('input');
    inputFile.setAttribute('type', 'file');
    inputFile.setAttribute('accept', 'application/pdf');
    inputFile.setAttribute('name', 'promoPdf');
    
    if (document.querySelector('.container--filePdf')) { // Per a que no el repeteixi
        return;
    }

    // Botó modificar
    const modifyButton = document.createElement('button');
    modifyButton.classList.add('btnAdmin');
    modifyButton.classList.add('btnModificar');
    modifyButton.setAttribute('onclick', 'onClickModifyPromoPdf('+ idPromo +')');
    modifyButton.textContent = 'Modificar';

    contentPdf.appendChild(divFile);
    divFile.appendChild(inputFile);
    divFile.appendChild(modifyButton);
}


function onClickModifyPromoPdf(idPromo) {
    // console.log('en modofy pdf')
    var token = document.getElementById('token').getAttribute('content');
    var promoPdf = document.querySelector('.container--filePdf input').files[0];
    // console.log('ptomopdf', promoPdf)
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idPromo);
    datasend.append('promoPdf', promoPdf);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            renderDataPromo();
        }
    }
    ajax.open('POST', 'modifyPromoPdf', true);
    ajax.send(datasend);
}

function onClickDropImg(event, idImagen) {
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idImagen);
    if (dataPromo.length == 1) {
        alert("Las promociones deben contener al menos una imagen");
        return;
    }
    opcion = confirm("¿Está seguro/a de borrar esta imagen?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                renderDataPromo();
            }
        }
        ajax.open('POST', 'dropImgPromo', true);
        ajax.send(datasend);
    }
}

function onClickOpenFormAddImg() {
    let containerImg = document.querySelector('.container--img');
    if (document.querySelector('.container--imgHormann')) {
        return;
    } else {
        const containerImgHormann = document.createElement('div');
        containerImgHormann.classList.add('container--imgHormann');
        const inputImgHormann = document.createElement('input');
        inputImgHormann.setAttribute('type', 'checkbox');
        inputImgHormann.setAttribute('name', 'imgHormann');
        inputImgHormann.setAttribute('id', 'imgHormann');
        const labelImgHormann = document.createElement('label');
        labelImgHormann.setAttribute('for', 'imgHormann');
        labelImgHormann.textContent = 'Imagen de Hörmann';
        containerImg.insertBefore(containerImgHormann, document.querySelector('.content--img'));
        containerImgHormann.appendChild(inputImgHormann);
        containerImgHormann.appendChild(labelImgHormann);
    }

    // File
    const containerFile = document.createElement('div');
    containerFile.classList.add('container--fileImg');
    const inputFile = document.createElement('input');
    inputFile.setAttribute('type', 'file');
    inputFile.setAttribute('accept', 'image/*');
    inputFile.setAttribute('name', 'newImage');

    if (document.querySelector('.container--fileImg')) { // per a que no es repeteixi
        return;
    }

    // Botó afegir
    const addButton = document.createElement('button');
    addButton.classList.add('btnAdd');
    addButton.classList.add('btnAdmin');
    addButton.setAttribute('onclick', 'onClickAddPromoImg('+ dataPromo[0].idPromo +')');
    addButton.textContent = 'Añadir';

    containerImg.insertBefore(containerFile, document.querySelector('.content--img'));
    containerFile.appendChild(inputFile);
    containerFile.appendChild(addButton);

    // console.log(document.getElementsByClassName('container--imgHormann').length);

}

function onClickAddPromoImg(idPromo) {
    // REVIEW
    let checkedImgHormann = document.getElementById("imgHormann");
    var imgHormann;
    if (checkedImgHormann.checked) {
        // checked yes
        imgHormann = '1';
        // console.log('checkedImgHormann', checkedImgHormann.checked);
    } else {
        imgHormann = '0';
        // no checked
        // console.log('no checked');
    }
    // let checkedImgHormann = document.getElementById("imgHormann").checked = true;
    // END REVIEW
    var token = document.getElementById('token').getAttribute('content');
    var promoImg= document.querySelector('.container--fileImg input').files[0];
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idPromo);
    datasend.append('promoImg', promoImg);
    // REVIEW
    datasend.append('imgHormann', imgHormann);
    // console.log('datasend imgHormann', imgHormann);
    // END REVIEW
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            renderDataPromo();
        }
    }
    ajax.open('POST', 'addPromoImg', true);
    ajax.send(datasend);
    
}