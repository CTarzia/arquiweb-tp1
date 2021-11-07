import axios from 'axios';

const ORDER_API_BASE_URL = "http://localhost:3000/orders";

class OrderService {

    getOrder(orderId){
        return axios.get(ORDER_API_BASE_URL + '/' + orderId);
    }

    createTableOrder(orderId){
        return axios.post(ORDER_API_BASE_URL + '/table/' + orderId);
    }

    createPickupOrder(orderId){
        return axios.post(ORDER_API_BASE_URL + '/client/' + orderId);
    }

}

export default new OrderService()