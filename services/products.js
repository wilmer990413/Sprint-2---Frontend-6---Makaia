import {alertHTTPConextion} from "../sweetalert/alertHTTP.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

const listProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/products');
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const listProductsData = response.data;
            return listProductsData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

const productByName = async (name) => {
    try {
        const response = await axios.get('http://localhost:3000/products?name='+name);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const productByNameData = response.data;
            return productByNameData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

const listProductsByGenre = async (genre) => {
    try {
        const response = await axios.get('http://localhost:3000/products?genre='+genre);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const listProductsByGenreData = response.data;
            return listProductsByGenreData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export {listProducts,productByName,listProductsByGenre};
