import axios from "axios";

export const getAllUser = () => {
    return axios.get('https://be-pbl3.onrender.com/admin/user')
};
export const deleteUser = (id) => {
    return axios.post(`https://be-pbl3.onrender.com/admin/user/delete-user/${id}`)
}
export const editUser = (id, name, phone, email) => {
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

        return axios.post(`https://be-pbl3.onrender.com/admin/user/update-user/${id}`, dataToUpdate);
    } else {
        return Promise.resolve(null);
    }
};

export const getDetailUserAdmin = (id) => {
    return axios.get(`https://be-pbl3.onrender.com/admin/user/detail-user/${id}`)
}
export const createUser = (name, phone, email, password) => {
    return axios.post('https://be-pbl3.onrender.com/admin/user/create-user',
        {
            name,
            phone,
            email,
            password
        })
}
export const deleteProduct = (id) => {
    return axios.post(`https://be-pbl3.onrender.com/admin/product/delete-product/${id}`)
}
export const ratingProduct = (id) => {
    return axios.get(`https://be-pbl3.onrender.com/admin/product/rating/${id}`)
}
export const getDetailProduct = (id) => {
    return axios.post(`https://be-pbl3.onrender.com/admin/product/detail-product/${id}`)
}
export const editProduct = (id, name, description, product_code, product_type, connection, switch_type,
    durability, format, guarantee, new_price, old_price, image, type, countInStock, total_rate, sold
) => {
    return axios.post(`https://be-pbl3.onrender.com/admin/product/update-product/${id}`, {
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
export const createProduct = (name, description, product_code, product_type, connection, switch_type,
    durability, format, guarantee, new_price, old_price, image, type, countInStock, total_rate, sold
) => {
    return axios.post('https://be-pbl3.onrender.com/admin/product/create-product', {
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
export const getDetailCoupon = (id) => {
    return axios.get(`https://be-pbl3.onrender.com/admin/coupon/detail-coupon/${id}`)
}
export const editCoupon = (id, name, methodDiscount, description, dateStart, dateEnd, value, image) => {
    return axios.post(`https://be-pbl3.onrender.com/admin/coupon/update-coupon/${id}`, {
        name,
        methodDiscount,
        description,
        dateStart,
        dateEnd,
        value,
        image
    })
}
export const deleteCoupon = (id) => {
    return axios.post(`https://be-pbl3.onrender.com/admin/coupon/delete-coupon/${id}`)
}
export const createCoupon = (name, methodDiscount, description, dateStart, dateEnd, value, image) => {
    return axios.get('https://be-pbl3.onrender.com/admin/coupon/create', {
        name,
        methodDiscount,
        description,
        dateStart,
        dateEnd,
        value,
        image
    })
}
export const getAllDetailOrder = () => {
    return axios.get('https://be-pbl3.onrender.com/admin/order')
}
export const getDetailOrder = (id) => {
    return axios.get(`https://be-pbl3.onrender.com/admin/order/detail-order/${id}`)
}
export const sortOrder = (sortBy, sortType) => {
    if (sortBy === 'totalPrice') {
        return axios.get(`https://be-pbl3.onrender.com/admin/order/sort?sortName=${sortBy}&sortType=${sortType}`)
    }
    else {
        return axios.get(`https://be-pbl3.onrender.com/admin/order/sort?nameSearch=${sortBy}`)
    }
}
export const getAllPayment = () => {
    return axios.get('https://be-pbl3.onrender.com/admin/payment')
}
export const sortPayment = (sortBy, sortType) => {
    if (sortBy === 'totalPrice') {
        return axios.get(`https://be-pbl3.onrender.com/admin/payment/sort?sortName=${sortBy}&sortType=${sortType}`)
    }
    else {
        return axios.get(`https://be-pbl3.onrender.com/admin/payment/sort?nameSearch=${sortBy}`)
    }
}
export const getDetailPayment = (id) => {
    return axios.get(`https://be-pbl3.onrender.com/admin/payment/detail-payment/${id}`)
}
export const getDetailOrderUser = (id) => {
    return axios.get(`https://be-pbl3.onrender.com/admin/user/order/${id}`)
}
export const getDetailPaymentUser = (id) => {
    return axios.get(`https://be-pbl3.onrender.com/admin/user/payment/${id}`)
}
export const authorizeAdmin = (token) => {
    return axios.post('https://be-pbl3.onrender.com/admin/auth', {}, {
        headers: {
            token: token
        }
    }

    )
}