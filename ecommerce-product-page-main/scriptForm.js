import {saveInformationClient} from "./services/client.js"
import {printProductInCheckout} from './scriptAux.js'
import {alertConfirmationBuy} from './sweetalert/alertConfirmation.js'
let total = 0;
let cartProducts = [];
let data = {};

const inputName = document.querySelector("#input-name");
const inputNumber = document.querySelector("#input-number");
const inputMonth = document.querySelector("#input-month");
const inputYear = document.querySelector("#input-year");
const inputCVC = document.querySelector("#input-cvc");
const inputID = document.getElementById('input-id');
const cardNumber = document.querySelector("#card-number");
const cardName = document.querySelector("#card-name");
const cardMonth = document.querySelector("#card-month");
const cardYear = document.querySelector("#card-year");
const cardCVC = document.querySelector("#card-cvc");
const form = document.querySelector("#form");
const containerForm = document.querySelector(".container-form");
const buttonContinue = document.querySelector("#continue");
const buttonConfirm = document.querySelector("#confirm");


inputName.addEventListener("input", () => {
    cardName.innerText = inputName.value;
    if (inputName.value.length === 0) {
        cardName.innerText = "Jane Appleseed";
    }
})

var cleave = new Cleave('#input-number', {
    creditCard: true,
});

inputNumber.addEventListener("input", () => {
    cardNumber.innerText = inputNumber.value;
    if (inputNumber.value.length === 0) {
        cardNumber.innerText = "0000 0000 0000 0000";
    }
})

inputMonth.addEventListener("input", () => {
    cardMonth.innerText = inputMonth.value;
    if (inputMonth.value.length === 0) {
        cardMonth.innerText = "00";
    }
})

inputYear.addEventListener("input", () => {
    cardYear.innerText = inputYear.value;
    if (inputYear.value.length === 0) {
        cardYear.innerText = "00";
    }
})

inputCVC.addEventListener("input", () => {
    cardCVC.innerText = inputCVC.value;
    if (inputCVC.value.length === 0) {
        cardCVC.innerText = "000";
    }
})

form.addEventListener('submit',async (e) =>{
    try {
        e.preventDefault();
        let nombre = document.getElementById('input-name').value;
        let id = document.getElementById('input-id').value;
        let email = document.getElementById('input-email').value;
        let numero = document.getElementById('input-number').value;
        let mes = document.getElementById('input-month').value;
        let years = document.getElementById('input-year').value;
        let cvc = document.getElementById('input-cvc').value;
        data = {
                dni: id,
                name: nombre,
                email: email,
                cardNumber: numero,
                month: mes,
                year: years,
                cvc: cvc,
                totalBuy: total,
                products: cartProducts
        }
        await alertConfirmationBuy(
            async function(){
                let respon = await saveInformationClient(data);
                console.log(respon);
                localStorage.clear();
                window.location.href = 'index.html';
            },
            async function(){}
        );
    } catch (error) {
        alertErrorGeneral(error);
    }
});

function printProducts(){
    if(JSON.parse(localStorage.getItem('cartProduct'))){
    cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
    total = 0;
    cartProducts.forEach((element,index) => {
        printProductInCheckout(
            index,
            element.name,
            element.image,
            element.price,
            element.quantity,
            document.querySelector('.cart-modal_checkout-container')
        );
        total += (element.price*element.quantity);
    });
    
    cartProducts = cartProducts.map(product => {
        const auxProduct = { ...product };
        delete auxProduct['image'];
        return auxProduct; 
    });
    document.getElementById("total").value = total;
}
}


printProducts();
