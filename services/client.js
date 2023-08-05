import {alertHTTPConextion} from "../sweetalert/alertHTTP.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

const saveInformationClient = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/clients', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status !== 201){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return JSON.stringify(response.data);
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export {saveInformationClient};