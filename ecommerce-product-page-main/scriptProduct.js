import {productByName} from './services/products.js';
import {alertErrorGeneral} from './sweetalert/alertError.js';
import {deleteProductCart} from './script.js';
import {printProductInCart} from './scriptAux.js';
import {saveInformationClient} from './services/client.js';
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
        printImagesProducts("g",product);
        printImagesProducts("mg",product);
        let priceWithDiscount = product.price - (product.price*(product.discount/100));
        printDetails(product,priceWithDiscount);
        document.querySelector('.input_plus').addEventListener('click', function() {plusOrMinusQuantity("+");});
        document.querySelector('.input_minus').addEventListener('click', function() {plusOrMinusQuantity("-");});
        document.querySelector('.details_button').addEventListener('click',function() {buyProduct(product,priceWithDiscount)});
        document.querySelector('.modal-gallery_close').addEventListener('click', closeModalGallery);
        document.querySelector('.gallery_image-container').addEventListener('click',openModalGallery);
        document.querySelector('.modal-gallery_next').addEventListener('click',function(){nextOrPlusImageModalGallery(product.images,"+","imgP")});
        document.querySelector('.modal-gallery_previous').addEventListener('click',function(){nextOrPlusImageModalGallery(product.images,"-","imgP")});
        document.querySelector('.gallery_next').addEventListener('click',function(){nextOrPlusImageModalGallery(product.images,"+","id_gallery")});
        document.querySelector('.gallery_previous').addEventListener('click',function(){nextOrPlusImageModalGallery(product.images,"-","id_gallery")});
    } catch (error) {
        alertErrorGeneral(error);
    }
}

function nextOrPlusImageModalGallery(images,accion,id){
    let url = document.getElementById(id).style.backgroundImage.replace("url","").replace("(","").replace(")","").replaceAll('"',"");
    let resultado = images.find((item)=> item.link === url);
    const position = images.indexOf(resultado);
    switch (true) {
        case position === 0 && accion === "+":
            document.getElementById(id).style.backgroundImage = `url('${images[1].link}')`;
            break;
        case position === 1 && accion === "+":
            document.getElementById(id).style.backgroundImage = `url('${images[2].link}')`;
            break;
        case position === 2 && accion === "+":
            document.getElementById(id).style.backgroundImage = `url('${images[3].link}')`;
            break;
        case position === 3 && accion === "+":
            document.getElementById(id).style.backgroundImage = `url('${images[0].link}')`;
            break;
        case position === 0 && accion === "-":
            document.getElementById(id).style.backgroundImage = `url('${images[3].link}')`;
            break;
        case position === 1 && accion === "-":
            document.getElementById(id).style.backgroundImage = `url('${images[0].link}')`;
            break;
        case position === 2 && accion === "-":
            document.getElementById(id).style.backgroundImage = `url('${images[1].link}')`;
            break;
        case position === 3 && accion === "-":
            document.getElementById(id).style.backgroundImage = `url('${images[2].link}')`;
            break;
    }
}

function openModalGallery(){
    if (window.innerWidth > 900) {
        document.querySelector('.modal-gallery_background').style.display = 'flex';
    }
}

function closeModalGallery () { 
    document.querySelector('.modal-gallery_background').style.display = 'none';
}

function printImagesProducts(prefijo,product){
    printImagePrincipal(prefijo,product);
    for (let index = 0; index < 4; index++) {
        document.getElementById(prefijo+(index+1)).src = product.images[index].link;
        document.getElementById(prefijo+(index+1)).addEventListener('mouseover', function(){transitionImage(prefijo,(index),product)});
        document.getElementById(prefijo+(index+1)).addEventListener('mouseout', function(){printImagePrincipal(prefijo,product)});
    }
}

function printImagePrincipal(prefijo,product){
    if (prefijo==="g") {
        document.querySelector('.gallery_image-container').style.backgroundImage = `url('${product.images[0].link}')`;
    } else {
        document.getElementById("imgP").style.backgroundImage = `url('${product.images[0].link}')`;
    }
}

function transitionImage(prefijo,index,product){
    if (prefijo === "g") {
        document.querySelector('.gallery_image-container').style.backgroundImage = `url('${product.images[index].link}')`;
    } else {
        document.getElementById("imgP").style.backgroundImage = `url('${product.images[index].link}')`;
    }
}

function printDetails(product,priceWithDiscount){
    document.querySelector('.details_company').textContent = product.company;
    document.querySelector('.details_title').textContent = product.name;
    document.querySelector('.details_description').textContent = product.description;
    document.querySelector('.details_now').innerHTML = `$${priceWithDiscount}<span class="details_discount">${product.discount}%</span>`;
    document.querySelector('.details_before').textContent = product.price;
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
        if(JSON.parse(localStorage.getItem('cartProduct'))){
            cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
        }
        let auxProduct = {
            name: product.name,
            image: product.images[0].link,
            price: priceWithDiscount,
            quantity: parseInt(document.querySelector(".input_number").value),
        };
        if(cartProducts.length > 0){
            const resultado = cartProducts.find((item)=> item.name === product.name);
            if (resultado) {
                const position = cartProducts.indexOf(resultado);
                cartProducts[position].quantity += parseInt(document.querySelector(".input_number").value);
                document.getElementById((position+1)+"cp").querySelector(".description_product_container .cart-modal_price").innerHTML = '';
                document.getElementById((position+1)+"cp").querySelector(".description_product_container .cart-modal_price").innerHTML = `$${cartProducts[position].price} x ${cartProducts[position].quantity} 
                <span>$${parseInt(cartProducts[position].price)*parseInt(cartProducts[position].quantity)}</span>`;
                localStorage.setItem('cartProduct',JSON.stringify(cartProducts));
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
        document.getElementById((cartProducts.length)+"cp").querySelector(".delete-botton-cart").addEventListener('click',function(){
            deleteProductCart(cartProducts.length-1);
        });
    }
    localStorage.setItem('cartProduct',JSON.stringify(cartProducts));
    cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
}

printProduct();
