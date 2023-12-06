const { writeFile } = require("../utils/writeFile");
const file = require("../database/products.json");
const { desc, asc } = require("../helpers/sort");

/**
 *
 * @param {number} limit
 * @returns
 */
const getProducts = (limit) => {
    return file.slice(0, limit);
};

/**
 *
 * @param {"asc" | "desc"} sort
 * @returns
 */
const sortProducts = (sort) => {
    if (sort === "desc") {
        return file.sort(desc);
    }
    return file.sort(asc);
};

/**
 *
 * @param {{ name: string, price: number, description: string,
 *  product: string, color: string, createdAt: Date, image: string }} product
 */
const createProduct = (product) => {
    const newListProduct = [...file, { ...product, id: file[file.length - 1].id + 1 }];
    writeFile(newListProduct);
};

/**
 *
 * @param {{id: number, name: string, price: number, description: string,
 *  product: string, color: string, createdAt: Date, image: string }} productChange
 */
const changeInforProduct = (productChange) => {
    const { id } = productChange;
    writeFile(file.map((product) => (product.id == id ? productChange : product)));
};

/**
 *
 * @param {number} id
 */
const deleteProduct = (id) => {
    const newListProduct = file.filter((product) => product.id != id);
    writeFile(newListProduct);
};

/**
 *
 * @param {number} id
 * @returns
 */
const getProductById = (id) => {
    return file.filter((product) => product.id == id);
};

module.exports = { getProducts, sortProducts, createProduct, deleteProduct, changeInforProduct, getProductById };
