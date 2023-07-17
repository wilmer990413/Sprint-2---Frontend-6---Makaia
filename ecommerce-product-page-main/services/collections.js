import {alertHTTPConextion} from "../sweetalert/alertHTTP.js";

const listCollections = async () => {
    try {
        const response = await fetch('http://localhost:3000/collections');
        if(!response.ok){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const collectionsData = await response.json();
            return collectionsData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}
const collectionsById = async (id) =>{
    try {
        const response = await fetch('http://localhost:3000/collections/'+id);
        if(!response.ok){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const collectionsByIdData = await response.json();
            return collectionsByIdData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export {listCollections, collectionsById};
