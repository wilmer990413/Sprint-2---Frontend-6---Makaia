import {alertHTTPConextion} from "../sweetalert/alertHTTP.js";

const saveInformationClient = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/clients',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        if(!response.ok){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const responseData = await response.json();
            return JSON.stringify(responseData);
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export {saveInformationClient};