import {listProductsByGenre} from './services/products.js';
import {alertErrorGeneral} from './sweetalert/alertError.js';
const menHTML = document.querySelector('.men_container');

async function printProduct(){
    try {
        const data = await listProductsByGenre("M");
        data.forEach(item => {
            menHTML.innerHTML += `
            <div class="men_product_container">
                <figure class = "men_product">
                    <img src="${item.images[0].link}" alt="product">
                </figure>
                <p class="details_company">${item.company}</p>
                <p class="details_title">${item.name}</p>
            </div>
            `
        });
        let productHTML = document.querySelectorAll('.men_product_container');
        agregarEventos(productHTML);
    } catch (error) {
        alertErrorGeneral(error);
    }
}

printProduct();

function agregarEventos(elementosHTML){
    for (let index = 0; index < elementosHTML.length; index++) {
        let productSelection = {
            name: elementosHTML[index].querySelector('.details_title').textContent,
            company: elementosHTML[index].querySelector('.details_company').textContent
        }
        elementosHTML[index].addEventListener('click', function(){redirectionButton(productSelection)});
    }
}

function redirectionButton(selection){
    localStorage.setItem('selectionProduct',JSON.stringify(selection));
    window.location.href = 'product.html';
}
