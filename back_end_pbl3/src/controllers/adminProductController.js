const CRUDProductService = require("../services/CRUDProductService");

const getHomepage = async (req, res) => {
  try {
    const response = await CRUDProductService.getAllProduct()
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

// const getHomepage = async (req, res) => {
//   try {
//     let sortName = null;
//     let sortType = null;
//     let brand = null;
//     let searchName = null;
//     let type = null;
//     let nameSort = "";

//     if (req.query.sort && typeof req.query.sort === "object") {
//       sortName = req.query.sort[0];
//       sortType = req.query.sort[1];
//       nameSort = req.query.sort[2];
//       brand = req.query.brand;
//     }
//     if (req.query.search) {
//       searchName = req.query.search;
//     }

//     if (req.query.type) {
//       type = req.query.type;
//     }
//     switch (nameSort) {
//       case "name-asc":
//         nameSort = "Tên A - Z";
//         break;
//       case "name-desc":
//         nameSort = "Tên Z - A";
//         break;
//       case "createdAt-asc":
//         nameSort = "Cũ đến mới";
//         break;
//       case "createdAt-desc":
//         nameSort = "Mới đến cũ";
//         break;
//       case "new_price-asc":
//         nameSort = "Giá thấp đến cao";
//         break;
//       case "new_price-desc":
//         nameSort = "Giá cao đến thấp";
//         break;
//       case "countInStock-asc":
//         nameSort = "Số lượng trong kho thấp đến cao";
//         break;
//       case "countInStock-desc":
//         nameSort = "Số lượng trong kho cao đến thấp";
//         break;
//       case "total_rate-asc":
//         nameSort = "Đánh giá sao thấp đến cao";
//       case "total_rate-desc":
//         nameSort = "Đánh giá sao cao đến thấp";
//         break;
//       case "selled-asc":
//         nameSort = "Đã bán ít đến nhiều";
//         break;
//       case "selled-desc":
//         nameSort = "Đã bán nhiều đến ít";
//         break;
//       case "comments-asc":
//         nameSort = "Lượt đánh giá ít đến nhiều";
//         break;
//       case "comments-desc":
//         nameSort = "Lượt đánh giá nhiều đến ít";
//         break;
//       default:
//         break;
//     }
//     const listProducts = await CRUDProductService.getAllProduct(
//       sortName,
//       sortType,
//       searchName,
//       type,
//       brand
//     );
//     return res.render("product/homepageProduct.ejs", {
//       listProducts: listProducts,
//       nameSort: nameSort,
//       nameSearch: searchName,
//       count: listProducts.length,
//       type: type || brand,
//     });
//   } catch (e) {
//     return res.render("product/homepageProduct.ejs", {
//       errorMes: "Error search products",
//     });
//   }
// };

const getRatingProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await CRUDProductService.getRatingProduct(productId);
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const createProduct = async (req, res) => {
  try {
    const response = await CRUDProductService.createProduct(req.body);
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await CRUDProductService.getDetailsProduct(productId);
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const response = await CRUDProductService.updateProduct(productId, data);
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await CRUDProductService.deleteProduct(productId);
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const sortProduct = async (req, res) => {
  try {
    let brand = null;
    const sortName = req.query.sortName;
    const sortType = req.query.sortType;
    brand = req.query.brand;
    const response = await CRUDProductService.sortProduct(sortName, sortType, brand);
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const searchProduct = async (req, res) => {
  try {
    let type = null;
    const searchName = req.query.searchName;
    type = req.query.type;
    const response = await CRUDProductService.searchProduct(searchName, type);
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}
module.exports = {
  getHomepage,
  getRatingProduct,
  getDetailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  sortProduct,
  searchProduct
};
