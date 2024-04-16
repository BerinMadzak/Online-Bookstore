//Handles all requests
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Bookstore = {
    list: (params: URLSearchParams) => requests.get('books', params),
    details: (id: number) => requests.get(`books/${id}`),
    filters: () => requests.get('books/filters')
}

const ShoppingCart = {
    get: () => requests.get('shoppingCart'),
    addItem: (bookId: number, quantity = 1) => requests.post(`shoppingCart?bookId=${bookId}&quantity=${quantity}`, {}),
    removeItem: (bookId: number, quantity = 1) => requests.delete(`shoppingCart?bookId=${bookId}&quantity=${quantity}`)
}

const agent = {
    Bookstore,
    ShoppingCart
}

export default agent;