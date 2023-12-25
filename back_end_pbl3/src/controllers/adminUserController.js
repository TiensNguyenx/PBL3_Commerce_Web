const CRUDUserService = require('../services/CRUDUserService');
const User = require('../models/UserModel');
const getHomepage = async (req, res) => {
    try {
        const response = await CRUDUserService.getAllUser();
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createUser = async (req, res) => {
    try {
        const response = await CRUDUserService.createUser(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        const response = await CRUDUserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await CRUDUserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await CRUDUserService.getDetailUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getOrderUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await CRUDUserService.getOrderUser(userId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getPaymentUser = async (req, res) => {
    try {
    const userId = req.params.id;
    const response =  await CRUDUserService.getPaymentUser(userId);
    return res.status(200).json(response)
} catch (e) {
    return res.status(404).json({
        message: e
    })
}
}

module.exports = {
    getHomepage,
    createUser,
    getDetailUser,
    getOrderUser,
    updateUser,
    deleteUser,
    getPaymentUser
}