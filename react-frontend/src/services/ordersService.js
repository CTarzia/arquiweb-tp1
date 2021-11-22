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

    /*
    getEmployeeById(employeeId){
        return axios.get(ORDER_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(ORDER_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(ORDER_API_BASE_URL + '/' + employeeId);
    }
    */
}

export default new OrderService()