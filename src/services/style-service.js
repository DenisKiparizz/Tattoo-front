import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/style';

class StyleService {
    getAllStyle() {
        return axios.get(API_URL, {headers: authHeader()})
            // .then(response => {
            //     localStorage.setItem("allStyles", JSON.stringify(response.data));
            // })
    }
}

export default new StyleService;
