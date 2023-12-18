import { baseURL } from '../../App'

export const createProduct = async (formData) => {
    try {
        const res = await fetch(`${baseURL}/api/create-product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include"
        })
        const data = await res.json()
        return data.newProduct;
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await fetch(`${baseURL}/api/product-delete/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        const data = await res.json()
        return data.deleteProduct;
    } catch (error) {
        console.log(error.message)
    }
}
export const getProducts = async () => {
    try {
        const res = await fetch(`${baseURL}/api/products`)
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error.message)
    }
}


