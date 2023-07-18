import {productByName} from './services/products.js';
import {alertErrorGeneral} from './sweetalert/alertError.js';
import {deleteProductCart} from './script.js';
import {printProductInCart} from './scriptAux.js';
let cartProducts = [];

async function printProduct(){
    try {
        if(JSON.parse(localStorage.getItem('cartProduct'))){
            if(JSON.parse(localStorage.getItem('cartProduct')).length > 0){
                cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
            }
        }
        let selection = JSON.parse(localStorage.getItem('selectionProduct'));
        const data = await productByName(selection.name);
        let product = data[0];
        document.querySelector('.gallery_image-container').style.backgroundImage = `url('${product.images.link1}')`;
        console.log("pare");
        document.getElementById("g1").src = product.images.link1;
        document.getElementById("g2").src = product.images.link2;
        document.getElementById("g3").src = product.images.link3;
        document.getElementById("g4").src = product.images.link4;
        document.querySelector('.details_company').textContent = product.company;
        document.querySelector('.details_title').textContent = product.name;
        document.querySelector('.details_description').textContent = product.description;
        let priceWithDiscount = product.price - (product.price*(product.discount/100));
        document.querySelector('.details_now').innerHTML = `$${priceWithDiscount}<span class="details_discount">${product.discount}%</span>`;
        document.querySelector('.details_before').textContent = product.price;
        //Modal Gallery Image
        document.getElementById("imgP").style.backgroundImage = `url('${product.images.link1}')`;
        document.getElementById("mg1").src = product.images.link1;
        document.getElementById("mg2").src = product.images.link2;
        document.getElementById("mg3").src = product.images.link3;
        document.getElementById("mg4").src = product.images.link4;
        document.querySelector('.input_plus').addEventListener('click', function() {plusOrMinusQuantity("+");});
        document.querySelector('.input_minus').addEventListener('click', function() {plusOrMinusQuantity("-");});
        document.querySelector('.details_button').addEventListener('click',function() {buyProduct(product,priceWithDiscount)});
        document.querySelector('.modal-gallery_close').addEventListener('click', closeModalGallery);
        document.querySelector('.gallery_image-container').addEventListener('click',openModalGallery);
    } catch (error) {
        alertErrorGeneral(error);
    }
}

function plusOrMinusQuantity (operacion) {
    if (operacion==="+") {
        document.querySelector(".input_number").value = parseInt(document.querySelector(".input_number").value) + 1;
    } else {
        if(parseInt(document.querySelector(".input_number").value) > 0){
            document.querySelector(".input_number").value = parseInt(document.querySelector(".input_number").value) - 1;
        }
    }
}

function buyProduct(product,priceWithDiscount){
    if(document.querySelector(".input_number").value > 0){
        let auxProduct = {
            name: product.name,
            image: product.images.link1,
            price: priceWithDiscount,
            quantity: parseInt(document.querySelector(".input_number").value),
        };
        if(cartProducts.length > 0){
            const resultado = cartProducts.find((item)=> item.name === product.name);
            if (resultado) {
                const posicion = cartProducts.indexOf(resultado);
                cartProducts[posicion].quantity += parseInt(document.querySelector(".input_number").value);
                document.getElementById((posicion+1)+"cp").querySelector(".description_product_container .cart-modal_price").innerHTML = '';
                document.getElementById((posicion+1)+"cp").querySelector(".description_product_container .cart-modal_price").innerHTML = `$${cartProducts[posicion].price} x ${cartProducts[posicion].quantity} 
                <span>$${parseInt(cartProducts[posicion].price)*parseInt(cartProducts[posicion].quantity)}</span>`;
            }else {
                addProductToCart(auxProduct);
            }
        }else{
            addProductToCart(auxProduct);
        }
        
    }
}

function addProductToCart(product){
    cartProducts.push(
        product
    );
    if(document.querySelector('.cart_empty') !== null){
        document.querySelector('.cart_empty').remove();
    }
    if(document.querySelector('.header_cart-notification') !== null){
        document.querySelector('.header_cart-notification').style.display = 'flex';
        document.querySelector('.header_cart-notification').textContent = cartProducts.length;
    }else{
        document.querySelector('.header_cart-notification').textContent = cartProducts.length;
    }
    if(cartProducts.length === 1){
        printProductInCart(
            0,
            cartProducts[0].name,
            cartProducts[0].image,
            cartProducts[0].price,
            cartProducts[0].quantity,
            document.querySelector('.cart-modal_checkout-container')
        );
        document.getElementById("1cp").querySelector(".delete-botton-cart").addEventListener('click',function(){
            deleteProductCart(0);
        });
    }else{
        printProductInCart(
            cartProducts.length-1,
            cartProducts[cartProducts.length-1].name,
            cartProducts[cartProducts.length-1].image,
            cartProducts[cartProducts.length-1].price,
            cartProducts[cartProducts.length-1].quantity,
            document.querySelector('.cart-modal_checkout-container')
        );
        document.getElementById((cartProducts.length-1)+"cp").querySelector(".delete-botton-cart").addEventListener('click',function(){
            deleteProductCart(cartProducts.length-1);
        });
    }
    localStorage.setItem('cartProduct',JSON.stringify(cartProducts));
}

function openModalGallery(){
    document.querySelector('.modal-gallery_background').style.display = 'flex';
}

function closeModalGallery () { 
    document.querySelector('.modal-gallery_background').style.display = 'none';
}

printProduct();
