import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8080/tattoo';

class TattooService {
    getAllTattoo() {
        axios.get(API_URL, {headers: authHeader()})
            .then(resp => {
                localStorage.setItem("allTattoo", JSON.stringify(resp.data))
            });
    }
}

export default new TattooService;
