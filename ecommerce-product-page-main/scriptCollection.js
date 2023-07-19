import {listProducts} from './services/products.js';
import {collectionsById} from './services/collections.js';
import {alertErrorGeneral} from './sweetalert/alertError.js';
const collectionsHTML = document.querySelector('.collection_container');
const titleCollection = document.querySelector('.collections_title');

async function printCollections(){
    try {
        const data = await listProducts();
        let selection = parseInt(localStorage.getItem('selectionCollection'));
        const infoSelection = await collectionsById(selection);
        titleCollection.textContent = infoSelection.name;
        const productsColllection = data.filter(product=>product.collections === selection);
        productsColllection.forEach(item => {
            collectionsHTML.innerHTML += `
            <div class="collection_product_container">
                <figure class = "collection_product">
                    <img src="${item.images[0].link}" alt="product">
                </figure>
                <p class="details_company">${item.company}</p>
                <p class="details_title">${item.name}</p>
            </div>
            `;
        });
        let productHTML = document.querySelectorAll('.collection_product_container');
        agregarEventos(productHTML);
    } catch (error) {
        alertErrorGeneral(error);
    }
}

printCollections();

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
