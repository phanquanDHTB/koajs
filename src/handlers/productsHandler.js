const {
    getProducts,
    sortProducts,
    createProduct,
    changeInforProduct,
    deleteProduct,
    getProductById,
} = require("../database/productRepository");
const pick = require("../helpers/pick");

const getProductsHandler = async (ctx) => {
    try {
        const { limit, sort } = ctx.request.query;
        if (sort) {
            const listProductSort = sortProducts(sort);
            return (ctx.body = {
                data: listProductSort,
            });
        }
        if (limit) {
            const listProductLimit = getProducts(limit);
            return (ctx.body = {
                data: listProductLimit,
            });
        }
        throw new Error("Query not found");
    } catch (err) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: ["errr"],
            error: err.message,
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
            error: err.message,
        };
    }
};

const changInforProductHandler = async (ctx) => {
    try {
        const { id } = ctx.params;
        const productData = ctx.request.body;
        const oldProduct = getProductById(id);
        if (oldProduct.length) {
            changeInforProduct({ ...productData, id });
            return (ctx.body = {
                data: { ...productData, id },
            });
        }
        throw new Error("Product not found");
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
        if (product.length) {
            return (ctx.body = {
                data: pick(product[0], listField),
            });
        }
        throw new Error("Product not found");
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
