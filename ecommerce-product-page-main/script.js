import {printProductInCart} from './scriptAux.js';
import {alertConfirmation,alertNoCheckout} from './sweetalert/alertConfirmation.js';

document.querySelector(".header_logo").addEventListener('click', function(){redirectionButton('index.html')});

document.querySelector(".header_cart").addEventListener('click', openOrCloseCart);

document.querySelector('.header_menu-icon').addEventListener('click',openMenuBar);

document.querySelector('.modal-navbar_close-icon').addEventListener('click',closeMenuBar);

window.addEventListener('resize', closeModalGalleryByResize);

document.querySelector('.cart-modal_checkout').addEventListener('click',checkoutCartProduct);

function checkoutCartProduct(){
    if(JSON.parse(localStorage.getItem('cartProduct')) && JSON.parse(localStorage.getItem('cartProduct')).length > 0){
        alertConfirmation(
            function(){
                redirectionButton('form.html');
            },
            function(){
            }
        );
    }else {
        alertNoCheckout();
    }
}

function closeModalGalleryByResize(){
    if(document.querySelector('.gallery_image-container')!== null){
        if (!window.innerWidth > 900) {
            document.querySelector('.modal-gallery_background').style.display = 'none';
        }
    }
}

function openMenuBar (){
    document.querySelector('.modal-navbar_background').style.display = 'block';
}

function openOrCloseCart(){
    if(!document.querySelector('.cart-modal').style.display || document.querySelector('.cart-modal').style.display == 'none'){
        document.querySelector('.cart-modal').style.display = 'flex';
    }else{
        document.querySelector('.cart-modal').style.display = 'none';
    }
}

function closeMenuBar (){
    if (window.innerWidth < 900) {
        console.log("entro");
        document.querySelector('.modal-navbar_background').style.display = 'none';
    }
}

function redirectionButton(ruta){
    window.location.href = ruta;
}

function printCartProducts () {
    if(JSON.parse(localStorage.getItem('cartProduct')) && JSON.parse(localStorage.getItem('cartProduct')).length > 0){
        console.log("",JSON.parse(localStorage.getItem('cartProduct')));
        let cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
        document.querySelector('.header_cart-notification').style.display = 'flex';
        document.querySelector('.header_cart-notification').textContent = JSON.parse(localStorage.getItem('cartProduct')).length;
        if(document.querySelector('.cart_empty') !== null){
            document.querySelector('.cart_empty').remove();
            cartProducts.forEach((element,index) => {
                printProductInCart(
                    index,
                    element.name,
                    element.image,
                    element.price,
                    element.quantity,
                    document.querySelector('.cart-modal_checkout-container')
                );
            });
            const cartProductHTML = document.querySelectorAll('.cart-modal_details-container');
            cartProductHTML.forEach((element,index)=>{
                element.querySelector('.delete-botton-cart').addEventListener('click',function () {deleteProductCart(index,cartProducts)});
            });
        }
    }
}

function deleteProductCart(index){
    let cartProduct = JSON.parse(localStorage.getItem('cartProduct'));
    cartProduct.splice(index,1);
    document.getElementById(index+1+'cp').remove();
    document.querySelector('.header_cart-notification').textContent = cartProduct.length;
    if (cartProduct.length === 0){
        document.querySelector('.cart-modal_checkout-container').innerHTML = '<p class="cart_empty">Your cart is empty</p>';
    }
    localStorage.setItem('cartProduct',JSON.stringify(cartProduct));
}

printCartProducts();

export {deleteProductCart};