const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
const Payment = require('../models/PaymentModel');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const { generalAccessToken } = require('./JwtService');

const createUser = async (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;

        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser) {
                resolve({
                    status: 'error',
                    message: 'Email already exists'
                })
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const createUser = await User.create({
                name,
                email,
                password: hashPassword,
                confirmPassword: hashPassword,
                phone
            })
            if (createUser) {
                resolve({
                    status: "success",
                    message: "Get create user successfully",
                    data: createUser,
                });
            }

        } catch (error) {
            reject(error)
        }
    });
};


const updateUser = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "success",
                message: "Update user successfully",
                data: updateUser,
            });
        } catch (error) {
            reject(error)
        }
    });
};

const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteUser = await User.findByIdAndDelete(id)
            if (!deleteUser) {
                resolve({
                    status: 'error',
                    message: 'The user is not exist'
                })
            }
            resolve({
                status: "success",
                message: "Delete user successfully",
            });
        } catch (error) {
            reject(error)
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: "success",
                message: "Get all user successfully",
                data: allUser,
            });
        } catch (error) {
            reject(error)
        }
    })
}

const getOrderUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                resolve({
                    status: 'error',
                    message: 'The order is not defined'
                })
            }
            resolve(order)
        } catch (error) {
            reject(error)
        }
    })
}

const getPaymentUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const payment = await Payment.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (payment === null) {
                resolve({
                    status: 'error',
                    message: 'The order is not defined'
                })
            }
            resolve(payment)
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })

            if (user == null) {
                resolve({
                    status: 'error',
                    message: 'The user is not exist'
                })
            }

            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}


const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await User.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    deleteManyUser,
    getOrderUser,
    getPaymentUser
}