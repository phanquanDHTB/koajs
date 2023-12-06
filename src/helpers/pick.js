/**
 *
 * @param {{id: number, name: string, price: number, description: string, product: string, color: string, createdAt: Date, image: string }} product
 * @param {[string]} listField
 * @returns
 */

const pick = (product, listField) => {
    return Object.keys(product).reduce((result, key) => {
        if (listField.includes(key)) {
            result[key] = product[key];
        }
        return result;
    }, {});
};

module.exports = pick;
