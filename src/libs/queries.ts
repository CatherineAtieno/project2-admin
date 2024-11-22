import adminApi, {BASE_URL, sharedApi} from "./api.ts";
import axios, {AxiosResponse} from "axios";
import {convertToBase64} from "./methods.ts";


export const checkAuth = (): Promise<AxiosResponse> => new Promise((resolve, reject) => {
    try {
        return resolve(axios.get(`${BASE_URL}/auth/allowed`, {withCredentials: true}))
    } catch (e) {
        return reject(e)
    }
})

export const fetchBizOrUsers = (path: "users" | "businesses"): Promise<(UserObj | BusinessObjFrmDb)[]> => new Promise((resolve, reject) => {
    try {
        sharedApi.get(`/${path}`)
            .then(({data}) => resolve(data))
    } catch (err) {
        reject(err)
    }
})

export const loginQuery = (loginDetails: {
    userName: string, password: string
}): Promise<AxiosResponse> => new Promise((resolve, reject) => {
    try {
        resolve(axios.post(`${BASE_URL}/auth/admin-login`, loginDetails, {withCredentials: true}))
    } catch (err) {
        reject(err)
    }
})

export const quickOverview = (): Promise<AxiosResponse<{
    [key: string]: BusinessObj[]
}>> => new Promise((resolve, reject) => {
    try {
        resolve(adminApi.get('/quick-overview'))
    } catch (err) {
        reject(err)
    }
})

export const addBusiness = async (businessDetails: BusinessObj): Promise<AxiosResponse> => {
    const promises = businessDetails.images.map((file: File) => convertToBase64(file));

    // Wait for all images to be converted
    const base64Images = await Promise.all(promises);

    // Now you can safely use base64Images
    // Proceed with updating businessDetails
    const send = {...businessDetails, images: base64Images};

    // You can return or use `send` here
    // return send;
    return Promise.resolve(adminApi.post('/add-business', send))
}

