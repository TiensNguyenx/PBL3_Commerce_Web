import axios from "axios";
import { Exception } from "sass";

export const getAllUser = async () => {
    return axios.get('http://localhost:3002/admin/user')
};
export const deleteUser = async (id) => {
    return axios.post(`http://localhost:3002/admin/user/delete-user/${id}`)
}
export const editUser = async (id, name, phone, email) => {
    const dataToUpdate = {};
    if (name.trim() !== '') {
        dataToUpdate.name = name;
    }
    if (phone.trim() !== '') {
        dataToUpdate.phone = phone;
    }

    if (email.trim() !== '') {
        dataToUpdate.email = email;
    }
    if (Object.keys(dataToUpdate).length > 0) {

        return axios.post(`http://localhost:3002/admin/user/update-user/${id}`, dataToUpdate);
    } else {
        return Promise.resolve(null);
    }
};

export const getDetailUserAdmin = async (id) => {
    return axios.get(`http://localhost:3002/admin/user/detail-user/${id}`)
}
export const createUser = async (name, phone, email, password) => {
    return axios.post('http://localhost:3002/admin/user/create-user',
        {
            name,
            phone,
            email,
            password
        })
}
export const deleteProduct = async (id) => {
    return axios.post(`http://localhost:3002/admin/product/delete-product/${id}`)
}
export const ratingProduct = async (id) => {
    return axios.get(`http://localhost:3002/admin/product/rating/${id}`)
}
export const getDetailProduct = async (id) => {
    return axios.post(`http://localhost:3002/admin/product/detail-product/${id}`)
}
export const editProduct = async (id, name, description, product_code, product_type, connection, switch_type,
    durability, format, guarantee, new_price, old_price, image, type, countInStock, total_rate, sold
) => {
    return axios.post(`http://localhost:3002/admin/product/update-product/${id}`, {
        name,
        "description": {
            name_description: description,
            product_code,
            product_type,
            connection,
            switch_type,
            durability,
            format,
        },
        guarantee,
        new_price,
        old_price,
        image,
        type,
        countInStock,
        total_rate,
        sold
    })
}
export const createProduct = async (name, description, product_code, product_type, connection, switch_type,
    durability, format, guarantee, new_price, old_price, image, type, countInStock, total_rate, sold
) => {
    return axios.post('http://localhost:3002/admin/product/create-product', {
        name,
        "description": {
            name_description: description,
            product_code,
            product_type,
            connection,
            switch_type,
            durability,
            format,
        },
        guarantee,
        new_price,
        old_price,
        image,
        type,
        countInStock,
        total_rate,
        sold
    })
}
export const getDetailCoupon = async (id) => {
    return axios.get(`http://localhost:3002/admin/coupon/detail-coupon/${id}`)
}
export const editCoupon = async (id, name, methodDiscount, description, dateStart, dateEnd, value, image) => {
    return axios.post(`http://localhost:3002/admin/coupon/update-coupon/${id}`, {
        name,
        methodDiscount,
        description,
        dateStart,
        dateEnd,
        value,
        image
    })
}
export const deleteCoupon = async (id) => {
    return axios.post(`http://localhost:3002/admin/coupon/delete-coupon/${id}`)
}
export const createCoupon = async (name, methodDiscount, description, dateStart, dateEnd, value, image) => {
    return axios.get('http://localhost:3002/admin/coupon/create', {
        name,
        methodDiscount,
        description,
        dateStart,
        dateEnd,
        value,
        image
    })
}
export const getAllDetailOrder = async () => {
    return axios.get('http://localhost:3002/admin/order')
}
export const getDetailOrder = async (id) => {
    return axios.get(`http://localhost:3002/admin/order/detail-order/${id}`)
}
export const sortOrder = async (sortBy, sortType) => {
    if (sortBy === 'totalPrice') {
        return axios.get(`http://localhost:3002/admin/order/sort?sortName=${sortBy}&sortType=${sortType}`)
    }
    else {
        return axios.get(`http://localhost:3002/admin/order/sort?nameSearch=${sortBy}`)
    }
}
export const getAllPayment = async () => {
    return axios.get('http://localhost:3002/admin/payment')
}
export const sortPayment = async (sortBy, sortType) => {
    if (sortBy === 'totalPrice') {
        return axios.get(`http://localhost:3002/admin/payment/sort?sortName=${sortBy}&sortType=${sortType}`)
    }
    else {
        return axios.get(`http://localhost:3002/admin/payment/sort?nameSearch=${sortBy}`)
    }
}
export const getDetailPayment = async (id) => {
    return axios.get(`http://localhost:3002/admin/payment/detail-payment/${id}`)
}
export const getDetailOrderUser = async (id) => {
    return axios.get(`http://localhost:3002/admin/user/order/${id}`)
}
export const getDetailPaymentUser = async (id) => {
    return axios.get(`http://localhost:3002/admin/user/payment/${id}`)
}