document.addEventListener("DOMContentLoaded", function(event) {
    productsStock();
    var client = document.getElementById('client');
    client.addEventListener('change', (event) => {
        // console.log('cambio en select');
        // console.log('value client ', client.value)
        if (client.value == 'particular') {
            document.querySelector('.container--particular').style.display = "grid";
            document.querySelector('.container--empresa').style.display = "none";
        } else {
            document.querySelector('.container--particular').style.display = "none";
            document.querySelector('.container--empresa').style.display = "grid";
        }
    });
    var stock = document.getElementById('stock');
    stock.addEventListener('change', (event) => {
        if (stock.value == '1') {
            document.querySelector('.container--nombre-material-stock').style.display = "block";
            // 21-05-21
            if (document.querySelector('.container--nombre-material1')) {
                document.querySelector('.container--nombre-material1').style.display = "none";
                // END 21-05-21
            }
        } else {
            document.querySelector('.container--nombre-material-stock').style.display = "none";
            // 21-05-21
            if (document.querySelector('.container--nombre-material1')) {
                document.querySelector('.container--nombre-material1').style.display = "none";
                // document.querySelector('.container--nombre-material1').style.display = "block";
                // END 21-05-21
            }
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

function requiredInputs(event) {
    var mensaje = document.getElementById('mensaje');
    mensaje.textContent = "";
    var client = document.getElementById('client');
    if (client.value == 'particular') {
        var nombre = document.querySelector('.container--nombre input');
        var apellido1 = document.querySelector('.container--apellido1 input');
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
        // console.log('client value: ', client);
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
        // document.getElementsByName('cantidad')[0].className += ' required';
        document.getElementsByName('material_base-precio_unidad')[0].disabled = false;
        // document.getElementsByName('material_base-precio_unidad')[0].className += ' required';
        document.getElementsByName('iva')[0].disabled = false;
        // document.getElementsByName('iva')[0].className += ' required';
        document.getElementsByName('iva')[0].value = '21';
        document.getElementsByName('descuento')[0].disabled = false;
        // document.getElementsByName('descuento')[0].className += ' required';
        document.getElementsByName('descuento')[0].value = '0';
        document.getElementsByName('descripcion_material')[0].disabled = false;
        // document.getElementsByName('descripcion_material')[0].className += ' required';
    }
}

function onClickOpenCreate() {
    let mensajeStock = document.getElementById('mensaje-stock');
    mensajeStock.textContent = "";
    let mensaje = document.getElementById('mensaje');
    mensaje.textContent = "";
    // 14-05-21
    idPresupuesto = -1;
    // END 14-05-21
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
    document.querySelector('.presupuestosSaved').style.display = "none";
    document.querySelector('.presupuestosRevisados').style.display = "none";
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
    // var stock = document.getElementById('stock');
    // var stock = document.querySelectorAll('.stock')[0];
    // console.log('stock: ', stock);
    let mensaje = document.getElementById('mensaje');
    let mensajeStock = document.getElementById('mensaje-stock');
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
    // let medidasTecnicas = document.querySelector('.container--medidas-tecnicas textarea');
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

    // AFEGIR IMATGES
    var datasend = new FormData();
    var lengthImage = 0;
    var count = 0;
    let inputsFile = document.querySelectorAll('.fileImg input');
    for (let i = 0; i < inputsFile.length; i++) {
        //console.log('Name Imagen: ' + inputsFile[i].files[0].name)
        if (typeof inputsFile[i].files[0] !== 'undefined') {
            datasend.append('image-' + i, inputsFile[i].files[0]);
            // console.log('image-' + i, inputsFile[i].files[0])
            count++;
        }
    }
    lengthImage = count;
    // console.log('lengthImage: ', lengthImage);
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
    datasend.append('stock', stock.value)
    datasend.append('allProducts', allProducts);
    datasend.append('_token', token);
    datasend.append('idPresupuesto', idPresupuesto);
    datasend.append('telefono', telefono);
    datasend.append('email', email);
    datasend.append('ubicacion', ubicacion);
    datasend.append('precioTransporte', precioTransporte);
    datasend.append('descripcionTrabajo', descripcionTrabajo);
    datasend.append('stock', stock.value);
    // datasend.append('medidasTecnicas', medidasTecnicas);
    datasend.append('importeTotal', importeTotal);
    datasend.append('lengthImage', lengthImage);

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            let respuesta = JSON.parse(ajax.responseText);
            console.log('respuesta  addnewhoja: ', respuesta)
                // document.querySelector('.container--crear').style.display="none";
            if (idPresupuesto != -1) {
                onClickOpenEditEstimate(idPresupuesto);
            }
            if (respuesta.notEnoughProduct == '1') {
                mensajeStock.innerHTML = 'No hay suficiente cantidad de producto en stock!';
                mensajeStock.style.color = 'red';
                return;
            } else {
                mensajeStock.innerHTML = "";
                mensaje.innerHTML = 'La hoja se ha guardado correctamente';
                mensaje.style.color = 'green';
            }
        }
    }
    ajax.open('POST', 'addNewHojaTrabajo', true);
    ajax.send(datasend);
}

function onClickOpenProduct() { // S'obren inputs per afegir materials
    let inputsNuevoMaterial = document.querySelectorAll('.container--editor-material input');
    for (let i = 0; i < inputsNuevoMaterial.length; i++) {
        inputsNuevoMaterial[i].value = "";
    }
    document.querySelector('.container--descripcion-material textarea').value = "";
    // document.querySelector('.container--editor-material').style.display = "block";
}

function onClickStore() { // S'afegeix el producte i fa display-none dels inputs per afegir material.
    let stock = document.getElementById('stock').value;
    let nombreProducto = document.querySelector('.container--nombre-material input').value;
    let cantidadProducto = document.querySelector('.container--cantidad input').value;
    let precioBaseUnidad = document.querySelector('.container--base-precio-unidad input').value;
    let ivaProducto = document.querySelector('.container--iva input').value;
    let descuentoProducto = document.querySelector('.container--descuento input').value;
    let totalProductoConIva = document.querySelector('.container--total-con-iva input').value;
    let descripcionProducto = document.querySelector('.container--descripcion-material textarea').value;
    var editProduct = document.querySelector('.container--editor-material');
    editProduct.remove();
    let nuevoMaterial = document.querySelector('.nuevo-material');
    nuevoMaterial.appendChild(editProduct);

    let msg = document.getElementById('msg-stock');
    msg.textContent = '';
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    // 25-05-21
    datasend.append('stock', stock);
    // end 25-05-21
    datasend.append('nombreProducto', nombreProducto);
    datasend.append('cantidadProducto', cantidadProducto);
    let btnSave = document.querySelector('.container--btn-guardar button');
    btnSave.disabled = false;
    btnSave.style.backgroundColor = '#5D80AF';
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            let respuesta = JSON.parse(ajax.responseText);
            if (respuesta.notEnoughProduct == '1') {
                console.log('No hay suficiente producto');
                btnSave.disabled = true;
                btnSave.style.backgroundColor = 'gray';
                msg.textContent = 'No hay suficiente cantidad de producto en stock!';
                msg.style.color = 'red';
            } else {
                console.log('Hay suficiente producto')
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
                product.inStock = stock;
                product.idPresupuesto = -1;
                product.idProduct = -1;
                drawProducts();
                onClickCalculateAll();

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

        }
    }
    ajax.open('POST', 'enoughtProductInStock', true);
    ajax.send(datasend);
}

function drawProducts() {
    // Clear products
    let productosActuales = document.querySelector('.productos-actuales');
    // 15-05-21
    while (productosActuales.firstChild) { // borrem tots els fills
        productosActuales.removeChild(productosActuales.firstChild);
    }
    // END 15-05-21
    // console.log('products html: ', products)

    // console.log('en draw propducts: ', products);
    for (let i = 0; i < products.length; i++) {
        // console.log('products id: ', products[i].id)
        // console.log('en products después de darle a guardado y modificar...', products);
        let iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.addEventListener('click', onClickOpenEditProduct.bind(this, i));
        // console.log('en products después de darle a guardado y modificar POSITION...', i);
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.addEventListener('click', onClickDropProduct.bind(this, event, i, products[i].id));
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
        // containerTitleProduct.appendChild(hidden);
    }
}

function cancelCurrentEdition() {
    drawProducts();
}
var editedPosition = -1;

function onClickOpenEditProduct(position) {
    var editProduct = document.querySelector('.container--editor-material');
    let currentProduct = products[position];
    // 15-05-21
    // if (stock = document.getElementById('stock')) {
    stock.value = currentProduct.inStock;
    // console.log('stock value open edit', currentProduct.inStock);
    // }
    // END 15-05-21
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
    // console.log('position: ', position);
    // console.log('product actual:', products[position]);
    /* const containerDetailProduct = document.createElement('div');
    containerDetailProduct.classList.add('container--detail-product');
    containerProduct.appendChild(containerDetailProduct); */
    containerProduct.appendChild(editProduct);
    let acceptProduct = document.getElementById('accept-product');
    // acceptProduct.setAttribute('onclick', 'onClickModifyProduct('+position+')');
    acceptProduct.textContent = "MODIFICAR";
    editedPosition = position;
    // console.log('editedPosition en onClickOpenEditProduct', editedPosition)
    if (document.querySelector('.container--detail-product')) {
        return;
    }
}

// GUARDADOS
function onClickOpenSaved() {
    // 27-05-21
    var btnRevisar = document.getElementById('btnRevisar');
    var btnFirma = document.getElementById('btnFirma');
    var btnBorrar = document.getElementById('btnBorrar');
    if (btnRevisar) {
        btnRevisar.disabled = true;
    }
    btnFirma.disabled = false;
    btnBorrar.disabled = false;
    var miCanvas = document.querySelector('#pizarra');
    ctx = miCanvas.getContext('2d')
    ctx.clearRect(0, 0, miCanvas.width, miCanvas.height);
    // end 27-05-21
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            estimates = JSON.parse(ajax.responseText);
            drawSaved(estimates);
        }
    }
    ajax.open('GET', 'savedHojaTrabajo', true);
    ajax.send();
}

function drawSaved(estimates) {
    var msgCompartir = document.getElementById('msgCompartir');
    msgCompartir.textContent = '';
    let containerGuardados = document.querySelector('.container--guardados');
    // REVIEW

    while (containerGuardados.firstChild) { // borrem tots els fills
        containerGuardados.removeChild(containerGuardados.firstChild);
    }

    for (let i = 0; i < estimates['dataHojaTrabajo'].length; i++) {
        const containerEstimate = document.createElement('div');
        containerEstimate.classList.add('container-estimate-' + estimates['dataHojaTrabajo'][i].id);
        const guardadoNombre = document.createElement('div');
        guardadoNombre.classList.add('guardado-nombre');
        pNombre = document.createElement('p');
        const guardadoApellido1 = document.createElement('div');
        guardadoApellido1.classList.add('guardado-apellido');
        papellido1 = document.createElement('p');
        papellido1.textContent = estimates['dataHojaTrabajo'][i].apellido1_cliente;
        const fechaGuardado = document.createElement('div');
        fechaGuardado.classList.add('fecha-guardado');
        pFechaGuardado = document.createElement('p');
        pFechaGuardado.textContent = estimates['dataHojaTrabajo'][i].fecha_guardado;
        const ultimaModificacion = document.createElement('div');
        ultimaModificacion.classList.add('ultima-modificacion');
        pUltimaModificacion = document.createElement('p');
        pUltimaModificacion.textContent = estimates['dataHojaTrabajo'][i].fecha_ultima_modificacion;

        // btn editar
        const containerEdit = document.createElement('div');
        containerEdit.classList.add('editarPresupuesto');
        let iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.addEventListener('click', onClickOpenEditEstimate.bind(this, estimates['dataHojaTrabajo'][i].id));

        // btn Eliminar
        const containerTrash = document.createElement('div');
        containerTrash.classList.add('borrarPresupuesto');
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.addEventListener('click', onClickDropEstimate.bind(this, event, estimates['dataHojaTrabajo'][i].id));

        // btn Iniciar Tiempo
        const containerIniTiempo = document.createElement('div');
        containerIniTiempo.classList.add('iniciarTiempo');
        containerIniTiempo.classList.add('iniciarTiempo-' + estimates['dataHojaTrabajo'][i].id);
        const iniciarTiempo = document.createElement('i');
        iniciarTiempo.classList.add('fas');
        iniciarTiempo.classList.add('fa-play');
        iniciarTiempo.addEventListener('click', onClickIniciarTiempo.bind(this, estimates['dataHojaTrabajo'][i].id));

        // btn Final Tiempo
        const containerFinTiempo = document.createElement('div');
        containerFinTiempo.classList.add('pararTiempo');
        containerFinTiempo.classList.add('pararTiempo-' + estimates['dataHojaTrabajo'][i].id);
        const pararTiempo = document.createElement('i');
        pararTiempo.classList.add('fas');
        pararTiempo.classList.add('fa-stop');
        pararTiempo.classList.add('fa-stop-' + estimates['dataHojaTrabajo'][i].id);
        pararTiempo.addEventListener('click', onClickPararTiempo.bind(this, estimates['dataHojaTrabajo'][i].id));
        pararTiempo.style.display = "none";

        // btn Firma Client
        const containerFirma = document.createElement('div');
        containerFirma.classList.add('firmaCliente');
        const firmaCanvas = document.createElement('button');
        firmaCanvas.classList.add('btn-firma');
        firmaCanvas.classList.add('btn-border');
        firmaCanvas.textContent = 'Firma';
        firmaCanvas.addEventListener('click', onClickFirmaCliente.bind(this, estimates['dataHojaTrabajo'][i].id));

        // btn Enviar
        const containerEnviar = document.createElement('div');
        containerEnviar.classList.add('enviarHoja-Trabajo');
        const formEnviar = document.createElement('form');
        const btnEnviar = document.createElement('button');
        btnEnviar.classList.add('btn-enviar');
        btnEnviar.textContent = 'Enviar Hoja';
        containerEnviar.style.display = "none";

        // btn Compartir Hoja
        const containerHoja = document.createElement('div');
        containerHoja.classList.add('compartirHoja');
        const compHojaTrabajo = document.createElement('button');
        // REVIEW 18-05
        compHojaTrabajo.classList.add('btn-compartir');
        compHojaTrabajo.classList.add('btn-border');
        compHojaTrabajo.textContent = 'Compartir';
        compHojaTrabajo.addEventListener('click', onClickOpenModal.bind(this, estimates['dataHojaTrabajo'][i].id));
        // END REVIEW 18-05

        if (estimates['dataHojaTrabajo'][i].nombre_cliente != null) {
            pNombre.textContent = estimates['dataHojaTrabajo'][i].nombre_cliente;
        } else {
            pNombre.textContent = estimates['dataHojaTrabajo'][i].nombre_empresa;
            guardadoNombre.style.backgroundColor = "#cfeef4";
            guardadoApellido1.style.backgroundColor = "#cfeef4";
            fechaGuardado.style.backgroundColor = "#cfeef4";
            ultimaModificacion.style.backgroundColor = "#cfeef4";
            containerTrash.style.backgroundColor = "#cfeef4";
            containerEdit.style.backgroundColor = "#cfeef4";
            containerIniTiempo.style.backgroundColor = "#cfeef4";
            containerFinTiempo.style.backgroundColor = "#cfeef4";
            containerFirma.style.backgroundColor = "#cfeef4";
            containerHoja.style.backgroundColor = "#cfeef4";
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
        containerEstimate.appendChild(containerIniTiempo);
        containerIniTiempo.appendChild(iniciarTiempo);
        containerEstimate.appendChild(containerFinTiempo);
        containerFinTiempo.appendChild(pararTiempo);
        containerEstimate.appendChild(containerFirma);
        containerFirma.appendChild(firmaCanvas);
        containerEstimate.appendChild(containerHoja);
        containerHoja.appendChild(compHojaTrabajo);
    }

    for (let i = 0; i < estimates['dataCompartir'].length; i++) {
        const containerEstimate = document.createElement('div');
        containerEstimate.classList.add('container-estimate-' + estimates['dataCompartir'][i].id);
        const guardadoNombre = document.createElement('div');
        guardadoNombre.classList.add('guardado-nombre');
        pNombre = document.createElement('p');
        const guardadoApellido1 = document.createElement('div');
        guardadoApellido1.classList.add('guardado-apellido');
        papellido1 = document.createElement('p');
        papellido1.textContent = estimates['dataCompartir'][i].apellido1_cliente;
        const fechaGuardado = document.createElement('div');
        fechaGuardado.classList.add('fecha-guardado');
        pFechaGuardado = document.createElement('p');
        pFechaGuardado.textContent = estimates['dataCompartir'][i].fecha_guardado;
        const ultimaModificacion = document.createElement('div');
        ultimaModificacion.classList.add('ultima-modificacion');
        pUltimaModificacion = document.createElement('p');
        pUltimaModificacion.textContent = estimates['dataCompartir'][i].fecha_ultima_modificacion;

        // btn editar
        const containerEdit = document.createElement('div');
        containerEdit.classList.add('editarPresupuesto');
        let iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.addEventListener('click', onClickOpenEditEstimate.bind(this, estimates['dataCompartir'][i].id));

        // btn Iniciar Tiempo
        const containerIniTiempo = document.createElement('div');
        containerIniTiempo.classList.add('iniciarTiempo');
        containerIniTiempo.classList.add('iniciarTiempo-' + estimates['dataCompartir'][i].id);
        const iniciarTiempo = document.createElement('i');
        iniciarTiempo.classList.add('fas');
        iniciarTiempo.classList.add('fa-play');
        // 25-05-21
        // iniciarTiempo.addEventListener('click', onClickIniciarTiempo.bind(this, estimates['dataCompartir'][i].id));
        iniciarTiempo.addEventListener('click', onClickIniciarTiempo.bind(this, estimates['dataCompartir'][i].id));
        // end 25-05-21

        // btn Final Tiempo
        const containerFinTiempo = document.createElement('div');
        containerFinTiempo.classList.add('pararTiempo');
        containerFinTiempo.classList.add('pararTiempo-' + estimates['dataCompartir'][i].id);
        const pararTiempo = document.createElement('i');
        pararTiempo.classList.add('fas');
        pararTiempo.classList.add('fa-stop');
        pararTiempo.classList.add('fa-stop-' + estimates['dataCompartir'][i].id);
        pararTiempo.addEventListener('click', onClickPararTiempo.bind(this, estimates['dataCompartir'][i].id, event));
        pararTiempo.style.display = "none";

        if (estimates['dataCompartir'][i].nombre_cliente != null) {
            pNombre.textContent = estimates['dataCompartir'][i].nombre_cliente;
        } else {
            pNombre.textContent = estimates['dataCompartir'][i].nombre_empresa;
            guardadoNombre.style.backgroundColor = "#cfeef4";
            guardadoApellido1.style.backgroundColor = "#cfeef4";
            fechaGuardado.style.backgroundColor = "#cfeef4";
            ultimaModificacion.style.backgroundColor = "#cfeef4";
            containerEdit.style.backgroundColor = "#cfeef4";
            containerIniTiempo.style.backgroundColor = "#cfeef4";
            containerFinTiempo.style.backgroundColor = "#cfeef4";
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
        containerEstimate.appendChild(containerIniTiempo);
        containerIniTiempo.appendChild(iniciarTiempo);
        containerEstimate.appendChild(containerFinTiempo);
        containerFinTiempo.appendChild(pararTiempo);
    }

    document.querySelector('.container--crear').style.display = "none";
    document.querySelector('.presupuestosEnviados').style.display = "none";
    document.querySelector('.presupuestosRevisados').style.display = "none";
    document.querySelector('.presupuestosSaved').style.display = "block";
}

function onClickIniciarTiempo(id) {
    console.log("El ID de la Hoja de Trabajo es: " + id);
    var ajax = new objetoAjax();
    var startTime = document.getElementById('startTime');
    var token = document.getElementById('token').getAttribute('content');
    var fecha = new Date();
    var fechaInicio = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    ajax.open('POST', 'inicioTiempo', true);
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    datasend.append('fechaInicio', fechaInicio);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                startTime.value = fecha.getTime();
                console.log("Event: " + event);
                alert("Ha comenzado a contar el tiempo");
                document.querySelector('.fa-stop-' + id).style.display = "block";
                var classIniciar = document.querySelectorAll('.fa-play');
                for (let i = 0; i < classIniciar.length; i++) {
                    classIniciar[i].style.display = "none";
                }
            } else {
                console.log(respuesta.resultado)
            }
        }
    }
    ajax.send(datasend);
}

function onClickPararTiempo(id, event) {
    console.log("El ID de la Hoja de Trabajo es: " + id);
    var ajax = new objetoAjax();
    var finalTime = document.getElementById('finalTime');
    var startTime = document.getElementById('startTime');
    var token = document.getElementById('token').getAttribute('content');
    var fecha = new Date();
    finalTime.value = fecha.getTime();
    var fechaFinal = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    var resultado = finalTime.value - startTime.value;
    ajax.open('POST', 'finalTiempo', true);
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    datasend.append('fechaFinal', fechaFinal);
    datasend.append('resultado', resultado);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            alert("Ya ha parado usted de trabajar");
            document.querySelector('.fa-stop-' + id).style.display = "none";
            var classIniciar = document.querySelectorAll('.fa-play');
            for (let i = 0; i < classIniciar.length; i++) {
                classIniciar[i].style.display = "block";
            }
            tiempoTotal(id, respuesta);
        }
    }
    ajax.send(datasend);
}

function tiempoTotal(id, miliseconds) {
    var seconds = miliseconds / 1000;
    var hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    var totalTime = hours + ":" + minutes + ":" + Math.round(seconds * 1) / 1;

    var ajax = new objetoAjax();
    var token = document.getElementById('token').getAttribute('content');
    ajax.open('POST', 'totalTiempo', true);
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    datasend.append('totalTime', totalTime);
    datasend.append('miliseconds', miliseconds);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                alert("El tiempo final trabajado es de: " + totalTime);
                readTotalHours(id);
            }
        }
    }
    ajax.send(datasend);
}

function readTotalHours(id) {
    var ajax = new objetoAjax();
    var token = document.getElementById('token').getAttribute('content');
    ajax.open('POST', 'readTotalHours', true);
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            console.log("Suma Total: " + respuesta);
            var seconds = respuesta / 1000;
            var hours = parseInt(seconds / 3600);
            seconds = seconds % 3600;
            var minutes = parseInt(seconds / 60);
            seconds = seconds % 60;
            var result = hours + ":" + minutes + ":" + Math.round(seconds * 1) / 1;
            console.log("Tiempo total: " + result);
            updateTotalHours(id, result);
        }
    }
    ajax.send(datasend);
}

function updateTotalHours(id, result) {
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    datasend.append('result', result);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            updateHorasTotales = JSON.parse(ajax.responseText);
        }
    }
    ajax.open('POST', 'updateTotalHours', true);
    ajax.send(datasend);
}

function onClickEnviar(id) {
    // console.log("id: " + id);
    var containerBtnEnviar = document.querySelector('.enviarHoja-Trabajo');
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // console.log('presupuesto enviado OK');
            containerBtnEnviar.style.display = "none";
            onClickOpenSendedHTrabajo();
        }
    }
    ajax.open('POST', 'enviarHojaTrabajo', true);
    ajax.send(datasend);
}

function onClickFirmaCliente(id) {
    // console.log("ID en firma cliente: " + id);
    var canvas = document.querySelector('#container--canvas');
    canvas.style.display = "block";
    var inputId = document.querySelector('#idTrabajo');
    inputId.value = id;
    openCanvas();
}

function openCanvas() {
    var sessionValue = document.getElementById("session").value;
    var inputId1 = document.querySelector('#idTrabajo').value;
    if (inputId1 == '') {
        // console.log('El id está vacío');
    } else {}
    if (sessionValue !== '4') {
        // console.log('El rol de la sesion es diferente a 4')
        $btnDescargar = document.querySelector("#btnDescargar");
        const containerCanvas = document.querySelector('.container--canvas');
        const formFirma = document.createElement('form');
        formFirma.setAttribute('method', 'get');
        formFirma.setAttribute('action', "HojaTrabajoPdf/" + inputId1);
        $btnDescargar.setAttribute('type', 'submit');
        containerCanvas.appendChild(formFirma);
        formFirma.appendChild($btnDescargar);
    } else {
        // console.log('El rol de sesion actual es: ' + sessionValue);
        $btnRevisar = document.querySelector("#btnRevisar");
        $btnRevisar.addEventListener('click', onClickUpdateRevisar.bind(this, inputId1));
    }
}

// 28-05-21
function saveFirma(event) {
    opcion = confirm("¿Está seguro/a de guardar la firma?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        var id = document.querySelector('#idTrabajo').value;
        var miCanvas = document.querySelector('#pizarra');
        let enlace = document.createElement('a');
        enlace.download = "Canvas como imagen.png";
        enlace.href = miCanvas.toDataURL();
        canvas64 = enlace.href;
        sendCanvas(canvas64, id);
    }
}
// END 28-05-21

function onClickUpdateRevisar(id) {
    var token = document.getElementById('token').getAttribute('content');
    var divCanvas = document.querySelector('#container--canvas');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            updateRevisar = JSON.parse(ajax.responseText);
            // 27-05-2021 1
            alert("Se ha enviado su Hoja de Trabajo a revisión");
            onClickOpenSaved();
            divCanvas.style.display = 'none';
            // end 27-05-2021
        }
    }
    ajax.open('POST', 'updateRevisar', true);
    ajax.send(datasend);
}

function sendCanvas(canvas64, id) {
    var sessionValue = document.getElementById("session").value;
    // console.log('canvas 64', canvas64);
    // console.log('ID:', id);
    var btnDescargar = document.getElementById('btnDescargar');
    var btnRevisar = document.getElementById('btnRevisar');
    var btnFirma = document.getElementById('btnFirma');
    var btnBorrar = document.getElementById('btnBorrar');
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    datasend.append('canvas', canvas64);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            imageCanvas = JSON.parse(ajax.responseText);
            // console.log('canvas subido BBDD');
            // console.log(imageCanvas.resultado);
            if (sessionValue !== '4') {
                btnDescargar.disabled = false;
            } else {
                btnRevisar.disabled = false;
            }

            btnFirma.disabled = true;
            btnBorrar.disabled = true;
        }
    }
    ajax.open('POST', 'addImageCanvas', true);
    ajax.send(datasend);
}

document.addEventListener("DOMContentLoaded", function(event) {
    $btnBorrar = document.querySelector("#btnBorrar");
    var miCanvas = document.querySelector('#pizarra');

    miCanvas.width = 255;
    miCanvas.height = 255;

    lastPoint = null;
    //======================================================================
    // FUNCIONES
    //======================================================================
    /**
     * Returns event position relative to canvas
     */
    function getRelativePosition(event) {
        var rect = event.target.getBoundingClientRect();

        var x, y;
        if (event.touches) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        var x = x - rect.left; //x position within the element.
        var y = y - rect.top;
        return { x: x, y: y };
    }
    /**
     * Funcion que empieza a dibujar la linea
     */
    function empezarDibujo(event) {
        lastPoint = getRelativePosition(event);
    };

    /**
     * Funcion dibuja la linea
     */
    function dibujarLinea(event) {
        event.preventDefault();
        if (lastPoint) {
            ctx = miCanvas.getContext('2d')
            // Estilos de linea
            ctx.lineJoin = ctx.lineCap = 'round';
            ctx.lineWidth = 3;
            // Color de la linea
            ctx.strokeStyle = '#0D0909';
            // Marca el nuevo punto
            var currentPoint = getRelativePosition(event);


            ctx.beginPath();
            if (lastPoint) {
                ctx.moveTo(lastPoint.x, lastPoint.y);
                ctx.lineTo(currentPoint.x, currentPoint.y);
            }
            lastPoint = currentPoint;
            ctx.stroke();
        }
    }

    /**
     * Funcion que deja de dibujar la linea
     */
    function pararDibujar() {
        lastPoint = null;
    }

    function borrarCanvas() {
        ctx.clearRect(0, 0, miCanvas.width, miCanvas.height);
        lineas = [];
    }

    //======================================================================
    // EVENTOS
    //======================================================================

    // Eventos raton
    miCanvas.addEventListener('mousedown', empezarDibujo, false);
    miCanvas.addEventListener('mousemove', dibujarLinea, false);
    miCanvas.addEventListener('mouseup', pararDibujar, false);

    // Eventos pantallas táctiles
    miCanvas.addEventListener('touchstart', empezarDibujo, false);
    miCanvas.addEventListener('touchmove', dibujarLinea, false);
    miCanvas.addEventListener('touchend', pararDibujar, false);
    $btnBorrar.addEventListener("click", borrarCanvas, false);
});




function onClickOpenEditEstimate(idEstimate) {
    console.log('id hoja en open edit: ', idEstimate)
    let mensajeStock = document.getElementById('mensaje-stock');
    mensajeStock.textContent = "";
    let mensaje = document.getElementById('mensaje');
    mensaje.textContent = "";

    var client = document.getElementById('client');
    if (client.value == 'particular') {
        var nombre = document.querySelector('.container--nombre input');
        var apellido1 = document.querySelector('.container--apellido1 input');
        nombre.style.border = '1px solid grey';
        apellido1.style.border = '1px solid grey';
    } else if (client.value == 'empresa') {
        var input1 = document.getElementsByClassName('empresa-required')[0];
        input1.style.border = '1px solid gray';
    }

    // Obtenim les dades d'aquest presupost, de la BBDD
    var token = document.getElementById('token').getAttribute('content');

    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idEstimate);

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            dataCurrentEstimate = JSON.parse(ajax.responseText);
            // console.log('datos presupuesto actual: ', dataCurrentEstimate);
            products = dataCurrentEstimate['dataProduct'];
            // console.log(products);
            // console.log('productsssss: ', products);
            for (let i = 0; i < dataCurrentEstimate['dataProduct'].length; i++) {
                // console.log('d', dataCurrentEstimate['dataProduct'][i]);
                products[i].nombreProducto = dataCurrentEstimate['dataProduct'][i].nombre_material;
                // console.log('este producto nombrfe:', products[i].nombreProducto);
                products[i].cantidadProducto = dataCurrentEstimate['dataProduct'][i].cantidad_material;
                products[i].precioBaseUnidad = dataCurrentEstimate['dataProduct'][i].base_precio_unidad_material;
                products[i].ivaProducto = dataCurrentEstimate['dataProduct'][i].iva;
                products[i].descuentoProducto = dataCurrentEstimate['dataProduct'][i].descuento;
                products[i].totalProductoConIva = dataCurrentEstimate['dataProduct'][i].total_con_iva;
                products[i].descripcionProducto = dataCurrentEstimate['dataProduct'][i].descripcion_material;
                products[i].idPresupuesto = dataCurrentEstimate['dataProduct'][i].id_hojaTrabajo;
                products[i].idProduct = dataCurrentEstimate['dataProduct'][i].id;
                // 15-05-21
                products[i].inStock = dataCurrentEstimate['dataProduct'][i].stock;
                // console.log('openeditstimate stock: ', products[i].inStock)
            }
            drawCurrentEstimate(dataCurrentEstimate);
            drawProducts();
            // drawImages(dataCurrentEstimate);
            onClickCalculateAll();
        }
    }
    ajax.open('POST', 'getDataCurrentHojaTrabajo', true);
    ajax.send(datasend);

}

function drawCurrentEstimate(dataCurrentEstimate) {
    document.querySelector('.presupuestosSaved').style.display = "none";
    document.querySelector('.presupuestosEnviados').style.display = "none";
    document.querySelector('.container--crear').style.display = "block";
    // console.log('datacvlient', dataCurrentEstimate['dataClient'][0]);
    let nombre = document.querySelector('.container--nombre input');
    let primerApellido = document.querySelector('.container--apellido1 input');
    let segundoApellido = document.querySelector('.container--apellido2 input');
    let dni = document.querySelector('.container--dni input');
    let telefono = document.querySelector('.container--telefono input');
    let email = document.querySelector('.container--email input');
    let ubicacion = document.querySelector('.container--ubicacion input');
    let precioTransporte = document.querySelector('.container--precio-transporte input');
    let descripcionTrabajo = document.querySelector('.container--descripcion-trabajo input');
    // let medidasTecnicas = document.querySelector('.container--medidas-tecnicas textarea');
    let importeTotal = document.querySelector('.container--importe-total input');
    let nif = document.querySelector('.container--nif input');
    let nombreEmpresa = document.querySelector('.name-empresa input');
    var client = document.getElementById('client');

    if (dataCurrentEstimate['dataClient'][0]) {
        primerApellido.value = dataCurrentEstimate['dataClient'][0].apellido1_cliente;
    }
    if (primerApellido.value != "") {
        // console.log('en el if')
        mensaje.textContent = "";
        client.options.item(1).selected = 'selected';
        nombre.value = dataCurrentEstimate['dataClient'][0].nombre_cliente;
        segundoApellido.value = dataCurrentEstimate['dataClient'][0].apellido2_cliente;
        dni.value = dataCurrentEstimate['dataClient'][0].dni_cliente;
        document.querySelector('.container--empresa').style.display = "none";
        document.querySelector('.container--particular').style.display = "block";
    } else {
        mensaje.textContent = "";
        client.options.item(0).selected = 'selected';
        nombreEmpresa.value = dataCurrentEstimate['dataClient'][0].nombre_empresa;
        console.log('nombre empresa: ', nombreEmpresa.value)
        if (typeof dataCurrentEstimate['dataClient'][0].nif !== 'undefined') {
            nif.value = dataCurrentEstimate['dataClient'][0].nif;
        }
        document.querySelector('.container--empresa').style.display = "block";
        document.querySelector('.container--particular').style.display = "none";
    }
    idPresupuesto = dataCurrentEstimate['dataClient'][0].id;
    telefono.value = dataCurrentEstimate['dataClient'][0].telefono;
    email.value = dataCurrentEstimate['dataClient'][0].email;
    ubicacion.value = dataCurrentEstimate['dataClient'][0].direccion;
    precioTransporte.value = dataCurrentEstimate['dataClient'][0].precio_transporte;
    descripcionTrabajo.value = dataCurrentEstimate['dataClient'][0].descripcion;
    // medidasTecnicas.value = dataCurrentEstimate['dataClient'][0].medidas_tecnicas;
    importeTotal.value = dataCurrentEstimate['dataClient'][0].precio_total;
}

function onClickDropProduct(event, i, id) {
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    if (id) {
        datasend.append('_token', token);
        datasend.append('id', id);
        // console.log('onClickDropProduct iD:', id)
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
            ajax.open('POST', 'dropProductHojaTrabajo', true);
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
    // console.log('onClickDropEstimate iD:', id);
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
        ajax.open('POST', 'dropThisHojaTrabajo', true);
        ajax.send(datasend);
    }
}
// REVIEW 06-05-21
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
    //     console.log(document.querySelector('.container--product-' + i + ' .container--total-con-iva input'))
    // }
    // console.log('con iva: ', totalProductoConIva[0].value);
    // console.log(products);

    for (let i = 0; i < products.length; i++) {
        total += Number(products[i].totalProductoConIva);
    }

    total = total + transporte;
    precio.value = total;
    // console.log('total: ', total);
}

function onClickOpenSendedHTrabajo() { // Obtenir els pressuposts enviats
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            estimatesSended = JSON.parse(ajax.responseText);
            drawSended(estimatesSended);
        }
    }
    ajax.open('GET', 'sendedHojaTrabajo', true);
    ajax.send();
}

function onClickOpenSendedSecretaria() { // Obtenir els pressuposts enviats
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            estimatesSecretaria = JSON.parse(ajax.responseText);
            drawSecretaria(estimatesSecretaria);
        }
    }
    ajax.open('GET', 'sendedSecretaria', true);
    ajax.send();
}

function onClickOpenCheck() { // Obtenir els pressuposts enviats
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            estimatesChecks = JSON.parse(ajax.responseText);
            drawCheck(estimatesChecks);
        }
    }
    ajax.open('GET', 'checkHTrabajo', true);
    ajax.send();
}

function productsStock() { // obtenir les dades de tots els productes que estàn en el stock
    var buscador = document.getElementById('searchStock').value;
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('filtro', buscador);
    // console.log(buscador);

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            listaStock = JSON.parse(ajax.responseText);
            // console.log(listaStock);
            drawSelect(listaStock);
        }
    }
    ajax.open('POST', 'productsStock', true);
    ajax.send(datasend);

}

// 17-05-21
function drawSelect(lista) {
    let divSelect = document.getElementById('draw-select');
    var buscador = document.getElementById('searchStock');
    let precio = document.querySelector('.container--base-precio-unidad input');
    while (divSelect.firstChild) { // borrem tots els fills
        divSelect.removeChild(divSelect.firstChild);
    }
    var option = document.createElement('option');
    option.value = "0";
    option.textContent = "----";
    divSelect.appendChild(option);
    for (let i = 0; i < lista.length; i++) {
        let option = document.createElement('option');
        option.value = lista[i].nombre_producto;
        option.text = lista[i].nombre_producto;
        divSelect.appendChild(option);
    }
    divSelect.addEventListener('change', (event) => {
        buscador.value = divSelect.value;
        var token = document.getElementById('token').getAttribute('content');
        var datasend = new FormData();
        if (divSelect.value == 0) {
            return;
        }
        datasend.append('productSelected', divSelect.value);
        datasend.append('_token', token);
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                let productSelected = JSON.parse(ajax.responseText);
                // console.log('producto seleccionado: ', productSelected);
                precio.value = productSelected[0].precio_unidad;
                validatorProduct()
            }
        }
        ajax.open('POST', 'productSelected', true);
        ajax.send(datasend);
    })
}

function listUsers() { // obtenir les dades de tots els productes que estàn en el stock
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            listaUsers = JSON.parse(ajax.responseText);
            drawUsuarios(listaUsers);
        }
    }
    ajax.open('POST', 'listaUsuarios', true);
    ajax.send(datasend);
}

function drawUsuarios(listaUsers) {
    var selectUsuarios = document.querySelectorAll('.selectUsuarios');
    while (selectUsuarios.firstChild) { // borrem tots els fills
        selectUsuarios.removeChild(selectUsuarios.firstChild);
    }
    for (let i = 0; i < selectUsuarios.length; i++) {
        for (let j = 0; j < listaUsers.length; j++) {
            const option = document.createElement('option');
            option.value = listaUsers[j].id;
            option.text = listaUsers[j].nombre;
            selectUsuarios[i].appendChild(option);
        }
    }
}

function drawSended(estimatesSended) {
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
        form.setAttribute('action', "HojaTrabajoPdf/" + estimatesSended[i].id);
        const buttonSubmit = document.createElement('button');
        buttonSubmit.setAttribute('type', 'submit');

        // btn enviar a secretaría
        // 14-05-21
        const containerSecretaria = document.createElement('div');
        containerSecretaria.classList.add('secretaria');
        const btnSecretaria = document.createElement('button');
        btnSecretaria.classList.add('btn-border');
        btnSecretaria.textContent = "Enviar a secretaría";
        btnSecretaria.addEventListener('click', sendSecretary.bind(this, estimatesSended[i].id));

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
            containerSecretaria.style.backgroundColor = "#cfeef4";
        }

        containerEnviados.appendChild(containerEstimate);
        containerEstimate.appendChild(guardadoNombre);
        guardadoNombre.appendChild(pNombre);
        containerEstimate.appendChild(guardadoApellido1);
        guardadoApellido1.appendChild(papellido1);
        containerEstimate.appendChild(containerPrint);
        containerPrint.appendChild(form);
        form.appendChild(buttonSubmit);
        containerPrint.appendChild(form);
        buttonSubmit.appendChild(printPdf);
        containerEstimate.appendChild(containerSecretaria);
        containerSecretaria.appendChild(btnSecretaria);
    }
    document.querySelector('.container--crear').style.display = "none";
    document.querySelector('.presupuestosSaved').style.display = "none";
    document.querySelector('.presupuestosRevisados').style.display = "none";
    document.querySelector('.presupuestosEnviados').style.display = "block";
}

function drawSecretaria(estimatesSecretaria) {
    // console.log(estimatesSecretaria);
    let containerEnviados = document.querySelector('.container--secretaria');

    while (containerEnviados.firstChild) { // borrem tots els fills
        containerEnviados.removeChild(containerEnviados.firstChild);
    }

    for (let i = 0; i < estimatesSecretaria.length; i++) {
        const containerEstimate = document.createElement('div');
        containerEstimate.classList.add('container-estimate-' + estimatesSecretaria[i].id);
        const guardadoNombre = document.createElement('div');
        guardadoNombre.classList.add('guardado-nombre');
        pNombre = document.createElement('p');
        const guardadoApellido1 = document.createElement('div');
        guardadoApellido1.classList.add('guardado-apellido');
        papellido1 = document.createElement('p');
        papellido1.textContent = estimatesSecretaria[i].apellido1_cliente;
        const fechaGuardado = document.createElement('div');
        fechaGuardado.classList.add('fecha-guardado');
        pFechaGuardado = document.createElement('p');
        pFechaGuardado.textContent = estimatesSecretaria[i].fecha_guardado;
        const ultimaModificacion = document.createElement('div');
        ultimaModificacion.classList.add('ultima-modificacion');
        pUltimaModificacion = document.createElement('p');
        pUltimaModificacion.textContent = estimatesSecretaria[i].fecha_ultima_modificacion;

        // btn iMPRIMIR
        const containerPrint = document.createElement('div');
        containerPrint.classList.add('imprimir');
        const printPdf = document.createElement('i');
        printPdf.classList.add('fas');
        printPdf.classList.add('fa-print');
        const form = document.createElement('form');
        form.setAttribute('method', 'get');
        form.setAttribute('action', "HojaTrabajoPdf/" + estimatesSecretaria[i].id);
        const buttonSubmit = document.createElement('button');
        buttonSubmit.setAttribute('type', 'submit');


        if (estimatesSecretaria[i].nombre_cliente != null) {
            pNombre.textContent = estimatesSecretaria[i].nombre_cliente;
        } else {
            pNombre.textContent = estimatesSecretaria[i].nombre_empresa;
            guardadoNombre.style.backgroundColor = "#cfeef4";
            guardadoApellido1.style.backgroundColor = "#cfeef4";
            fechaGuardado.style.backgroundColor = "#cfeef4";
            ultimaModificacion.style.backgroundColor = "#cfeef4";
            containerPrint.style.backgroundColor = "#cfeef4";
        }

        containerEnviados.appendChild(containerEstimate);
        containerEstimate.appendChild(guardadoNombre);
        guardadoNombre.appendChild(pNombre);
        containerEstimate.appendChild(guardadoApellido1);
        guardadoApellido1.appendChild(papellido1);
        containerEstimate.appendChild(containerPrint);
        containerPrint.appendChild(form);
        form.appendChild(buttonSubmit);
        containerPrint.appendChild(form);
        buttonSubmit.appendChild(printPdf);
    }
    document.querySelector('.enviadosSecretaria').style.display = "block";
}

// 17-05-21
function drawCheck(estimatesChecks) {
    let containerRevisar = document.querySelector('.container--revisados');

    while (containerRevisar.firstChild) { // borrem tots els fills
        containerRevisar.removeChild(containerRevisar.firstChild);
    }

    for (let i = 0; i < estimatesChecks.length; i++) {
        const containerEstimate = document.createElement('div');
        containerEstimate.classList.add('container-estimate-' + estimatesChecks[i].id);
        const guardadoNombre = document.createElement('div');
        guardadoNombre.classList.add('guardado-nombre');
        pNombre = document.createElement('p');
        const guardadoApellido1 = document.createElement('div');
        guardadoApellido1.classList.add('guardado-apellido');
        papellido1 = document.createElement('p');
        papellido1.textContent = estimatesChecks[i].apellido1_cliente;
        const fechaGuardado = document.createElement('div');
        fechaGuardado.classList.add('fecha-guardado');
        pFechaGuardado = document.createElement('p');
        pFechaGuardado.textContent = estimatesChecks[i].fecha_guardado;
        const ultimaModificacion = document.createElement('div');
        ultimaModificacion.classList.add('ultima-modificacion');
        pUltimaModificacion = document.createElement('p');
        pUltimaModificacion.textContent = estimatesChecks[i].fecha_ultima_modificacion;

        // btn iMPRIMIR
        const containerPrint = document.createElement('div');
        containerPrint.classList.add('imprimir');
        const printPdf = document.createElement('i');
        printPdf.classList.add('fas');
        printPdf.classList.add('fa-print');
        const form = document.createElement('form');
        form.setAttribute('method', 'get');
        form.setAttribute('action', "HojaTrabajoPdf/" + estimatesChecks[i].id);
        const buttonSubmit = document.createElement('button');
        buttonSubmit.setAttribute('type', 'submit');

        if (estimatesChecks[i].nombre_cliente != null) {
            pNombre.textContent = estimatesChecks[i].nombre_cliente;
        } else {
            pNombre.textContent = estimatesChecks[i].nombre_empresa;
            guardadoNombre.style.backgroundColor = "#cfeef4";
            guardadoApellido1.style.backgroundColor = "#cfeef4";
            fechaGuardado.style.backgroundColor = "#cfeef4";
            ultimaModificacion.style.backgroundColor = "#cfeef4";
            // containerTrash.style.backgroundColor = "#cfeef4";
            // containerEdit.style.backgroundColor = "#cfeef4";
            containerPrint.style.backgroundColor = "#cfeef4";
        }

        containerRevisar.appendChild(containerEstimate);
        containerEstimate.appendChild(guardadoNombre);
        guardadoNombre.appendChild(pNombre);
        containerEstimate.appendChild(guardadoApellido1);
        guardadoApellido1.appendChild(papellido1);
        containerEstimate.appendChild(containerPrint);
        containerPrint.appendChild(form);
        form.appendChild(buttonSubmit);
        buttonSubmit.appendChild(printPdf);
    }
    document.querySelector('.container--crear').style.display = "none";
    document.querySelector('.presupuestosSaved').style.display = "none";
    document.querySelector('.presupuestosEnviados').style.display = "none";
    document.querySelector('.presupuestosRevisados').style.display = "block";
}

function onClickCompartirHoja(idHojaTrabajo) {
    // 18-05-21
    var idUsuario = document.getElementById('selectUsers').value;
    var msgCompartir = document.getElementById('msgCompartir');
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('idHojaTrabajo', idHojaTrabajo);
    datasend.append('idUsuario', idUsuario);

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            listaUsers = JSON.parse(ajax.responseText);
            closeModalShare();
            if (listaUsers == 'El usuario seleccionado ya tiene esta hoja compartida') {
                msgCompartir.innerHTML = listaUsers;
                msgCompartir.style.color = 'red';
            } else {
                msgCompartir.innerHTML = 'La hoja ha sido compartida correctamente';
                msgCompartir.style.color = 'green';
            }
        }
    }
    ajax.open('POST', 'compartirHoja', true);
    ajax.send(datasend);
}

// 18-05-21
function onClickOpenModal(idHojaTrabajo) {
    // select Mostrar Usuarios
    // // 18-05-21
    let share = document.getElementById('share');
    while (share.firstChild) { // borrem tots els fills
        share.removeChild(share.firstChild);
    }
    const divUsuarios = document.createElement('div');
    divUsuarios.classList.add('divUsuarios');
    const selectUsuarios = document.createElement('select');
    selectUsuarios.classList.add('selectUsuarios');
    selectUsuarios.setAttribute('id', 'selectUsers');
    share.appendChild(divUsuarios);
    divUsuarios.appendChild(selectUsuarios);
    listUsers();

    // Boton aceptar compartir hoja
    const acceptCompHojaTrabajo = document.createElement('button');
    acceptCompHojaTrabajo.classList.add('btn-accept-compartir');
    // acceptCompHojaTrabajo.classList.add('btn-border');
    acceptCompHojaTrabajo.textContent = 'Aceptar';
    acceptCompHojaTrabajo.addEventListener('click', onClickCompartirHoja.bind(this, idHojaTrabajo));
    document.querySelector('.modal--share').style.display = "block";
    share.appendChild(acceptCompHojaTrabajo);





}
// 18-05-21

function sendSecretary(id) {
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            alert('Se ha enviado correctamente a secretaría');
        }
    }
    ajax.open('POST', 'sendEstimateSecretary', true);
    ajax.send(datasend);
}

function closeModalShare() {
    document.querySelector('.modal--share').style.display = "none";
}