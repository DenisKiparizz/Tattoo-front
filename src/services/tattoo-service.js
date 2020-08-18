import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8080/tattoo/';

class TattooService {
    getAllTattoo() {
        return axios.get(API_URL, {headers: authHeader()})
    }

    getTattooByStyleId(id) {
        return axios.get(API_URL + id, {headers: authHeader()})
    }
}

export default new TattooService;
