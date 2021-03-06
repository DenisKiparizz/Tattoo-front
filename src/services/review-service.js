import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/review/';

class ReviewService {

    createReview(comment, mark, orderId, userId) {
        return axios.post(API_URL, {
            comment, mark, orderId, userId
        }, {headers: authHeader()})
    }

    getReview() {
        return axios.get(API_URL, {headers: authHeader()})
    }

    getReviewByOrderId(id) {
        return axios.get(API_URL + id, {headers: authHeader()})
    }

    deleteReview(id) {
        return axios.delete(API_URL + id, {headers: authHeader()})
    }
}

export default new ReviewService();