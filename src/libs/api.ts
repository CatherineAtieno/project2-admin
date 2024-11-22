import axios from "axios";

export const BASE_URL = window.location.href.includes('localhost')
    ? 'http://localhost:5000/api'
    : 'http'

const adminApi = axios.create({
    baseURL: `${BASE_URL}/admin`,
    withCredentials: true,
})

export const sharedApi = axios.create({
    baseURL: `${BASE_URL}/app`,
})

export default adminApi
