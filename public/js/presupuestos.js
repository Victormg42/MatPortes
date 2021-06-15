document.addEventListener("DOMContentLoaded", function(event) {
    mesAlert();
    var client = document.getElementById('client');
    var mensaje = document.getElementById('mensaje');
    client.addEventListener('change', (event) => {
        if (client.value == 'particular') {
            mensaje.textContent = "";
            var nombre = document.querySelector('.container--nombre input');
            var apellido1 = document.querySelector('.container--apellido1 input');
            nombre.style.border = '1px solid grey';
            apellido1.style.border = '1px solid grey';
            document.querySelector('.container--particular').style.display = "grid";
            document.querySelector('.container--empresa').style.display = "none";
        } else {
            mensaje.textContent = "";
            var input1 = document.getElementsByClassName('empresa-required')[0];
            input1.style.border = '1px solid gray';
            document.querySelector('.container--particular').style.display = "none";
            document.querySelector('.container--empresa').style.display = "grid";
        }
    });
});

var products = [];
var productsHtml = [];

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

function requiredInputs(event, idPresupuesto) {
    var mensaje = document.getElementById('mensaje');
    mensaje.textContent = "";
    var client = document.getElementById('client');
    if (client.value == 'particular') {
        var nombre = document.querySelector('.container--nombre input');
        var apellido1 = document.querySelector('.container--apellido1 input');
        var mensaje = document.getElementById('mensaje');
        if (nombre.value == '' || apellido1.value == '') {
            if (nombre.value == '') {
                nombre.style.border = '2px solid red';
                mensaje.innerHTML = 'Tienes algún campo requerido sin rellenar';
                mensaje.style.color = "red";
            } else { // 14-05-21
                nombre.style.border = '1px solid grey';
            }
            if (apellido1.value == '') {
                apellido1.style.border = '2px solid red';
                mensaje.innerHTML = 'Tienes algún campo requerido sin rellenar';
                mensaje.style.color = "red";
            } else { // 14-05-21
                apellido1.style.border = '1px solid grey';
            }
            event.preventDefault();
        } else {
            nombre.style.border = '1px solid grey';
            apellido1.style.border = '1px solid grey';
            onClickSave(idPresupuesto);
        }
    } else if (client.value == 'empresa') {
        // console.log('client value: ', client.value);
        var input1 = document.getElementsByClassName('empresa-required')[0];
        var mensaje = document.getElementById('mensaje');
        if (input1.value == '') {
            // console.log('en el if de empresa')
            input1.style.border = '2px solid red';
            mensaje.innerHTML = 'Tienes algún campo requerido sin rellenar';
            mensaje.style.color = 'red';
            event.preventDefault();
        } else {
            // console.log('en el else de empresa')
            input1.style.border = '1px solid gray';
            onClickSave(idPresupuesto);
        }
    }
}

function validatorProduct() {
    var nombre_material = document.getElementsByName('nombre_material')[0].value;
    if (nombre_material == '') {
        document.getElementsByName('cantidad')[0].disabled = true;
        document.getElementsByName('material_base-precio_unidad')[0].disabled = true;
        document.getElementsByName('iva')[0].disabled = true;
        document.getElementsByName('iva')[0].value = '21';
        document.getElementsByName('descuento')[0].disabled = true;
        document.getElementsByName('descuento')[0].value = '0';
        document.getElementsByName('descripcion_material')[0].disabled = true;
    } else {
        document.getElementsByName('cantidad')[0].disabled = false;
        document.getElementsByName('cantidad')[0].className += 'required';
        document.getElementsByName('material_base-precio_unidad')[0].disabled = false;
        document.getElementsByName('material_base-precio_unidad')[0].className += 'required';
        document.getElementsByName('iva')[0].disabled = false;
        document.getElementsByName('iva')[0].className += 'required';
        document.getElementsByName('iva')[0].value = '21';
        document.getElementsByName('descuento')[0].disabled = false;
        document.getElementsByName('descuento')[0].className += 'required';
        document.getElementsByName('descuento')[0].value = '0';
        document.getElementsByName('descripcion_material')[0].disabled = false;
        document.getElementsByName('descripcion_material')[0].className += 'required';
    }
}

function onClickOpenCreate() {
    // 14-05-21
    idPresupuesto = -1;
    // END 14-05-21
    var mensaje = document.getElementById('mensaje');
    mensaje.textContent = "";
    let inputs = document.querySelectorAll('.container--crear input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs.name == 'iva') {
            return;
        }
        if (inputs.name == 'descuento') {
            return;
        }
        inputs[i].value = "";
        inputs[i].style.border = '1px solid gray';
    }
    document.querySelector('.container--descripcion-material textarea').value = "";

    let imagenesActuales = document.querySelector('.imagenes-actuales');
    while (imagenesActuales.firstChild) { // borrem tots els fills
        imagenesActuales.removeChild(imagenesActuales.firstChild);
    }

    let containerImg = document.querySelector('.fileImg');
    while (containerImg.firstChild) { // borrem tots els fills
        containerImg.removeChild(containerImg.firstChild);
    }
    document.querySelector('.presupuestosSaved').style.display = "none";
    document.querySelector('.presupuestosEnviados').style.display = "none";
    document.querySelector('.container--crear').style.display = "block";

    // 14-05-21
    let productosActuales = document.querySelector('.productos-actuales');
    while (productosActuales.firstChild) { // borrem tots els fills
        productosActuales.removeChild(productosActuales.firstChild);
    }
    products = [];
    // console.log('poroducts: ', products);
    // END 14-05-21
}

var idPresupuesto = -1;

function onClickSave(idPresupuesto) {
    var token = document.getElementById('token').getAttribute('content');
    var mensaje = document.getElementById('mensaje');
    let nombre = document.querySelector('.container--nombre input');
    let primerApellido = document.querySelector('.container--apellido1 input');
    let segundoApellido = document.querySelector('.container--apellido2 input');
    let dni = document.querySelector('.container--dni input');
    let nombreEmpresa = document.querySelector('.name-empresa input');
    let nif = document.querySelector('.container--nif input');
    let telefono = document.querySelector('.container--telefono input');
    let email = document.querySelector('.container--email input');
    let ubicacion = document.querySelector('.container--ubicacion input');
    let precioTransporte = document.querySelector('.container--precio-transporte input');
    let descripcionTrabajo = document.querySelector('.container--descripcion-trabajo input');
    let medidasTecnicas = document.querySelector('.container--medidas-tecnicas textarea');
    let importeTotal = document.querySelector('.container--importe-total input');
    var allProducts = JSON.stringify(products);

    if (nombre.length == 0) {
        nombre.value = 'NULL';
    } else {
        nombre = nombre.value;
    }
    if (primerApellido.length == 0) {
        primerApellido.value = 'NULL';
    } else {
        primerApellido = primerApellido.value;
    }
    if (segundoApellido.length == 0) {
        segundoApellido.value = 'NULL';
    } else {
        segundoApellido = segundoApellido.value;
    }
    if (dni.length == 0) {
        dni.value = 'NULL';
    } else {
        dni = dni.value;
    }
    if (nombreEmpresa.length == 0) {
        nombreEmpresa.value = 'NULL';
    } else {
        nombreEmpresa = nombreEmpresa.value;
        // console.log('value nombre empresa: ', nombreEmpresa);
    }
    if (nif.length == 0) {
        nif.value = 'NULL';
    } else {
        nif = nif.value;
    }
    if (telefono.length == 0) {
        telefono.value = 'NULL';
    } else {
        telefono = telefono.value;
    }
    if (email.length == 0) {
        email.value = 'NULL';
    } else {
        email = email.value;
    }
    if (ubicacion.length == 0) {
        ubicacion.value = 'NULL';
    } else {
        ubicacion = ubicacion.value;
    }
    if (precioTransporte.length == 0) {
        precioTransporte.value = 'NULL';
    } else {
        precioTransporte = precioTransporte.value;
    }
    if (descripcionTrabajo.length == 0) {
        descripcionTrabajo.value = 'NULL';
    } else {
        descripcionTrabajo = descripcionTrabajo.value;
    }
    if (importeTotal.length == 0) {
        importeTotal.value = 'NULL';
    } else {
        importeTotal = importeTotal.value;
    }
    if (medidasTecnicas.length == 0) {
        medidasTecnicas.value = 'NULL';
    } else {
        medidasTecnicas = medidasTecnicas.value;
    }

    // AFEGIR IMATGES
    var datasend = new FormData();
    var lengthImage = 0;
    var count = 0;
    let inputsFile = document.querySelectorAll('.fileImg input');
    for (let i = 0; i < inputsFile.length; i++) {
        if (typeof inputsFile[i].files[0] !== 'undefined') {
            datasend.append('image-' + i, inputsFile[i].files[0]);
            // console.log('image-' + i, inputsFile[i].files[0])
            count++;
        }
    }
    lengthImage = count;
    var client = document.getElementById('client');
    // END AFEGIR IMATGES
    if (client.value == 'particular') {
        datasend.append('nombre', nombre);
        datasend.append('primerApellido', primerApellido);
        datasend.append('segundoApellido', segundoApellido);
        datasend.append('dni', dni);
    } else {
        datasend.append('nombreEmpresa', nombreEmpresa);
        datasend.append('nif', nif);
    }
    datasend.append('client', client.value);
    datasend.append('allProducts', allProducts);
    datasend.append('_token', token);
    datasend.append('idPresupuesto', idPresupuesto);
    datasend.append('telefono', telefono);
    datasend.append('email', email);
    datasend.append('ubicacion', ubicacion);
    datasend.append('precioTransporte', precioTransporte);
    datasend.append('descripcionTrabajo', descripcionTrabajo);
    datasend.append('medidasTecnicas', medidasTecnicas);
    datasend.append('importeTotal', importeTotal);
    datasend.append('lengthImage', lengthImage);

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            mensaje.innerHTML = 'El presupuesto se ha guardado correctamente';
            mensaje.style.color = 'green';
            if (idPresupuesto != -1) {
                onClickOpenEditEstimate(idPresupuesto);
            } else { // 21-05-21
                idPresupuesto = JSON.parse(ajax.responseText);
                onClickOpenEditEstimate(idPresupuesto);
            } //END 21-05-21
        }
    }
    ajax.open('POST', 'addNewEstimate', true);
    ajax.send(datasend);
}

function onClickOpenProduct() { // S'obren inputs per afegir materials
    let inputsNuevoMaterial = document.querySelectorAll('.container--editor-material input');
    for (let i = 0; i < inputsNuevoMaterial.length; i++) {
        inputsNuevoMaterial[i].value = "";
    }
    document.querySelector('.container--descripcion-material textarea').value = "";
}

// 18-05-21
function onClickStore() { // S'afegeix el producte i fa display-none dels inputs per afegir material.
    // var insertedNode = parentNode.insertBefore(newNode, referenceNode);
    let descripcionMaterial = document.querySelector('.container--descripcion-material');
    let nombreProducto = document.querySelector('.container--nombre-material input').value;
    let cantidadProducto = document.querySelector('.container--cantidad input').value;
    let precioBaseUnidad = document.querySelector('.container--base-precio-unidad input').value;
    let ivaProducto = document.querySelector('.container--iva input').value;
    let descuentoProducto = document.querySelector('.container--descuento input').value;
    // console.log('descuento: ', descuentoProducto)
    let totalProductoConIva = document.querySelector('.container--total-con-iva input').value;
    let descripcionProducto = document.querySelector('.container--descripcion-material textarea').value;
    var editProduct = document.querySelector('.container--editor-material');
    editProduct.remove();
    let nuevoMaterial = document.querySelector('.nuevo-material');
    // nuevoMaterial.appendChild(editProduct);
    nuevoMaterial.insertBefore(editProduct, descripcionMaterial);

    var product;
    if (editedPosition == -1) {
        product = {}
        products.push(product);
    } else {
        product = products[editedPosition];
    }
    product.nombreProducto = nombreProducto;
    product.cantidadProducto = cantidadProducto;
    product.precioBaseUnidad = precioBaseUnidad;
    product.ivaProducto = ivaProducto;
    product.descuentoProducto = descuentoProducto;
    product.totalProductoConIva = totalProductoConIva;
    product.descripcionProducto = descripcionProducto;
    product.idPresupuesto = -1;
    product.idProduct = -1;

    onClickCalculateAll();
    drawProducts();
    let editorMaterial = document.querySelectorAll('.container--editor-material input');
    for (let i = 0; i < editorMaterial.length; i++) {
        editorMaterial[i].value = "";
    }
    document.querySelector('.container--descripcion-material textarea').value = "";

    let acceptProduct = document.getElementById('accept-product');
    acceptProduct.textContent = "AÑADIR";
    editedPosition = -1;
    validatorProduct();
}

function drawProducts() {
    // Clear products
    let productosActuales = document.querySelector('.productos-actuales');
    while (productosActuales.firstChild) { // borrem tots els fills
        productosActuales.removeChild(productosActuales.firstChild);
    }
    // console.log('en draw propducts: ', products);
    for (let i = 0; i < products.length; i++) {
        let iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.addEventListener('click', onClickOpenEditProduct.bind(this, i));
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        // REVIEW
        // iTrash.addEventListener('click', onClickDropProduct.bind(this, event, products[i].id));
        iTrash.addEventListener('click', onClickDropProduct.bind(this, event, i, products[i].id));
        // END REVIEW
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('container--product-' + i);
        const containerTitleProduct = document.createElement('div');
        containerTitleProduct.classList.add('container--title-product')
        const pnombre = document.createElement('p');
        pnombre.textContent = products[i].nombreProducto;
        productosActuales.appendChild(containerProduct);
        containerProduct.appendChild(containerTitleProduct);
        containerTitleProduct.appendChild(pnombre);
        containerTitleProduct.appendChild(iEdit);
        containerTitleProduct.appendChild(iTrash);
    }
}

function cancelCurrentEdition() {
    drawProducts();
}
var editedPosition = -1;

function onClickOpenEditProduct(position) {
    let descripcionMaterial = document.querySelector('.container--descripcion-material');
    let nuevoMaterial = document.querySelector('.nuevo-material');
    
    var editProduct = document.querySelector('.container--editor-material');
    let currentProduct = products[position];
    let nombreProducto = document.querySelector('.container--nombre-material input');
    nombreProducto.value = currentProduct.nombreProducto;
    let cantidadProducto = document.querySelector('.container--cantidad input');
    cantidadProducto.value = currentProduct.cantidadProducto;
    let precioBaseUnidad = document.querySelector('.container--base-precio-unidad input');
    precioBaseUnidad.value = currentProduct.precioBaseUnidad;
    let ivaProducto = document.querySelector('.container--iva input');
    ivaProducto.value = currentProduct.ivaProducto;
    let descuentoProducto = document.querySelector('.container--descuento input');
    descuentoProducto.value = currentProduct.descuentoProducto;
    let totalProductoConIva = document.querySelector('.container--total-con-iva input');
    totalProductoConIva.value = currentProduct.totalProductoConIva;
    let descripcionProducto = document.querySelector('.container--descripcion-material textarea');
    descripcionProducto.value = currentProduct.descripcionProducto;
    editProduct.remove();

    if (editedPosition != -1) {
        cancelCurrentEdition();
    }

    let containerProduct = document.querySelector('.container--product-' + position);
    while (containerProduct.firstChild) {
        containerProduct.firstChild.remove();
    }
    nuevoMaterial.insertBefore(editProduct, descripcionMaterial);
    // containerProduct.appendChild(editProduct);
    let acceptProduct = document.getElementById('accept-product');
    acceptProduct.textContent = "MODIFICAR";
    editedPosition = position;
    if (document.querySelector('.container--detail-product')) {
        return;
    }
}

// GUARDADOS
function onClickOpenSaved() {
    let containerImg = document.querySelector('.fileImg');
    while (containerImg.firstChild) { // borrem tots els fills
        containerImg.removeChild(containerImg.firstChild);
    }
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            estimates = JSON.parse(ajax.responseText);
            drawSaved(estimates);
        }
    }
    ajax.open('GET', 'savedEstimate', true);
    ajax.send();
}

function drawSaved(estimates) {
    let containerGuardados = document.querySelector('.container--guardados');
    // REVIEW

    while (containerGuardados.firstChild) { // borrem tots els fills
        containerGuardados.removeChild(containerGuardados.firstChild);
    }

    for (let i = 0; i < estimates.length; i++) {
        const containerEstimate = document.createElement('div');
        containerEstimate.classList.add('container-estimate-' + estimates[i].id);
        const guardadoNombre = document.createElement('div');
        guardadoNombre.classList.add('guardado-nombre');
        pNombre = document.createElement('p');
        const guardadoApellido1 = document.createElement('div');
        guardadoApellido1.classList.add('guardado-apellido');
        papellido1 = document.createElement('p');
        papellido1.textContent = estimates[i].apellido1_cliente;
        const fechaGuardado = document.createElement('div');
        fechaGuardado.classList.add('fecha-guardado');
        pFechaGuardado = document.createElement('p');
        pFechaGuardado.textContent = estimates[i].fecha_guardado;
        const ultimaModificacion = document.createElement('div');
        ultimaModificacion.classList.add('ultima-modificacion');
        pUltimaModificacion = document.createElement('p');
        pUltimaModificacion.textContent = estimates[i].fecha_ultima_modificacion;

        // btn editar
        const containerEdit = document.createElement('div');
        containerEdit.classList.add('editarPresupuesto');
        let iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.addEventListener('click', onClickOpenEditEstimate.bind(this, estimates[i].id));

        // btn Eliminar
        const containerTrash = document.createElement('div');
        containerTrash.classList.add('borrarPresupuesto');
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.addEventListener('click', onClickDropEstimate.bind(this, event, estimates[i].id));

        // btn iMPRIMIR
        const containerPrint = document.createElement('div');
        containerPrint.classList.add('imprimir');
        const printPdf = document.createElement('i');
        printPdf.classList.add('fas');
        printPdf.classList.add('fa-print');
        const form = document.createElement('form');
        form.setAttribute('method', 'get');
        form.setAttribute('action', "presupuestoPdf/" + estimates[i].id);
        const buttonSubmit = document.createElement('button');
        buttonSubmit.setAttribute('type', 'submit');

        if (estimates[i].nombre_cliente != null) {
            pNombre.textContent = estimates[i].nombre_cliente;
        } else {
            pNombre.textContent = estimates[i].nombre_empresa;
            guardadoNombre.style.backgroundColor = "#cfeef4";
            guardadoApellido1.style.backgroundColor = "#cfeef4";
            fechaGuardado.style.backgroundColor = "#cfeef4";
            ultimaModificacion.style.backgroundColor = "#cfeef4";
            containerTrash.style.backgroundColor = "#cfeef4";
            containerEdit.style.backgroundColor = "#cfeef4";
            containerPrint.style.backgroundColor = "#cfeef4";
        }

        containerGuardados.appendChild(containerEstimate);
        containerEstimate.appendChild(guardadoNombre);
        guardadoNombre.appendChild(pNombre);
        containerEstimate.appendChild(guardadoApellido1);
        guardadoApellido1.appendChild(papellido1);
        containerEstimate.appendChild(fechaGuardado);
        fechaGuardado.appendChild(pFechaGuardado);
        containerEstimate.appendChild(ultimaModificacion);
        ultimaModificacion.appendChild(pUltimaModificacion);
        containerEstimate.appendChild(containerEdit);
        containerEdit.appendChild(iEdit);
        containerEstimate.appendChild(containerTrash);
        containerTrash.appendChild(iTrash);
        containerEstimate.appendChild(containerPrint);
        containerPrint.appendChild(form);
        form.appendChild(buttonSubmit);
        buttonSubmit.appendChild(printPdf);
    }
    document.querySelector('.container--crear').style.display = "none";
    document.querySelector('.presupuestosEnviados').style.display = "none";
    document.querySelector('.presupuestosSaved').style.display = "block";
}

function onClickOpenEditEstimate(idEstimate) {
    // Obtenim les dades d'aquest presupost, de la BBDD
    var token = document.getElementById('token').getAttribute('content');

    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idEstimate);

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            dataCurrentEstimate = JSON.parse(ajax.responseText);
            products = dataCurrentEstimate['dataProduct'];
            // console.log('products: ', products);
            for (let i = 0; i < dataCurrentEstimate['dataProduct'].length; i++) {
                products[i].nombreProducto = dataCurrentEstimate['dataProduct'][i].nombre_material;
                products[i].cantidadProducto = dataCurrentEstimate['dataProduct'][i].cantidad;
                products[i].precioBaseUnidad = dataCurrentEstimate['dataProduct'][i].base_precio_unidad;
                products[i].ivaProducto = dataCurrentEstimate['dataProduct'][i].iva;
                products[i].descuentoProducto = dataCurrentEstimate['dataProduct'][i].descuento;
                products[i].totalProductoConIva = dataCurrentEstimate['dataProduct'][i].total_con_iva;
                products[i].descripcionProducto = dataCurrentEstimate['dataProduct'][i].descripcion_material;
                products[i].idPresupuesto = dataCurrentEstimate['dataProduct'][i].id_presupuesto;
                products[i].idProduct = dataCurrentEstimate['dataProduct'][i].id;
            }
            drawCurrentEstimate(dataCurrentEstimate);
            drawProducts();
            drawImages(dataCurrentEstimate);
            // 21-05-21
            onClickCalculateAll();
            // END 21-05-21
        }
    }
    ajax.open('POST', 'getDataCurrentEstimate', true);
    ajax.send(datasend);

}

function drawCurrentEstimate(dataCurrentEstimate) {
    // console.log('drawCurrentEstimate', dataCurrentEstimate)
    document.querySelector('.presupuestosSaved').style.display = "none";
    document.querySelector('.container--crear').style.display = "block";
    let nombre = document.querySelector('.container--nombre input');
    let primerApellido = document.querySelector('.container--apellido1 input');
    let segundoApellido = document.querySelector('.container--apellido2 input');
    let dni = document.querySelector('.container--dni input');
    let telefono = document.querySelector('.container--telefono input');
    let email = document.querySelector('.container--email input');
    let ubicacion = document.querySelector('.container--ubicacion input');
    let precioTransporte = document.querySelector('.container--precio-transporte input');
    let descripcionTrabajo = document.querySelector('.container--descripcion-trabajo input');
    let medidasTecnicas = document.querySelector('.container--medidas-tecnicas textarea');
    let importeTotal = document.querySelector('.container--importe-total input');
    let nif = document.querySelector('.container--nif input');
    let nombreEmpresa = document.querySelector('.name-empresa input');
    var mensaje = document.getElementById('mensaje');
    var client = document.getElementById('client');

    if (dataCurrentEstimate['dataClient'][0]) {
        primerApellido.value = dataCurrentEstimate['dataClient'][0].apellido1_cliente;
    }

    if (primerApellido.value != "") {
        mensaje.textContent = "";
        client.options.item(1).selected = 'selected';
        nombre.value = dataCurrentEstimate['dataClient'][0].nombre_cliente;
        nombre.style.border = '1px solid grey';
        primerApellido.style.border = '1px solid grey';
        segundoApellido.value = dataCurrentEstimate['dataClient'][0].apellido2_cliente;
        dni.value = dataCurrentEstimate['dataClient'][0].dni_cliente;
        document.querySelector('.container--empresa').style.display = "none";
        document.querySelector('.container--particular').style.display = "block";
    } else {
        mensaje.textContent = "";
        client.options.item(0).selected = 'selected';
        nombreEmpresa.value = dataCurrentEstimate['dataClient'][0].nombre_empresa;
        nombreEmpresa.style.border = '1px solid grey';
        // console.log('nombre empresa: ', dataCurrentEstimate['dataClient'][0])
        if (typeof dataCurrentEstimate['dataClient'][0].nif !== 'undefined') {
            nif.value = dataCurrentEstimate['dataClient'][0].nif;
        }
        document.querySelector('.container--empresa').style.display = "block";
        document.querySelector('.container--particular').style.display = "none";
    }
    idPresupuesto = dataCurrentEstimate['dataClient'][0].id;
    telefono.value = dataCurrentEstimate['dataClient'][0].telefono_cliente;
    email.value = dataCurrentEstimate['dataClient'][0].email_cliente;
    ubicacion.value = dataCurrentEstimate['dataClient'][0].ubicacion;
    precioTransporte.value = dataCurrentEstimate['dataClient'][0].precio_transporte;
    descripcionTrabajo.value = dataCurrentEstimate['dataClient'][0].descripcion_trabajo;
    medidasTecnicas.value = dataCurrentEstimate['dataClient'][0].medidas_tecnicas;
    importeTotal.value = dataCurrentEstimate['dataClient'][0].importe_total;
}

function onClickOpenFile() { // S'obre un input file
    let fileImg = document.querySelector('.fileImg');
    const inputFile = document.createElement('input');
    inputFile.setAttribute('type', 'file');
    inputFile.setAttribute('accept', 'image/*');
    fileImg.appendChild(inputFile);
}

function drawImages(dataCurrentEstimate) {
    let imagenesActuales = document.querySelector('.imagenes-actuales');
    while (imagenesActuales.firstChild) { // borrem tots els fills
        imagenesActuales.removeChild(imagenesActuales.firstChild);
    }

    for (let i = 0; i < dataCurrentEstimate['dataImages'].length; i++) {
        const containerImg = document.createElement('div');
        containerImg.classList.add('imageList');
        imagenesActuales.appendChild(containerImg);
        const img = document.createElement('img');
        img.setAttribute('src', 'storage/' + dataCurrentEstimate['dataImages'][i].img_url);
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.setAttribute('onclick', 'onClickDropImg(event,' + dataCurrentEstimate['dataImages'][i].id + ',' + dataCurrentEstimate['dataImages'][i].id_presupuesto + ')');
        containerImg.appendChild(img);
        containerImg.appendChild(iTrash);
    }
}
// REVIEW
function onClickDropProduct(event, i, id) {
    // console.log('products en onclidkdropproduct: ', products)
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    if (id) {
        // console.log('id en product borrar', id)
        datasend.append('_token', token);
        datasend.append('id', id);
    }
    opcion = confirm("¿Está seguro/a de borrar este producto?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        if (id) {
            var ajax = new objetoAjax();
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    onClickOpenEditEstimate(idPresupuesto);
                }
            }
            ajax.open('POST', 'dropProductEstimate', true);
            ajax.send(datasend);
        } else {
            products.splice(i, 1);
            // 21-05-21
            onClickCalculateAll();
            // END 21-05-21
            drawProducts();
        }
    }
}

function onClickDropImg(event, idImage, idPresupuesto) {
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idImage);
    opcion = confirm("¿Está seguro/a de borrar esta imagen?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                onClickOpenEditEstimate(idPresupuesto);
            }
        }
        ajax.open('POST', 'dropImgPresupuesto', true);
        ajax.send(datasend);
    }
}

function onClickDropEstimate(event, id) { // Eliminar presupost concret
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    opcion = confirm("¿Está seguro/a de borrar este presupuesto?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                onClickOpenSaved();
            }
        }
        ajax.open('POST', 'dropThisEstimate', true);
        ajax.send(datasend);
    }
}

var precioCalculado = 0;

function onClickCalculate() { // calcular precio total de un producto concreto
    var totalProductoConIva = document.querySelector('.container--total-con-iva input');
    var token = document.getElementById('token').getAttribute('content');
    let cantidadProducto = document.querySelector('.container--cantidad input').value;
    let precioBaseUnidad = document.querySelector('.container--base-precio-unidad input').value;
    let ivaProducto = document.querySelector('.container--iva input').value;
    let descuentoProducto = document.querySelector('.container--descuento input').value;
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('cantidadProducto', cantidadProducto);
    datasend.append('precioBaseUnidad', precioBaseUnidad);
    datasend.append('ivaProducto', ivaProducto);
    datasend.append('descuentoProducto', descuentoProducto);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var precioCalculado = JSON.parse(ajax.responseText);
            totalProductoConIva.value = precioCalculado;
        }
    }
    ajax.open('POST', 'calculateEstimate', true);
    ajax.send(datasend);
}

function onClickCalculateAll() { // calcula el precio total,
    // console.log('productsHTML: ', productsHtml);
    let precio = document.querySelector('.container--importe-total input');
    let transporte = Number(document.querySelector('.container--precio-transporte input').value);
    let total = 0;

    // for (let i = 0; i < products.length; i++) {
    //     console.log(document.querySelector('.container--product-'+i + ' .container--total-con-iva input'))
    // }

    for (let i = 0; i < products.length; i++) {
        console.log('productos: ', (products[i]));
        total += Number(products[i].totalProductoConIva);
    }

    total = total + transporte;
    precio.value = total;
    // console.log('total: ', total);

}


// function onClickPrintEstimate(event, id) { // enviem el id per a agafar les dades per generar pdf
//     var token = document.getElementById('token').getAttribute('content');
//     var datasend = new FormData();
//     datasend.append('_token', token);
//     datasend.append('id', id);
//     var ajax = new objetoAjax();
//     ajax.onreadystatechange = function() {
//         if (ajax.readyState == 4 && ajax.status == 200) {

//         }
//     }
//     ajax.open('POST', 'presupuestoPdf', true);
//     ajax.send(datasend);
// }

function onClickOpenSended() { // Obtenir els pressuposts enviats
    // let containerImg = document.querySelector('.fileImg');
    // while (containerImg.firstChild) { // borrem tots els fills
    //     containerImg.removeChild(containerImg.firstChild);
    // }
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            estimatesSended = JSON.parse(ajax.responseText);
            drawSended(estimatesSended);
        }
    }
    ajax.open('GET', 'sendedEstimate', true);
    ajax.send();
}

function drawSended(estimatesSended) { // dibuixar zona presupostos guardats
    let containerEnviados = document.querySelector('.container--enviados');

    while (containerEnviados.firstChild) { // borrem tots els fills
        containerEnviados.removeChild(containerEnviados.firstChild);
    }

    for (let i = 0; i < estimatesSended.length; i++) {
        const containerEstimate = document.createElement('div');
        containerEstimate.classList.add('container-estimate-' + estimatesSended[i].id);
        const guardadoNombre = document.createElement('div');
        guardadoNombre.classList.add('guardado-nombre');
        pNombre = document.createElement('p');
        const guardadoApellido1 = document.createElement('div');
        guardadoApellido1.classList.add('guardado-apellido');
        papellido1 = document.createElement('p');
        papellido1.textContent = estimatesSended[i].apellido1_cliente;
        const fechaGuardado = document.createElement('div');
        fechaGuardado.classList.add('fecha-guardado');
        pFechaGuardado = document.createElement('p');
        pFechaGuardado.textContent = estimatesSended[i].fecha_guardado;
        const ultimaModificacion = document.createElement('div');
        ultimaModificacion.classList.add('ultima-modificacion');
        pUltimaModificacion = document.createElement('p');
        pUltimaModificacion.textContent = estimatesSended[i].fecha_ultima_modificacion;

        // btn editar
        const containerEdit = document.createElement('div');
        containerEdit.classList.add('editarPresupuesto');
        let iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.addEventListener('click', onClickOpenEditEstimate.bind(this, estimatesSended[i].id));

        // btn Eliminar
        const containerTrash = document.createElement('div');
        containerTrash.classList.add('borrarPresupuesto');
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.addEventListener('click', onClickDropEstimate.bind(this, event, estimatesSended[i].id));

        // btn iMPRIMIR
        const containerPrint = document.createElement('div');
        containerPrint.classList.add('imprimir');
        const printPdf = document.createElement('i');
        printPdf.classList.add('fas');
        printPdf.classList.add('fa-print');
        const form = document.createElement('form');
        form.setAttribute('method', 'get');
        form.setAttribute('action', "presupuestoPdf/" + estimatesSended[i].id);
        const buttonSubmit = document.createElement('button');
        buttonSubmit.setAttribute('type', 'submit');

        if (estimatesSended[i].nombre_cliente != null) {
            pNombre.textContent = estimatesSended[i].nombre_cliente;
        } else {
            pNombre.textContent = estimatesSended[i].nombre_empresa;
            guardadoNombre.style.backgroundColor = "#cfeef4";
            guardadoApellido1.style.backgroundColor = "#cfeef4";
            fechaGuardado.style.backgroundColor = "#cfeef4";
            ultimaModificacion.style.backgroundColor = "#cfeef4";
            containerTrash.style.backgroundColor = "#cfeef4";
            containerEdit.style.backgroundColor = "#cfeef4";
            containerPrint.style.backgroundColor = "#cfeef4";
        }

        containerEnviados.appendChild(containerEstimate);
        containerEstimate.appendChild(guardadoNombre);
        guardadoNombre.appendChild(pNombre);
        containerEstimate.appendChild(guardadoApellido1);
        guardadoApellido1.appendChild(papellido1);
        // containerEstimate.appendChild(fechaGuardado);
        // fechaGuardado.appendChild(pFechaGuardado);
        // containerEstimate.appendChild(ultimaModificacion);
        // ultimaModificacion.appendChild(pUltimaModificacion);
        // containerEstimate.appendChild(containerEdit);
        // containerEdit.appendChild(iEdit);
        // containerEstimate.appendChild(containerTrash);
        // containerTrash.appendChild(iTrash);
        containerEstimate.appendChild(containerPrint);
        containerPrint.appendChild(form);
        form.appendChild(buttonSubmit);
        buttonSubmit.appendChild(printPdf);
    }
    document.querySelector('.container--crear').style.display = "none";
    document.querySelector('.presupuestosSaved').style.display = "none";
    document.querySelector('.presupuestosEnviados').style.display = "block";
}

function mesAlert() {
    var messageEmail = document.getElementById('messageEmail');
    if (messageEmail) {
        alert('Mensaje enviado')
    }
}