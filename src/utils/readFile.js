const fs = require("fs");

// Specify the path to your JSON file
const filePath = "./products.json";

// Read the content of the file
const readFile = () => {
    return JSON.parse(
        fs.readFileSync(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                return;
            }

            // Parse the JSON data
            try {
                const jsonData = JSON.parse(data);
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
            }
        })
    );
};

const writeFile = (listProduct) => {
    fs.writeFileSync(filePath, JSON.stringify(listProduct, null, 2));
};

module.exports = { readFile, writeFile };
