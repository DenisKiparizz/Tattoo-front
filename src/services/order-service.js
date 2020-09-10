import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/order/';

class OrderService {

    createOrder(part, tattooId, userId) {
        return axios.post(API_URL, {
                part,
                tattooId,
                userId
            }, {headers: authHeader()}
        )
    }

    getOrdersByUserId(userId) {
        return axios.get(API_URL + userId, {headers: authHeader()})
    }

    deleteOrder(id) {
        return axios.delete(API_URL + id, {headers: authHeader()})
    }

    getAllOrders() {
        return axios.get(API_URL, {headers: authHeader()})
    }

    getTotalPrice(userId) {
        return axios.get(API_URL + "price/" + userId, {headers: authHeader()})
    }
}

export default new OrderService();
