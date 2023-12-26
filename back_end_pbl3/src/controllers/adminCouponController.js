const CRUDCouponService = require('../services/CRUDCouponService');
const getHomepage = async (req, res) => {
    try {
        const response = await CRUDCouponService.getAllCoupon();
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createCoupon = async (req, res) => {
    try {
        const response = await CRUDCouponService.createCoupon(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const response = await CRUDCouponService.getDetailsCoupon(couponId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const data = req.body;
        const response = await CRUDCouponService.updateCoupon(couponId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const response = await CRUDCouponService.deleteCoupon(couponId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    getHomepage,
    createCoupon,
    getDetailsCoupon,
    updateCoupon,
    deleteCoupon
}