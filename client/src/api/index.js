/* eslint-disable no-dupe-keys */
import { data } from 'autoprefixer'
import axios from 'axios'
// import { request } from 'express'

const localStorage = require('../utils/localStorage')
let API_ROOT, headers

if (process.env.NODE_ENV === 'production') {
    API_ROOT = 'http://localhost:5000/api/v1'
} else {
    API_ROOT = 'http://localhost:5000/api/v1'
}

const handleErrors = async (error) => {
    let result = {}
    const data = error && error.response && error.response.data
    const status = error && error.response && error.response.status

    result = {
        status: status,
        data: data,
        error: true
    }
    return result
}

const handleResponse = res => {
    return res && res.data
}

const createApi = () => {
    const authToken = localStorage.getLocalStorage('persist:auth') && localStorage.getLocalStorage('persist:auth').authToken
    if (authToken) {
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            Authorization: authToken !== 'null' ? `Bearer ${authToken.replace(/['"]+/g, '')}` : ''
        }
    } else {
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json'
        }
    }

    const api = axios.create({
        baseURL: API_ROOT,
        responseType: 'json',
        headers: headers
    })

    api.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        return Promise.reject(error)
    })

    return api
}

const requests = {
    get: (url, data, externalURL) =>
        createApi()
            .get(`${externalURL === undefined ? `${API_ROOT}${url}` : externalURL}`, data)
            .then(handleResponse)
            .catch(handleErrors),
    post: (url, data, externalURL, media) =>
        createApi()
            .post(`${externalURL === undefined ? `${API_ROOT}${url}` : externalURL}`, data, media ? { headers: { 'content-Type': 'multipart/form-data' } } : '')
            .then(handleResponse)
            .catch(handleErrors),
    patch: (url, data) =>
        createApi()
            .patch(`${API_ROOT}${url}`, data)
            .then(handleResponse)
            .catch(handleErrors),
    put: (url, data, media) =>
        createApi()
            .put(`${API_ROOT}${url}`, data, media ? { headers: { 'content-Type': 'multipart/form-data' } } : '')
            .then(handleResponse)
            .catch(handleErrors),
    delete: (url) =>
        createApi()
            .delete(`${API_ROOT}${url}`)
            .then(handleResponse)
            .catch(handleErrors)
}

const Client = {
    clientDetails: () => axios.get('https://geoip-db.com/json/')
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        })
}

const Account = {
    login: (data) => requests.post('/login/', data),
    register: (data) => requests.post('/signup/', data),
    logout: (data) => requests.post('/logout/', data),
}

const Book = {
    getAllBooks: (data) => requests.get(`/get-books/${data.page}/${data.pageSize}/`, data),
    addBook: (data) => requests.post('/add-book/', data),
    editBook: (data) => requests.post('/edit-book/', data),
    deleteBook: (data) => requests.post('/delete-book/', data),
    
}

export default {
    Client,
    Account,
    Book
  
}
