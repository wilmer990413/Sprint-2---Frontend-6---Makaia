import {listCollections} from './services/collections.js';
import {alertErrorGeneral} from './sweetalert/alertError.js';
const collectionsHTML = document.querySelector('.collections_container-label-collections');

async function printCollections(){
    try {
        const data = await listCollections();
        data.forEach(item => {
            collectionsHTML.innerHTML += `<label id = "l${item.id}" class="label-collection">${item.name}</label>`;
        });
        let collectionHTML = document.querySelectorAll('.label-collection');
        agregarEventos(collectionHTML);
    } catch (error) {
        alertErrorGeneral(error);
    }
}

printCollections();

function agregarEventos(elementosHTML){
    for (let index = 0; index < elementosHTML.length; index++) {
        elementosHTML[index].addEventListener('click', function(){redirectionButton(index+1)});
    }
}

function redirectionButton(selection){
    localStorage.setItem('selectionCollection',selection);
    window.location.href = 'collection.html';
}
