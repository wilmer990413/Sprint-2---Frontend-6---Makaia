import {alertHTTPConextion} from "../sweetalert/alertHTTP.js";

const listProducts = async () => {
    try {
        const response = await fetch('http://localhost:3000/products');
        if(!response.ok){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const listProductsData = await response.json();
            return listProductsData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

const productByName = async (name) => {
    try {
        const response = await fetch('http://localhost:3000/products?name='+name);
        if(!response.ok){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const productByNameData = await response.json();
            return productByNameData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

const listProductsByGenre = async (genre) => {
    try {
        const response = await fetch('http://localhost:3000/products?genre='+genre);
        if(!response.ok){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const listProductsByGenreData = await response.json();
            return listProductsByGenreData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export {listProducts,productByName,listProductsByGenre};
