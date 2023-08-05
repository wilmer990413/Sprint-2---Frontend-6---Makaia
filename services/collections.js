import {alertHTTPConextion} from "../sweetalert/alertHTTP.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

const listCollections = async () => {
    try {
        const response = await axios.get('http://localhost:3000/collections');
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const collectionsData = response.data;
            return collectionsData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}
const collectionsById = async (id) =>{
    try {
        const response = await axios.get('http://localhost:3000/collections/'+id);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const collectionsByIdData = response.data;
            return collectionsByIdData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export {listCollections, collectionsById};
