document.addEventListener("DOMContentLoaded", function(event) {
    ajax = new objetoAjax();
    getTitleHierarchy();
    getProducts();
    getCatalog();
});

var products;

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

function getTitleHierarchy() {
    let token = document.getElementById('token').getAttribute('content');
    let ajax = new objetoAjax();
    let datasend = new FormData();
    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.length); // Recollir el id
    datasend.append('_token', token);
    datasend.append('id', id);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            titleHierarchy = JSON.parse(ajax.responseText);
            renderTitleHierarchy(titleHierarchy);
        }
    }
    ajax.open('POST', '../getTitleHierarchy', true);
    ajax.send(datasend);
    
}

function renderTitleHierarchy(titleHierarchy) {
    let titleProduct = document.querySelector('.title--product');
    let titulo = titleHierarchy[0].nombre;
    titleProduct.textContent = titulo.toUpperCase();
}

function getProducts() {
    let token = document.getElementById('token').getAttribute('content');
    let ajax = new objetoAjax();
    let datasend = new FormData();
    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.length); // Recollir el id
    datasend.append('_token', token);
    datasend.append('id', id);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            products = JSON.parse(ajax.responseText);
            renderProducts(products);
        }
    }
    ajax.open('POST', '../getProducts', true);
    ajax.send(datasend);
}

function renderProducts(products) {
    let productContents = document.getElementById('product--contents');
    if (products.length == 0) {
        document.getElementById('noProducts').style.display='block';
    }
    for (let i = 0; i < products.length; i++) {
        const containerProduct = document.createElement('div'); // Creación del contenedor para este card
        containerProduct.className = 'container--product'; // add class
        productContents.appendChild(containerProduct);
        const img = document.createElement('img');
        img.setAttribute('src', '../storage/'+products[i].ruta_img);
        const h2 = document.createElement('h2');
        h2.textContent = products[i].nombre;
        const description = document.createElement('p');
        description.textContent = products[i].descripcion;
        if(products[i].img_hormann == 1) {
            const logoHormann = document.createElement('img');
            logoHormann.className = 'logo--h'; // add class
            logoHormann.setAttribute('src', '../img/hormann.jpg');
            containerProduct.appendChild(logoHormann);
        }
        containerProduct.appendChild(img);
        containerProduct.appendChild(h2);
        containerProduct.appendChild(description);
    }
}

function getCatalog() {
    let token = document.getElementById('token').getAttribute('content');
    let ajax = new objetoAjax();
    let datasend = new FormData();
    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.length); // Recollir el id
    datasend.append('_token', token);
    datasend.append('id', id);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            catalog = JSON.parse(ajax.responseText);
            renderCatalog(catalog);
        }
    }
    ajax.open('POST', '../getDataCatalog', true);
    ajax.send(datasend);
}

function renderCatalog(catalog) {
    // console.log('catalog', catalog);
    let catalogHtml = document.getElementById('catalog');
    if (catalog.length > 0) {
        const h2Catalog = document.createElement('h2');
        h2Catalog.textContent = 'CATÁLOGO';
        h2Catalog.classList.add('text-center');
        h2Catalog.classList.add('header');
        h2Catalog.classList.add('title--catalogo');
        catalogHtml.appendChild(h2Catalog);
    }
    for (let i = 0; i < catalog.length; i++) {
        const contentCatalog = document.createElement('div');
        contentCatalog.classList.add('content--catalog');
        const a = document.createElement('a');
        a.setAttribute('href', '../storage/'+catalog[i].ruta_pdf);
        a.setAttribute('target', '_blank');
        catalogHtml.appendChild(contentCatalog);
        contentCatalog.appendChild(a);
        const iPdf = document.createElement('i');
        iPdf.classList.add('fas');
        iPdf.classList.add('fa-download');
        a.appendChild(iPdf);
        const spanNombre = document.createElement('span');
        spanNombre.textContent = catalog[i].nombre;
        a.appendChild(spanNombre);
    }
}
