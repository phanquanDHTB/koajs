const fs = require("fs");
const file = require("../database/products.json");

const writeFile = (listProduct) => {
    fs.writeFileSync("./src/database/products.json", JSON.stringify(listProduct, null, 2));
};

module.exports = { writeFile };
