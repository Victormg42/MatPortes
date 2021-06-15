// window.onload = function(){
//     mesAlert();
// }

document.addEventListener("DOMContentLoaded", function(event) {
    mesAlert();
});

function validarForm() {
    var inputs = document.getElementsByClassName('validar');
    // console.log(inputs)
    var val = true;
    for (let i = 0; i < inputs.length; i++) {
        if ((inputs[i].type == 'text' || inputs[i].type == 'email') && inputs[i].value == '') {
            inputs[i].style.border = '2px solid red';
            val = false;
        } else if ((inputs[i].type == 'text' || inputs[i].type == 'email') && inputs[i].value !== '') {
            inputs[i].style.border = '2px solid white';
        }
    }
    if (val) {
        return true;
    } else {
        return false;
    }
}

function validarForm() {
    var inputs = document.getElementsByClassName('validar');
    // console.log(inputs)
    var val = true;
    for (let i = 0; i < inputs.length; i++) {
        if ((inputs[i].type == 'text' || inputs[i].type == 'email' || inputs[i].name == 'suggestion' || inputs[i].name == 'captcha') && inputs[i].value == '') {
            inputs[i].style.border = '2px solid red';
            val = false;
        } else if ((inputs[i].type == 'text' || inputs[i].type == 'email' || inputs[i].name == 'suggestion' || inputs[i].name == 'captcha') && inputs[i].value !== '') {
            inputs[i].style.border = '2px solid white';
        }
    }
    if (val) {
        return true;
    } else {
        return false;
    }
}

function mesAlert(){
    var messageEmail =  document.getElementById('messageEmail');
     if (messageEmail) {
         alert('Mensaje enviado')
     }
}


