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

    getTattooById(id) {
        return axios.get(API_URL + "tattoo/" + id, {headers: authHeader()})
    }

    deleteTattoo(id) {
        return axios.delete(API_URL + id, {headers: authHeader()})
    }

    updateTattoo(id, picture, pictureUrl, description, cost, style) {
        return axios.put(API_URL + id, {
            headers: authHeader(),
            picture,
            pictureUrl,
            description,
            cost,
            style
        })
    }

    createTattoo(picture, pictureUrl, description, cost, style) {
        return axios.post(API_URL, {
            headers: authHeader(),
            picture,
            pictureUrl,
            description,
            cost,
            style
        });
    }
}

export default new TattooService;
