const Product = require('../models/ProductModel');
const dotenv = require('dotenv');
dotenv.config();


const createProduct = async (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, guarantee, new_price, old_price, image, type, countInStock, total_rate, discount, sold } = newProduct;
        const { name_description, product_code, product_type, connection, switch_type, durability, format } = newProduct;
        try {
            const checkProduct = await Product.findOne({ name: name });
            if (checkProduct) {
                resolve({
                    status: 'error',
                    message: 'Product already exists'
                })
            }

            await Product.create({
                name,
                description: {
                    name_description,
                    product_code,
                    product_type,
                    connection,
                    switch_type,
                    durability,
                    format
                },
                guarantee,
                new_price,
                old_price,
                image,
                type,
                countInStock: Number(countInStock),
                total_rate,
                discount: Number(discount),
                sold
            })
            resolve({
                status: 'success',
                message: 'Create product successfully'
            })

        } catch (error) {
            reject(error);
        }
    });
};

const updateProduct = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'success',
                message: 'Update product successfully'
            })
        } catch (error) {
            reject(error);
        }
    });
};

const deleteProduct = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'success',
                message: 'Delete product successfully'
            })
        } catch (error) {
            reject(error);
        }
    });
};

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 });
            resolve(allProduct);
        } catch (error) {
            reject(error);
        }
    });
};

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            if (product == null) {
                resolve({
                    status: 'error',
                    message: 'The user is not exist'
                })
            }
            resolve(product)
        } catch (error) {
            reject(error)
        }
    })
}

const getRatingProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product == null) {
                resolve({
                    status: 'error',
                    message: 'The product is not exist'
                })
            }
            if(product.comments.length == 0){
                resolve({
                    status: 'error',
                    message: 'The product has no comment'
                })
            }
            resolve(product.comments)
        } catch (error) {
            reject(error)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

// const getAllProduct = (sortName, sortType, searchName, type, brand) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let allProduct;
//             if (searchName) {
//                 const regex = new RegExp(searchName, 'i');
//                 allProduct = await Product.find({
//                     $or: [
//                         { name: { $regex: regex } },
//                         { description: { $regex: regex } },
//                         { type	: { $regex: regex } },
//                     ]
//                 });
//             }
//             else if (type) {
//                 const regex = new RegExp(type, 'i');
//                 allProduct = await Product.find({
//                     $or: [
//                         { name: { $regex: regex } },
//                         { description: { $regex: regex } },
//                         { type	: { $regex: regex } },
//                     ]
//                 });
//             }else if(brand){
//                 const regex = new RegExp(brand, 'i');
//                 const objectSort = { [sortName]: sortType };
//                 allProduct = await Product.find({
//                     $or: [
//                         { name: { $regex: regex } },
//                         { description: { $regex: regex } },
//                         { type	: { $regex: regex } },
//                     ]
//                 }).sort(objectSort);
//             }
//             else if (sortName && sortType) {
//                 const objectSort = { [sortName]: sortType };
//                 allProduct = await Product.find().sort(objectSort);
//             } else {
//                 allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 });
//             }

//             resolve(allProduct);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

const sortProduct = (sortName, sortType, brand) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProduct;
            if (sortName && sortType) {
                const objectSort = { [sortName]: sortType };
                allProduct = await Product.find().sort(objectSort);
            } else if (brand) {
                const regex = new RegExp(brand, 'i');
                const objectSort = { [sortName]: sortType };
                allProduct = await Product.find({
                    $or: [
                        { name: { $regex: regex } },
                        { description: { $regex: regex } },
                        { type: { $regex: regex } },
                    ]
                }).sort(objectSort);
            } else {
                allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 });
            }
            resolve(allProduct);
        } catch (error) {
            reject(error);
        }
    });
}

const searchProduct = (searchName, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProduct;
            if (searchName) {
                const regex = new RegExp(searchName, 'i');
                allProduct = await Product.find({
                    $or: [
                        { name: { $regex: regex } },
                        { description: { $regex: regex } },
                        { type: { $regex: regex } },
                    ]
                });
            } else if (type) {
                const regex = new RegExp(type, 'i');
                allProduct = await Product.find({
                    $or: [
                        { name: { $regex: regex } },
                        { description: { $regex: regex } },
                        { type: { $regex: regex } },
                    ]
                });
            }else {
                allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 });
            }
            resolve(allProduct);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailsProduct,
    deleteManyProduct,
    sortProduct,
    getRatingProduct,
    searchProduct
} 