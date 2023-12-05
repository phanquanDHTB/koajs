const {
    getProducts,
    sortProducts,
    createProduct,
    changeInforProduct,
    deleteProduct,
    getProductById,
} = require("../database/productRepository");
const { readFile } = require("../utils/readFile");

const getProductsHandler = async (ctx) => {
    try {
        const { limit, sort } = ctx.request.query;
        if (limit) {
            const listProductLimit = getProducts(limit);
            ctx.body = {
                data: listProductLimit,
            };
        }
        if (sort) {
            const listProductSort = sortProducts(sort);
            ctx.body = {
                data: listProductSort,
            };
        }
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message,
        };
    }
};

const createProductHandler = async (ctx) => {
    try {
        const productData = ctx.request.body;
        const newProduct = { ...productData, createdAt: new Date() };
        createProduct(newProduct);
        ctx.body = {
            data: newProduct,
        };
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message,
        };
    }
};

const changInforProductHandler = async (ctx) => {
    try {
        const { id } = ctx.params;
        const productData = ctx.request.body;
        const oldProduct = readFile().filter((product) => product.id === id);
        if (oldProduct.length) {
            changeInforProduct({ ...productData, id });
            ctx.body = {
                data: [],
            };
        }
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message,
        };
    }
};

const deletteProductHandler = async (ctx) => {
    try {
        const { id } = ctx.params;
        deleteProduct(id);
        ctx.body = {
            data: [],
        };
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message,
        };
    }
};

const getProductByIdHandler = async (ctx) => {
    try {
        const { id } = ctx.params;
        const { field } = ctx.request.query;
        const listField = field.split(",");
        const product = getProductById(id);
        if (product) {
            ctx.body = {
                data: [
                    Object.keys(product[0]).reduce((result, key) => {
                        if (listField.includes(key)) {
                            result[key] = product[0][key];
                        }
                        return result;
                    }, {}),
                ],
            };
        }
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message,
        };
    }
};

module.exports = {
    getProductsHandler,
    createProductHandler,
    changInforProductHandler,
    deletteProductHandler,
    getProductByIdHandler,
};
