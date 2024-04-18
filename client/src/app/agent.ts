//Handles all requests
import axios, { AxiosResponse } from "axios";
import { PaginatedResponse } from "./models/pagination";
import { store } from "./store/configureStore";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if(pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response;
})

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

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

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser')
}

const agent = {
    Bookstore,
    ShoppingCart,
    Account
}

export default agent;