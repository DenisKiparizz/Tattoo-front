import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/user/';

class UsersService {
    getAll() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    getUserById(id) {
        return axios.get(API_URL + id, {headers: authHeader()})
    }

    deleteById(id) {
        return axios.delete(API_URL + id, {headers: authHeader()})
    }
}

export default new UsersService();
