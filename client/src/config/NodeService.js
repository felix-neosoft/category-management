import axios from 'axios'
const MAIN_URL = 'Http://localhost:4000/api'

export const addMainCategory = (data) => {
    return axios.post(`${MAIN_URL}/category`,data)
}

export const getCategory = () => {
    return axios.get(`${MAIN_URL}/category`)
}

export const addSubCategory = (data) => {
    return axios.put(`${MAIN_URL}/category`,data)
}

export const updateMainCategory = (data) => {
    return axios.post(`${MAIN_URL}/category/main`, data)
}

export const updateSubCategory = (data) => {
    return axios.post(`${MAIN_URL}/category/sub`, data)
}

export const deleteMainCategory = (data,status) => {
    return axios.delete(`${MAIN_URL}/category/main?category=${data}&status=${status}`)
}

export const deleteSubCategory = (main,sub,status) =>{
    return axios.delete(`${MAIN_URL}/category/sub?category=${main}&subCategory=${sub}&status=${status}`)
}

export const addProductsFunc = (data) => {
    return axios.post(`${MAIN_URL}/products/add`,data)
}

export const getProductsFunc = () => {
    return axios.get(`${MAIN_URL}/products`)
}

export const updateProductsFunc = (data) => {
    return axios.post(`${MAIN_URL}/products/update`,data)
}

export const ProductStatusFunc = (data) => {
    return axios.put(`${MAIN_URL}/products/update`,data)
}

export const deleteProductFunc = (id) => {
    return axios.delete(`${MAIN_URL}/products?id=${id}`)
}
