const { readFile, writeFile } = require("../utils/readFile");

const getProducts = (limit) => {
    return readFile().slice(0, limit);
};
const sortProducts = (sort) => {
    if (sort === "desc") {
        return readFile().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return readFile().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

const createProduct = (product) => {
    const newListProduct = [...readFile(), { ...product, id: readFile().length + 1 }];
    writeFile(newListProduct);
};

const changeInforProduct = (productChange) => {
    const { id } = productChange;
    //     const productOld = readFile().filter((product) => product.id === id);
    readFile().map((product) => (product.id === id ? productChange : product));
};

const deleteProduct = (id) => {
    const newListProduct = readFile().filter((product) => product.id != id);
    writeFile(newListProduct);
};

const getProductById = (id) => {
    return readFile().filter((product) => product.id == id);
};

module.exports = { getProducts, sortProducts, createProduct, deleteProduct, changeInforProduct, getProductById };
