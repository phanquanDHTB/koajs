const {
    getProducts,
    createProduct,
    changeInforProduct,
    deleteProduct,
    getProductById,
} = require("../database/productRepository");
const pick = require("../helpers/pick");

const getProductsHandler = async (ctx) => {
    try {
        const { limit, sort } = ctx.request.query;
        const products = getProducts({ limit, sort });
        return (ctx.body = {
            data: products,
        });
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: "err",
            error: err.message,
        };
    }
};

const createProductHandler = async (ctx) => {
    try {
        const productData = ctx.request.body;
        const newProduct = createProduct(productData);
        ctx.body = {
            data: newProduct,
        };
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: err.message,
        };
    }
};

const changInforProductHandler = async (ctx) => {
    try {
        const productData = ctx.request.body;
        const newProduct = changeInforProduct(productData);
        return (ctx.body = {
            data: newProduct,
        });
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: err.message,
        };
    }
};

const deletteProductHandler = async (ctx) => {
    try {
        const { id } = ctx.params;
        deleteProduct(id);
        ctx.body = {
            data: "ok",
        };
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: err.message,
        };
    }
};

const getProductByIdHandler = async (ctx) => {
    try {
        const { id } = ctx.params;
        const { field } = ctx.request.query;
        const listField = field.split(",");
        const product = getProductById(id);
        return (ctx.body = {
            data: pick(product[0], listField),
        });
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: err.message,
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
