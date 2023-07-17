import {productByName} from './services/products.js';
import {alertErrorGeneral} from './sweetalert/alertError.js';
let product = {};

async function printProduct(){
    try {
        let selection = JSON.parse(localStorage.getItem('selectionProducto'));
        const data = await productByName(selection.name);
        product = data[0];
        document.querySelector('.gallery_image-container').style.backgroundImage = `url('${product.images.link1}')`;
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
    } catch (error) {
        alertErrorGeneral(error);
    }
}

printProduct();
