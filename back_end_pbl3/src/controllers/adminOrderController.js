const CRUDOrderService = require('../services/CRUDOrderService');
const CRUDPaymentService = require('../services/CRUDPaymentService');
// const getHomepage = async (req, res) => {
//     try {
//         let sortName = null;
//         let sortType = null;
//         let nameSort = "";

//         if (req.query.sort && typeof req.query.sort === 'object') {
//             sortName = req.query.sort[0];
//             sortType = req.query.sort[1];
//             nameSort = req.query.sort[2]
//         }
//         switch (nameSort){
//             case 'method-asc':
//                 nameSort = 'Nhận tại cửa hàng';
//                 break;
//             case 'method-desc':
//                 nameSort = 'Giao hàng tận nơi';
//                 break;
//             case 'totalPrice-asc':
//                 nameSort = 'Tổng tiền thấp đến cao';
//                 break;
//             case 'totalPrice-desc':
//                 nameSort = 'Tổng tiền cao đến thấp';
//                 break;
//             default:
//                 break;
//         }
//         const listOrders = await CRUDOrderService.getAllOrder(sortName, sortType, nameSort);
//         return res.render('order/homepageOrder.ejs', { listOrders: listOrders , nameSort: nameSort, count : listOrders.length});
//     } catch (e) {
//         return res.status(404).json({
//             message: e.message || 'Error fetching coupon',
//         });
//     }
// }

const getHomepage = async (req, res) => {
    try {
        const response = await CRUDOrderService.getAllOrder();
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const response = await CRUDOrderService.getDetailsOrder(orderId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrderItems = async (req, res) => {
    try {
        const orderId = req.params.id;
        const response = await CRUDOrderService.getDetailsOrderItems(orderId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrderAddress = async (req, res) => {
    try {
        const orderId = req.params.id;
        const response = await CRUDOrderService.getDetailsOrderAddress(orderId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const sortOrder = async (req, res) => {
    try {
        console.log(req.query)
        const sortName = req.query.sortName;
        const sortType = req.query.sortType;
        const nameSearch = req.query.nameSearch;
        const response = await CRUDOrderService.sortOrder(sortName, sortType, nameSearch);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllOrderManagement = async (req, res) => {
    try {
        const allOrder = await CRUDOrderService.getAllOrderManagement();
        const allPayment = await CRUDPaymentService.getAllPaymentManagement();
        const distinctYears = await CRUDOrderService.getUniqueYears();
        const response = {
            allOrder: allOrder,
            allPayment: allPayment,
            distinctYears: distinctYears
        }
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Error fetching coupon',
        });
    }
}


const getAllOrderManagementByYear = async (req, res) => {
    try {
        const year = req.query.year;
        const allOrder = await CRUDOrderService.getAllOrderManagementByYear(year);
        const allPayment = await CRUDPaymentService.getAllPaymentManagementByYear(year);
        const distinctYears = await CRUDOrderService.getUniqueYears();
        const response = {
            allOrder: allOrder,
            allPayment: allPayment,
            distinctYears: distinctYears
        }
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Error fetching coupon',
        });
    }
}



module.exports = {
    getHomepage,
    getDetailsOrder,
    getDetailsOrderItems,
    getDetailsOrderAddress,
    sortOrder,
    getAllOrderManagement,
    getAllOrderManagementByYear
}