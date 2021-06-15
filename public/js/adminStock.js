document.addEventListener("DOMContentLoaded", function(event) {
    renderStock();
    drawSelect();
});

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

function renderStock() { // obtenir les dades de tots els productes que estàn en el stock
    let divStock = document.querySelector('.draw-stock');
    var buscador = document.getElementById('searchStock').value;
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('filtro', buscador);
    // console.log(buscador);
    // console.log(divStock.length);
    // while (divStock.firstChild) { // borrem tots els fills de form
    //     divStock.removeChild(divStock.firstChild);
    //     console.log('hola');
    // }

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            listStock = JSON.parse(ajax.responseText);
            // console.log('lista stock: ', listStock);
            drawStock(listStock);
        }
    }
    ajax.open('POST', 'dataStock', true);
    ajax.send(datasend);
}

function renderStockDesc() { // obtenir les dades de tots els productes que estàn en el stock
    let divStock = document.querySelector('.draw-stock');
    var buscador = document.getElementById('searchStock').value;
    var desc = document.getElementById('desc').value;
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('filtro', buscador);
    datasend.append('desc', desc);
    // console.log(buscador);
    // console.log(divStock.length);
    // while (divStock.firstChild) { // borrem tots els fills de form
    //     divStock.removeChild(divStock.firstChild);
    //     console.log('hola');
    // }

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            listStock = JSON.parse(ajax.responseText);
            // console.log('lista stock: ', listStock);
            drawStock(listStock);
        }
    }
    ajax.open('POST', 'dataStock', true);
    ajax.send(datasend);
}

function renderStockAsc() { // obtenir les dades de tots els productes que estàn en el stock
    let divStock = document.querySelector('.draw-stock');
    var buscador = document.getElementById('searchStock').value;
    var asc = document.getElementById('asc').value;
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('filtro', buscador);
    datasend.append('asc', asc);
    // console.log(buscador);
    // console.log(divStock.length);
    // while (divStock.firstChild) { // borrem tots els fills de form
    //     divStock.removeChild(divStock.firstChild);
    //     console.log('hola');
    // }

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            listStock = JSON.parse(ajax.responseText);
            // console.log('lista stock: ', listStock);
            drawStock(listStock);
        }
    }
    ajax.open('POST', 'dataStock', true);
    ajax.send(datasend);
}

function requiredStock(event) {
    var inputs = document.getElementsByClassName('required-stock');
    let nombre = document.getElementsByName('Nombre')[0];
    let cantidad = document.getElementsByName('Cantidad')[0];
    var mensaje = document.getElementById('mensaje-stock');
    while (mensaje.firstChild) { // borrem tots els fills de form
        mensaje.removeChild(mensaje.firstChild);
    }

    if (nombre.value == '' || cantidad.value == '') {
        if (nombre.value == '') {
            nombre.style.border = '2px solid red';
            mensaje.innerHTML += 'Campos requeridos: ' + nombre.name + '<br>';
        } else {
            nombre.style.border = '1px solid gray';
        }
        if (cantidad.value == '') {
            cantidad.style.border = '2px solid red';
            mensaje.innerHTML += 'Campos requeridos: ' + cantidad.name + '<br>';
        } else {
            cantidad.style.border = '1px solid gray';

        }
        event.preventDefault();
    } else {
        mensaje.innerHTML = "";
        newProduct();
    }
    // var val = true;
    // for (let i = 0; i < inputs.length; i++) {
    //     if (inputs[i].value == '') {
    //         event.preventDefault();
    //         inputs[i].style.border = '2px solid red';
    //         mensaje.innerHTML += 'Campos requeridos: ' + inputs[i].name + '<br>';
    //         val = false;
    //     } else {
    //         inputs[i].style.border = '1px solid gray';
    //         mensaje.innerHTML = "";
    //         newProduct();
    //     }
    // }
    // if (val == false) {
    //     return false;
    // } else {
    // }
}

function drawStock(listStock) { // dibuixar la taula amb les dades de tots els productes que hi ha al stock
    let divStock = document.querySelector('.draw-stock');
    divStock.innerHTML = "";
    for (let i = 0; i < listStock.length; i++) {

        const tr = document.createElement('tr');
        divStock.appendChild(tr);
        const tdNombre = document.createElement('td');
        tdNombre.classList.add('nombre');
        tdNombre.textContent = listStock[i].nombre_producto;
        const tdCantidad = document.createElement('td');
        tdCantidad.classList.add('cantidad');
        tdCantidad.textContent = listStock[i].cantidad;
        const tdPrecio = document.createElement('td');
        tdPrecio.classList.add('precio');
        if (listStock[i].precio_unidad == null) {
            tdPrecio.textContent = '-';
        } else {
            tdPrecio.textContent = listStock[i].precio_unidad + ' €';
        }
        const tdBorrar = document.createElement('td');
        tdBorrar.classList.add('borrar');
        const tdEditar = document.createElement('td');
        tdEditar.classList.add('editar');
        tr.appendChild(tdNombre);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdEditar);
        tr.appendChild(tdBorrar);
        
        // btn Eliminar
        const iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash');
        iTrash.addEventListener('click', onClickDropElement.bind(this, event, listStock[i].id));
        tdBorrar.appendChild(iTrash);
        // btn Editar
        let iEdit = document.createElement('i');
        iEdit.classList.add('fas');
        iEdit.classList.add('fa-edit');
        iEdit.addEventListener('click', onClickOpenEditEstimate.bind(this, event, listStock[i].id));
        tdEditar.appendChild(iEdit);
    }
}

function onClickDropElement(event, id) { // obtenir el id del producte que es vol eliminar
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    opcion = confirm("¿Está seguro/a de borrar este producto?");
    if (opcion == false) {
        event.preventDefault();
    } else {
        var ajax = new objetoAjax();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                renderStock();
            }
        }
        ajax.open('POST', 'dropProductToStock', true);
        ajax.send(datasend);
    }
}

function onClickOpenEditEstimate(event, id) { // obtener datos de este id
    var token = document.getElementById('token').getAttribute('content');
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', id);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            productStock = JSON.parse(ajax.responseText);
            drawEditModal(productStock);
        }
    }
    ajax.open('POST', 'getDataThisProductStock', true);
    ajax.send(datasend);
}

var idProducto = 0;

function drawEditModal(productStock) { // Pinta les dades d'un producte concret en el modal de modificar producte
    // console.log('ptroduct stpck this: ', productStock);
    let modalNombre = document.querySelector('.modal--nombre input');
    let modalCantidad = document.querySelector('.modal--cantidad input');
    let modalPrecio = document.querySelector('.modal--precio input');
    modalNombre.value = productStock[0].nombre_producto;
    modalCantidad.value = productStock[0].cantidad;
    modalPrecio.value = productStock[0].precio_unidad;
    idProducto = productStock[0].id;
    var modalInfo = document.querySelector('.modal--info');
    modalInfo.style.display = "block";
}

function closeModalInfo() { // cerrar el modal
    var modalInfo = document.querySelector('.modal--info');
    modalInfo.style.display = "none";
}


function modificarProducto(event, idProducto) { // agafem les dades que volem actualitzar
    var token = document.getElementById('token').getAttribute('content');
    let modalNombre = document.querySelector('.modal--nombre input').value;
    let modalCantidad = document.querySelector('.modal--cantidad input').value;
    let modalPrecio = document.querySelector('.modal--precio input').value;
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('id', idProducto);
    datasend.append('nombre', modalNombre);
    datasend.append('cantidad', modalCantidad);
    datasend.append('precio', modalPrecio);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            renderStock();
            var modalInfo = document.querySelector('.modal--info');
            modalInfo.style.display = "none";
        }
    }
    ajax.open('POST', 'updateProductStock', true);
    ajax.send(datasend);
}

function openNewProduct() { // display block per a que es vegi el formulari per afegir un nou producte
    let inputs = document.querySelectorAll('.new--product input');
    let mensaje = document.getElementById('mensaje-stock')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].style.border = "1px solid gray";
    }
    mensaje.innerHTML = "";
    document.querySelector('.new--product').style.display = 'grid';
}

function newProduct() { // envia les dades del nou producte per a que s'afegeixi a la BBDD
    var token = document.getElementById('token').getAttribute('content');
    let nombre = document.querySelector('.modal--nombreN input').value;
    let cantidad = document.querySelector('.modal--cantidadN input').value;
    let precio = document.querySelector('.modal--precioN input').value;
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('nombre', nombre);
    datasend.append('cantidad', cantidad);
    datasend.append('precio', precio);
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.querySelector('.new--product').style.display = 'none';
            renderStock();
        }
    }
    ajax.open('POST', 'addProductToStock', true);
    ajax.send(datasend);
}