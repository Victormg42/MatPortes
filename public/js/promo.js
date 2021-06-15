// window.onload = function() {
//     getDataPromo();
// }

function getDataPromo() {
    let ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            promo = JSON.parse(ajax.responseText);
            renderPromo(promo);
        }
    }
    ajax.open('GET', 'getDataPromo', true);
    ajax.send();
}

function renderPromo(promo) {
    let carousel = document.getElementById('carousel-indicators');
    for (let i = 0; i < promo.length; i++) {
        const li = document.createElement('li');
        li.setAttribute('data-target', '#carouselExampleIndicators');
        li.setAttribute('data-slide-to', +i + '');
        if (i == 0) {
            li.className = 'active'; // add class
        }
        carousel.appendChild(li);
    }
    // console.log('resultado de promo: ', promo);
    let slider = document.getElementById('slider');
    const pdf = document.createElement('a');
    slider.appendChild(pdf);
    pdf.setAttribute('href', 'storage/' + promo[0].url_pdf + '');
    pdf.setAttribute('target', '_blank');
    for (let i = 0; i < promo.length; i++) {
        // console.log(i);
        const containerCard = document.createElement('div'); // Creación del contenedor para este card
        if (i == 0) {
            containerCard.className = 'carousel-item active'; // add class
        } else {
            containerCard.className = 'carousel-item'; // add class
        }

        const img = document.createElement('img');
        img.className = 'd-block w-100'; // add class
        img.setAttribute('src', 'storage/' + promo[i].url_img + '');

        // REVIEW
        // console.log('imgHormann', promo[i].img_hormann);
        pdf.appendChild(containerCard);
        containerCard.appendChild(img);
        if(promo[i].img_hormann == 1) {
            const logoHormann = document.createElement('img');
            logoHormann.className = 'logo--h'; // add class
            logoHormann.setAttribute('src', 'img/hormann.jpg');
            containerCard.appendChild(logoHormann);
        }
        // END REVIEW
    }
    let download_pdf = document.getElementById('pdf');
    const pdf_icono = document.createElement('i');
    pdf_icono.className = 'fas fa-download';
    const pdf_texto = document.createElement('a');
    pdf_texto.setAttribute('href', 'storage/' + promo[0].url_pdf + '');
    pdf_texto.setAttribute('target', '_blank');
    const pdf_texto2 = document.createElement('a');
    pdf_texto2.setAttribute('href', 'storage/' + promo[0].url_pdf + '');
    pdf_texto2.setAttribute('target', '_blank');
    pdf_texto2.textContent = 'Descargar PDF';
    pdf_texto.appendChild(pdf_icono);
    download_pdf.appendChild(pdf_texto);
    download_pdf.appendChild(pdf_texto2);
}