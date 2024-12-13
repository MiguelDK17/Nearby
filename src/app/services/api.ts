import axios from "axios";

export const api = axios.create({
    //Verificar endereço IP da máquina se não funcionar
    baseURL: "http://192.168.43.88:3333",
    timeout: 700

})