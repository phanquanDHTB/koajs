const { writeFile } = require("../utils/writeFile");
const file = require("../database/products.json");
const { desc, asc } = require("../helpers/sort");

/**
 *
 * @param {number} limit
 * @param {"asc" | "desc"} sort
 * @returns
 */
const getProducts = ({ limit, sort }) => {
    if (limit) {
        return file.slice(0, limit);
    }
    if (sort === "desc") {
        return file.sort(desc);
    }
    if (sort === "asc") {
        return file.sort(asc);
    }
    return file;
};

/**
 *
 * @param {{ name: string, price: number, description: string,
 *  product: string, color: string, createdAt: Date, image: string }} product
 */
const createProduct = (product) => {
    const newListProduct = [...file, { ...product, id: file[file.length - 1].id + 1, createdAt: new Date() }];
    writeFile(newListProduct);
    return { ...product, id: file[file.length - 1].id + 1, createdAt: new Date() };
};

/**
 *
 * @param {number} id
 * @returns
 */
const getProductById = (id) => {
    const product = file.find((product) => product.id == id);
    if (product) return product;
    throw new Error("Product not found");
};

/**
 *
 * @param {{id: number, name: string, price: number, description: string,
 *  product: string, color: string, createdAt: Date, image: string }} productChange
 */
const changeInforProduct = (productChange) => {
    const { id } = productChange;
    const oldProduct = getProductById(id);
    if (oldProduct) {
        writeFile(file.map((product) => (product.id == id ? productChange : product)));
        return productChange;
    }
    throw new Error("Product not found");
};

/**
 *
 * @param {number} id
 */
const deleteProduct = (id) => {
    const newListProduct = file.filter((product) => product.id != id);
    writeFile(newListProduct);
};

module.exports = { getProducts, createProduct, deleteProduct, changeInforProduct, getProductById };
