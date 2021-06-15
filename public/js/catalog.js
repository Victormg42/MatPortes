window.onload = function() {
    renderHierarchy();
}

var jerarquia;
var thisLevel;
var hierarchyIdShown;

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

function renderHierarchy(id) { // Obtenir containerCarddades de la jerarquia
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
            drawHierarchyLevel(jerarquia, document.getElementById('myUL'));
        }
    }
    ajax.open('POST', 'getNextLevelHierarchy', true);
    ajax.send(datasend);
}

function drawHierarchyLevel(respuesta, parentNode) { // Dibuixar la jerarquia
    while (parentNode.firstChild) { // borrem tots els fills
        parentNode.removeChild(parentNode.firstChild);
    }
    for (let i = 0; i < respuesta.length; i++) {
        const li = document.createElement('li');
        parentNode.appendChild(li);
        let numSub = parseInt(respuesta[i].numSub); // per saber si te fills
        const iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.setAttribute('onclick', 'onClickEditHierarchy(event, ' + respuesta[i].id + ', ' + numSub + ',' + respuesta[i].id_padre_jerarquia + ')');
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.setAttribute('onclick', 'onClickDropHierarchy(event,' + respuesta[i].id + ', ' + numSub + ')');
        const iProducts = document.createElement('i');
        iProducts.classList.add('fas');
        iProducts.classList.add('fa-box-open');
        iProducts.setAttribute('onclick', 'onClickShowProducts(event,' + respuesta[i].id + ')');
        const iPdf = document.createElement('i');
        iPdf.classList.add('far');
        iPdf.classList.add('fa-file-pdf');
        iPdf.setAttribute('onclick', 'onClickListHierarchyPdfs(event,' + respuesta[i].id + ')');
        if (numSub == 0) { // No te fills
            li.textContent = respuesta[i].nombre;
            li.appendChild(iEdit);
            // li.appendChild(iTrash);
            li.appendChild(iProducts);
            li.appendChild(iPdf);
        } else { // Te fills

            const p = document.createElement('p');
            const spanTitle = document.createElement('span');
            spanTitle.textContent = respuesta[i].nombre;
            const spanArrow = document.createElement('span');
            spanArrow.classList.add('caret');
            spanArrow.setAttribute('onclick', 'onClickHierarchy(event, ' + respuesta[i].id + ')');
            const ul = document.createElement('ul');
            ul.setAttribute('id', 'hierarchyChildren-' + respuesta[i].id);
            ul.classList.add('nested');
            li.appendChild(p);
            p.appendChild(spanArrow);
            p.appendChild(spanTitle);
            spanTitle.appendChild(iEdit);
            // spanTitle.appendChild(iTrash);
            li.appendChild(ul);
        }
    }
}

function onClickHierarchy(event, id) {
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    event.target.classList.toggle("caret-down");
    event.target.parentElement.parentElement.querySelector(".nested").classList.toggle("active");
    if (id) {
        datasend.append('id', id);
    }
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            jerarquia = JSON.parse(ajax.responseText);
            drawHierarchyLevel(jerarquia, document.getElementById('hierarchyChildren-' + id));
        }
    }
    ajax.open('POST', 'getNextLevelHierarchy', true);
    ajax.send(datasend);
}


function onClickEditHierarchy(event, id, numSub, idParent) {
    var contentForm = document.querySelector('.content--catalog');
    let pErrorHtml = document.querySelector('.error');
    var divContainerProducts = document.querySelector('.container--products');
    var divHierarchy = document.querySelector('#editCatalog');
    divHierarchy.style.display = 'block';
    let containerPdf = document.getElementById('container-pdf');
    containerPdf.style.display = 'none';
    while (contentForm.firstChild) { // borrem tots els fills de form
        contentForm.removeChild(contentForm.firstChild);
    }
    if (pErrorHtml) { // Elimina els fills de pErrorHtml (si existeix aquest)
        pErrorHtml.parentNode.removeChild(pErrorHtml);
    }
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            thisLevel = JSON.parse(ajax.responseText);
            // console.log('respuesta onClickEditHierarchy: ', thisLevel);
            // console.log('respuesta onClickEditHierarchy idParent: ', idParent);
            drawInputEdit(thisLevel, numSub, id, idParent);
        }
    }
    ajax.open('POST', 'thisLevelHierarchy', true);
    ajax.send(datasend);
}

function drawInputEdit(respuesta, numSub, id, idParent) {
    var contentForm = document.querySelector('.content--catalog');
    contentForm.style.display = 'block';
    while (contentForm.firstChild) { // borrem tots els fills de form
        contentForm.removeChild(contentForm.firstChild);
    }
    // Nombre
    const containerNombre = document.createElement('div');
    containerNombre.classList.add('container--name');
    const pNombre = document.createElement('p');
    pNombre.textContent = 'Nombre';
    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('value', respuesta[0].nombre);
    inputNombre.setAttribute('name', 'nombre');
    inputNombre.textContent = respuesta[0].nombre;
    // Texto ayuda
    const containerTextoAyuda = document.createElement('div');
    containerTextoAyuda.classList.add('container--help');
    const pTextoAyuda = document.createElement('p');
    pTextoAyuda.textContent = 'Texto ayuda';
    const inputTextoAyuda = document.createElement('input');
    inputTextoAyuda.setAttribute('type', 'text');
    inputTextoAyuda.setAttribute('name', 'textoAyuda');
    inputTextoAyuda.setAttribute('value', respuesta[0].texto_ayuda);
    inputTextoAyuda.textContent = respuesta[0].texto_ayuda;

    // Info
    const containerInfo = document.createElement('div');
    containerInfo.classList.add('container--info');
    const pInfo = document.createElement('p');
    pInfo.textContent = 'Info';
    const textareaInfo = document.createElement('textarea');
    textareaInfo.setAttribute('rows', '4');
    textareaInfo.setAttribute('cols', '50');
    textareaInfo.setAttribute('name', 'info');
    textareaInfo.textContent = respuesta[0].info;

    // Imagen actual
    const containerImg = document.createElement('div');
    containerImg.classList.add('container--img');
    const img = document.createElement('img');
    if (respuesta[0].ruta_img) {
        img.setAttribute('src', 'storage/' + respuesta[0].ruta_img);
        img.setAttribute('name', 'oldImage');
    }

    // File
    const containerFile = document.createElement('div');
    containerFile.classList.add('container--file');
    const inputFile = document.createElement('input');
    inputFile.setAttribute('type', 'file');
    inputFile.setAttribute('accept', 'image/*');
    inputFile.setAttribute('name', 'newImage');

    // editCatalog.appendChild(form);
    // form.appendChild(contentForm);
    // contentForm.appendChild(idHidden);
    contentForm.appendChild(containerNombre);
    containerNombre.appendChild(pNombre);
    containerNombre.appendChild(inputNombre);
    contentForm.appendChild(containerTextoAyuda);
    containerTextoAyuda.appendChild(pTextoAyuda);
    containerTextoAyuda.appendChild(inputTextoAyuda);
    contentForm.appendChild(containerInfo);
    containerInfo.appendChild(pInfo);
    containerInfo.appendChild(textareaInfo);
    contentForm.appendChild(containerImg);
    if (respuesta[0].ruta_img == '') {
        const noImg = document.createElement('p');
        noImg.textContent = 'No hay imagen asociada';
        containerImg.appendChild(noImg);
    } else {
        containerImg.appendChild(img);
    }
    contentForm.appendChild(containerFile);
    containerFile.appendChild(inputFile);

    // IMG HORMANN
    const containerImgHormann = document.createElement('div');
    containerImgHormann.classList.add('container--imgHormann');
    const inputImgHormann = document.createElement('input');
    inputImgHormann.setAttribute('type', 'checkbox');
    inputImgHormann.setAttribute('name', 'imgHormann');
    inputImgHormann.setAttribute('id', 'imgHormann');
    const labelImgHormann = document.createElement('label');
    labelImgHormann.setAttribute('for', 'imgHormann');
    labelImgHormann.textContent = 'Imagen de Hörmann';
    // console.log('respuesta label', respuesta[0].img_hormann)
    if (respuesta[0].img_hormann == 1) {
        // console.log('respuesta label', respuesta[0].img_hormann)
        inputImgHormann.checked = true;
    }
    contentForm.appendChild(containerImgHormann);
    containerImgHormann.appendChild(inputImgHormann);
    containerImgHormann.appendChild(labelImgHormann);

    // Botón modificar
    const divBtn = document.createElement('div');
    divBtn.classList.add('container--btn');
    const modifyButton = document.createElement('button');
    modifyButton.setAttribute('onclick', 'onClickModify(event,' + id + ')');
    modifyButton.classList.add('btnAdmin');
    modifyButton.classList.add('btnModificar');
    modifyButton.textContent = 'Modificar';
    contentForm.appendChild(divBtn);
    divBtn.appendChild(modifyButton);
}

function onClickModify(event, id) { // Modificar la jerarquía indicada
    // Està checked img de hormann??
    let checkedImgHormann = document.getElementById("imgHormann");
    var imgHormann;
    if (checkedImgHormann.checked) {
        // console.log('chek', checkedImgHormann.checked)
        imgHormann = '1';
    } else {
        // console.log('chek', checkedImgHormann.checked)
        imgHormann = '0';
    }

    var divEditCatalog = document.getElementById('editCatalog');
    var contentForm = document.querySelector('.content--catalog');
    var token = document.getElementById('token').getAttribute('content');
    var nombre = document.querySelector('.container--name input');
    var textoAyuda = document.querySelector('.container--help input');
    var info = document.querySelector('.container--info textarea');
    var oldImage = document.getElementsByName('oldImage');
    var imageFile = document.querySelector('.container--file input').files[0];
    if (nombre.value == '') {
        nombre.style.border = "2px solid red";
    } else {
        nombre.style.borderColor = "rgb(118, 118, 118)";
        nombre.style.borderStyle = "solid";
        nombre.style.borderWidth = "1px";
    }
    if (textoAyuda.value == '') {
        textoAyuda.style.border = "2px solid red";
    } else {
        textoAyuda.style.borderColor = "rgb(118, 118, 118)";
        textoAyuda.style.borderStyle = "solid";
        textoAyuda.style.borderWidth = "1px";
    }
    if (info.value == '') {
        info.style.border = "2px solid red";
    } else {
        info.style.borderColor = "rgb(118, 118, 118)";
        info.style.borderStyle = "solid";
        info.style.borderWidth = "1px";
    }
    if (nombre.value == '' || textoAyuda.value == '' || info.value == '' || oldImage.length == 0) {
        event.preventDefault();
    } else {
        var datasend = new FormData();
        datasend.append('_token', token);
        datasend.append('id', id);
        datasend.append('nombre', nombre.value);
        datasend.append('textoAyuda', textoAyuda.value);
        datasend.append('info', info.value);
        datasend.append('imageFile', imageFile);
        datasend.append('imgHormann', imgHormann);
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                while (contentForm.firstChild) { // borrem tots els fills de form
                    contentForm.removeChild(contentForm.firstChild);
                }
                renderHierarchy();
            }
        }
        ajax.open('POST', 'modifyThisLevel', true);
        ajax.send(datasend);
    }
}

function onClickDropHierarchy(event, id, numSub) {
    let pErrorHtml = document.querySelector('.error');
    if (pErrorHtml) { // Elimina pErrorHtml si existeix
        pErrorHtml.parentNode.removeChild(pErrorHtml);
    }

    let divCatalog = document.getElementById('catalog');
    const pError = document.createElement('p');
    pError.classList.add('error');
    opcion = confirm("¿Está seguro/a de borrar esta categoría?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        if (numSub > 0) {
            pError.textContent = 'No se puede eliminar... Tiene categorías asociadas';
            divCatalog.appendChild(pError);
        } else {
            var token = document.getElementById('token').getAttribute('content');
            var datasend = new FormData();
            datasend.append('_token', token);
            datasend.append('id', id);
            var ajax = new objetoAjax();
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    products = JSON.parse(ajax.responseText);
                    // console.log('products: ', products);
                    if (products.length == 0) {
                        // Si hi ha productes associats...
                        let ajax2 = new objetoAjax();
                        let datasend2 = new FormData();
                        datasend2.append('_token', token);
                        datasend2.append('id', id);
                        ajax2.onreadystatechange = function() {
                            if (ajax2.readyState == 4 && ajax2.status == 200) {
                                renderHierarchy();
                            }
                        }
                        ajax2.open('POST', 'dropHierarchy', true);
                        ajax2.send(datasend);
                    } else {
                        // Si no té productes associats...
                        pError.textContent = 'No se puede eliminar... Tiene productos asociados';
                        divCatalog.appendChild(pError);
                    }
                }
            }
            ajax.open('POST', 'getProducts', true);
            ajax.send(datasend);
        }
    }
}

function onClickShowProducts(event, id) { // Buscar les dades dels productes
    hierarchyIdShown = id;
    var divHierarchy = document.querySelector('#editCatalog');
    var contentForm = document.querySelector('.content--catalog');
    let containerPdf = document.getElementById('container-pdf');
    containerPdf.style.display = 'none';
    divHierarchy.style.display = 'block';
    contentForm.style.display = 'block';
    while (contentForm.firstChild) { // borrem tots els fills de form
        contentForm.removeChild(contentForm.firstChild);
    }
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            products = JSON.parse(ajax.responseText);
            drawProducts(products);
        }
    }
    ajax.open('POST', 'getProducts', true);
    ajax.send(datasend);
}

function drawProducts(products) { // Mostrar els productes
    var contentForm = document.querySelector('.content--catalog');
    let divCatalog = document.getElementById('catalog');
    // let divContainerProductsHtml = document.querySelector('.container--products');
    let divContainerProducts = document.createElement('div');
    const h3Productos = document.createElement('h3');
    let containerTitleProducts = document.createElement('div');
    containerTitleProducts.classList.add('container--title-products');
    h3Productos.classList.add('title--product');
    const iAddProduct = document.createElement('i');
    iAddProduct.setAttribute('onclick', 'onClickOpenFormAddProduct()')
    iAddProduct.classList.add('fas');
    iAddProduct.classList.add('fa-plus-circle');
    if (h3Productos) {
        h3Productos.textContent = 'PRODUCTOS';
    }

    let pErrorHtml = document.querySelector('.error');
    if (pErrorHtml) { // Elimina pErrorHtml si existeix
        pErrorHtml.parentNode.removeChild(pErrorHtml);
    }

    divContainerProducts.classList.add('container--products');
    contentForm.appendChild(divContainerProducts);

    divContainerProducts.appendChild(containerTitleProducts);
    containerTitleProducts.appendChild(h3Productos);
    containerTitleProducts.appendChild(iAddProduct);
    // divContainerProducts.appendChild(h3Productos);
    // divContainerProducts.appendChild(iAddProduct);

    let noProductsHtml = document.querySelector('.no_products');
    if (products.length == 0) { // si no hay productos...
        const noProducts = document.createElement('p');
        noProducts.classList.add('no_products');
        noProducts.textContent = 'No hay productos en esta categoría';

        if (!noProductsHtml) {
            divContainerProducts.appendChild(noProducts);
        }
    }

    for (let i = 0; i < products.length; i++) {
        let containerProduct = document.createElement('div'); // Creación del contenedor para este card
        containerProduct.classList.add('container--product'); // add class
        
        let containerTitleProduct = document.createElement('div');
        containerTitleProduct.classList.add('container--title-product');
        containerProduct.appendChild(containerTitleProduct);

        divContainerProducts.appendChild(containerProduct);
        let nameProduct = document.createElement('h2');
        nameProduct.textContent = products[i].nombre;
        // containerProduct.appendChild(nameProduct);
        containerTitleProduct.appendChild(nameProduct);

        let iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.setAttribute('onclick', 'onClickOpenEditProduct(event,' + i + ')');
        // containerProduct.appendChild(iEdit);
        containerTitleProduct.appendChild(iEdit);

        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.setAttribute('onclick', 'onClickDropProduct(event,' + products[i].id + ')');
        // containerProduct.appendChild(iTrash);
        containerTitleProduct.appendChild(iTrash);

    }
}

function onClickOpenEditProduct(event, position) {
    // console.log('event target: ', event.target.parentElement.parentElement);
    // if (event.target.parentElement.lastElementChild.classList.contains('content--product')) { // vol dir que ha existiex el div, per tant, no volem que es torni a pintar
    //     return
    // }
    if (document.querySelector('.content--product-'+position)) { // vol dir que ha existiex el div, per tant, no volem que es torni a pintar
        return;
    }
    var divContainerProductHtml = event.target.parentElement.parentElement;
    let divContentProduct = document.createElement('div');
    divContentProduct.classList.add('content--product-'+position);
    divContainerProductHtml.appendChild(divContentProduct);

    // Form
    const form = document.createElement('div');
    form.classList.add('formEdit--product');
    divContentProduct.appendChild(form);

    // Input name _token, _method, id
    const token = document.createElement('input');
    token.setAttribute('type', 'hidden');
    token.setAttribute('name', '_token');
    token.setAttribute('value', '6kqqC8HLV6hG6FKrOaWnYrRTOFXzZrdZyG7YQd4h');
    const method = document.createElement('input');
    method.setAttribute('type', 'hidden');
    method.setAttribute('name', '_method');
    method.setAttribute('value', 'PUT');
    const id = document.createElement('input');
    id.setAttribute('type', 'hidden');
    id.setAttribute('value', products[position].id);
    id.setAttribute('name', 'id');

    form.appendChild(token);
    form.appendChild(method);
    form.appendChild(id);

    // Nombre
    const containerNombre = document.createElement('div')
    containerNombre.classList.add('container--nameP');
    const pNombre = document.createElement('p');
    pNombre.textContent = 'Nombre';
    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('value', products[position].nombre);
    inputNombre.setAttribute('name', 'nombreP');
    inputNombre.classList.add('nombreP-' + position); 
    inputNombre.textContent = products[position].nombre;

    form.appendChild(containerNombre);
    containerNombre.appendChild(pNombre);
    containerNombre.appendChild(inputNombre);

    // Descripción
    const containerDesc = document.createElement('div');
    containerDesc.classList.add('container--desc');
    const pDesc = document.createElement('p');
    pDesc.textContent = 'Descripción';
    const textareaDesc = document.createElement('textarea');
    textareaDesc.setAttribute('rows', '4');
    textareaDesc.setAttribute('cols', '50');
    textareaDesc.setAttribute('name', 'descP');
    textareaDesc.classList.add('descP-' + position); 
    textareaDesc.textContent = products[position].descripcion;

    form.appendChild(containerDesc);
    containerDesc.appendChild(pDesc);
    containerDesc.appendChild(textareaDesc);

    // Imagen actual
    const containerImg = document.createElement('div');
    containerImg.classList.add('container--imgP');
    const img = document.createElement('img');
    if (products[position].ruta_img) {
        img.setAttribute('src', 'storage/' + products[position].ruta_img);
        img.setAttribute('name', 'oldImageP');
    }

    form.appendChild(containerImg);
    containerImg.appendChild(img);

    // File
    const containerFile = document.createElement('div');
    containerFile.classList.add('container--fileP');
    const inputFile = document.createElement('input');
    inputFile.setAttribute('type', 'file');
    inputFile.setAttribute('accept', 'image/*');
    inputFile.setAttribute('name', 'newImageP');
    inputFile.classList.add('newImageP-' + position); 

    form.appendChild(containerFile);
    containerFile.appendChild(inputFile);

    // Img Hörmann
    const containerImgHormann = document.createElement('div');
    containerImgHormann.classList.add('container--imgHormann');
    const inputImgHormann = document.createElement('input');
    inputImgHormann.setAttribute('type', 'checkbox');
    inputImgHormann.setAttribute('name', 'imgHormann');
    inputImgHormann.setAttribute('id', 'imgHormann');
    const labelImgHormann = document.createElement('label');
    labelImgHormann.setAttribute('for', 'imgHormann');
    labelImgHormann.textContent = 'Imagen de Hörmann';
    // console.log('respuesta label', products[position].img_hormann)
    if (products[position].img_hormann == 1) {
        // console.log('respuesta label', products[position].img_hormann)
        inputImgHormann.checked = true;
    }
    form.appendChild(containerImgHormann);
    containerImgHormann.appendChild(inputImgHormann);
    containerImgHormann.appendChild(labelImgHormann);

    // Botón modificar
    const divBtn = document.createElement('div');
    divBtn.classList.add('container--btn');
    const modifyButton = document.createElement('button');
    modifyButton.textContent = 'Modificar';
    modifyButton.setAttribute('onclick', 'onClickModifyProduct(event,' + products[position].id + ', ' + position + ')');
    modifyButton.classList.add('btnModificar');
    modifyButton.classList.add('btnAdmin');
    form.appendChild(divBtn);
    divBtn.appendChild(modifyButton);
}

function onClickModifyProduct(event, idProduct, position) {
    // Està checked img hormann??
    let checkedImgHormann = document.getElementById("imgHormann");
    var imgHormann;
    if (checkedImgHormann.checked) {
        // console.log('chek', checkedImgHormann.checked)
        imgHormann = '1';
    } else {
        // console.log('chek', checkedImgHormann.checked)
        imgHormann = '0';
    }

    var token = document.getElementById('token').getAttribute('content');
    let nombre = document.querySelector('.nombreP-' + position);
    let descripcion = document.querySelector('.descP-' + position);
    let imageFile = document.querySelector('.newImageP-' + position).files[0];
    var oldImage = document.getElementsByName('oldImageP');
if (nombre.value == '') {
        nombre.style.border = "2px solid red";
    } else {
        nombre.style.borderColor = "rgb(118, 118, 118)";
        nombre.style.borderStyle = "solid";
        nombre.style.borderWidth = "1px";
    }
    if (descripcion.value == '') {
        descripcion.style.border = "2px solid red";
    } else {
        descripcion.style.borderColor = "rgb(118, 118, 118)";
        descripcion.style.borderStyle = "solid";
        descripcion.style.borderWidth = "1px";
    }
    if (nombre.value == '' || descripcion.value == '' || oldImage.length == 0) {
        event.preventDefault();
    } else 
    var datasend = new FormData();
    datasend.append('imgHormann', imgHormann);
    datasend.append('_token', token);
    datasend.append('id', idProduct);
    datasend.append('nombre', nombre.value);
    datasend.append('descripcion', descripcion.value);
    datasend.append('imageFile', imageFile);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            onClickShowProducts(event, hierarchyIdShown);
        }
    }
    ajax.open('POST', 'modifyThisProduct', true);
    ajax.send(datasend);
}

function onClickDropProduct(event, id) { // Eliminar un producte
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    opcion = confirm("¿Está seguro/a de borrar esta categoría?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                onClickShowProducts(event, hierarchyIdShown);
            }
        }
        ajax.open('POST', 'dropProducts', true);
        ajax.send(datasend);
    }
}

function onClickOpenFormAddProduct() {
    let formAdd = document.querySelector('.add--product');
    if (formAdd) { // per a que no ho pinti de nou.
        return;
    }
    let divContainerProducts = document.querySelector('.container--products');
    let divContainerProduct = document.querySelector('.container--product');
    let title = document.querySelector('.title--product');
    // Form
    const form = document.createElement('div');
    form.classList.add('add--product');
    
    divContainerProducts.insertBefore(form, divContainerProduct); // S'inserta el formulari després de la icona de '+'
    // divContainerProducts.insertBefore(form, title.nextSibling.nextSibling); // S'inserta el formulari després de la icona de '+'
    // Nombre
    const containerNombre = document.createElement('div');
    containerNombre.classList.add('container--namePNew');
    const pNombre = document.createElement('p');
    pNombre.textContent = 'Nombre';
    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('name', 'nombrePNew');

    form.appendChild(containerNombre);
    containerNombre.appendChild(pNombre);
    containerNombre.appendChild(inputNombre);

    // Descripción
    const containerDesc = document.createElement('div');
    containerDesc.classList.add('container--descNew');
    const pDesc = document.createElement('p');
    pDesc.textContent = 'Descripción';
    const textareaDesc = document.createElement('textarea');
    textareaDesc.setAttribute('rows', '4');
    textareaDesc.setAttribute('cols', '50');
    textareaDesc.setAttribute('name', 'descPNew');

    form.appendChild(containerDesc);
    containerDesc.appendChild(pDesc);
    containerDesc.appendChild(textareaDesc);

    // File
    const containerFile = document.createElement('div');
    containerFile.classList.add('container--filePNew');
    const inputFile = document.createElement('input');
    inputFile.setAttribute('type', 'file');
    inputFile.setAttribute('accept', 'image/*');
    inputFile.setAttribute('name', 'newImagePNew');

    form.appendChild(containerFile);
    containerFile.appendChild(inputFile);

    // Img Hörmann
    const containerImgHormann = document.createElement('div');
    containerImgHormann.classList.add('container--imgHormann');
    const inputImgHormann = document.createElement('input');
    inputImgHormann.setAttribute('type', 'checkbox');
    inputImgHormann.setAttribute('name', 'imgHormann');
    inputImgHormann.setAttribute('id', 'imgHormann');
    const labelImgHormann = document.createElement('label');
    labelImgHormann.setAttribute('for', 'imgHormann');
    labelImgHormann.textContent = 'Imagen de Hörmann';
    form.appendChild(containerImgHormann);
    containerImgHormann.appendChild(inputImgHormann);
    containerImgHormann.appendChild(labelImgHormann);

    // Botó afegir
    const divBtn = document.createElement('div');
    divBtn.classList.add('container--btn');
    const addButton = document.createElement('button');
    addButton.setAttribute('onclick', 'onClickAddProduct(event,' + hierarchyIdShown + ')');
    addButton.classList.add('btnAdmin');
    addButton.classList.add('btnAdd');
    addButton.textContent = 'Añadir';
    form.appendChild(divBtn);
    divBtn.appendChild(addButton);
}

function onClickAddProduct(event, hierarchyId) {
    // Està checked img hormann??
    let checkedImgHormann = document.getElementById("imgHormann");
    var imgHormann;
    if (checkedImgHormann.checked) {
        // console.log('chek', checkedImgHormann.checked)
        imgHormann = '1';
    } else {
        // console.log('chek', checkedImgHormann.checked)
        imgHormann = '0';
    }
    var token = document.getElementById('token').getAttribute('content');
    let nombre = document.getElementsByName('nombrePNew')[0];
    let descripcion = document.getElementsByName('descPNew')[0];
    let imageFile = document.querySelector('.container--filePNew input').files[0];
    if (nombre.value == '') {
        nombre.style.border = "2px solid red";
    } else {
        nombre.style.borderColor = "rgb(118, 118, 118)";
        nombre.style.borderStyle = "solid";
        nombre.style.borderWidth = "1px";
    }
    if (descripcion.value == '') {
        descripcion.style.border = "2px solid red";
    } else {
        descripcion.style.borderColor = "rgb(118, 118, 118)";
        descripcion.style.borderStyle = "solid";
        descripcion.style.borderWidth = "1px";
    }
    if (nombre.value == '' || descripcion.value == '') {
        event.preventDefault();
    } else {
        var datasend = new FormData();
        // console.log('imageFile: ', imageFile);
        datasend.append('_token', token);
        datasend.append('id', hierarchyId);
        datasend.append('nombre', nombre.value);
        datasend.append('descripcion', descripcion.value);
        datasend.append('imageFile', imageFile);
        datasend.append('imgHormann', imgHormann);
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                onClickShowProducts(event, hierarchyId);
            }
        }
        ajax.open('POST', 'addProduct', true);
        ajax.send(datasend);
    }
}

var currentHierarchyId;
function onClickListHierarchyPdfs(event, hierarchyId) {
    currentHierarchyId = hierarchyId;
    let containerPdf = document.getElementById('container-pdf');
    let contentCatalog = document.querySelector('.content--catalog');
    containerPdf.style.display = 'block';
    let editCatalog = document.getElementById('editCatalog');
    editCatalog.style.display = 'none';
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', hierarchyId);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            hierarchyPdfs = JSON.parse(ajax.responseText);
            // console.log('response onClickListHierarchyPdfs', hierarchyPdfs);
            drawListHierarchyPdfs(hierarchyId, hierarchyPdfs);
        }
    }
    ajax.open('POST', 'getHierarchyPdfs', true);
    ajax.send(datasend);
}

function drawListHierarchyPdfs(hierarchyId, hierarchyPdfs) {
    let existingPDFs = document.getElementById('existingPDFs');
    var contentForm = document.querySelector('.content--catalog');
    if (existingPDFs) {
        while (existingPDFs.firstChild) { // borrem tots els fills de form
            existingPDFs.removeChild(existingPDFs.firstChild);
        }
    }

    if (hierarchyPdfs.length == 0) {
        const pNoPdf = document.createElement('p');
        pNoPdf.textContent = 'No hay pdf\'s en esta categoría';
        contexistingPDFsentForm.appendChild(pNoPdf);
    }

    for (let i = 0; i < hierarchyPdfs.length; i++) {
        const containerNombre = document.createElement('div');
        containerNombre.classList.add('container--name');
        containerNombre.classList.add('container--pdfDelete');
        const aNombre = document.createElement('a');
        aNombre.textContent = hierarchyPdfs[i].nombre;
        aNombre.setAttribute('name', 'nombre');
        aNombre.setAttribute('target', '_blank');
        aNombre.setAttribute('href', 'storage/' + hierarchyPdfs[i].ruta_pdf);

        if (existingPDFs) {
            existingPDFs.appendChild(containerNombre);
        }
        containerNombre.appendChild(aNombre);

        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.setAttribute('onclick', 'onClickDropPdf(event,' + hierarchyPdfs[i].id + ', ' + hierarchyId + ')');

        containerNombre.appendChild(iTrash);
    }

}

function onClickAddHierarchyPdf(event) {
    var token = document.getElementById('token').getAttribute('content');
    let nombre = document.querySelector('.container--namePdf input');
    let pdfFile = document.querySelector('.container--filePdf input').files[0];
    if (nombre.value == '') {
        nombre.style.border = "2px solid red";
    } else {
        nombre.style.borderColor = "rgb(118, 118, 118)";
        nombre.style.borderStyle = "solid";
        nombre.style.borderWidth = "1px";
        var datasend = new FormData();
        datasend.append('_token', token);
        datasend.append('id', currentHierarchyId);
        datasend.append('nombre', nombre.value);
        datasend.append('pdfFile', pdfFile);
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                // console.log('se ha añadido correctamente');
                nombre.textContent = "";
                nombre.value = "";
                onClickListHierarchyPdfs(event, currentHierarchyId);
            }
        }
        ajax.open('POST', 'addHierarchyPdf', true);
        ajax.send(datasend);
    }
}

function onClickDropPdf(event, idPdf, hierarchyId) {
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idPdf);
    opcion = confirm("¿Está seguro/a de borrar este archivo?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                onClickListHierarchyPdfs(event, hierarchyId);
            }
        }
        ajax.open('POST', 'dropPdf', true);
        ajax.send(datasend);
    }
}

function onClickOpenFormAddHierarchyLevel(event, idParent) {
    // console.log('parent onClickOpenFormAddHierarchyLevel: ', idParent);
}