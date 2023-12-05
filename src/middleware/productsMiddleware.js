const yup = require("yup");

const productsMiddleware = async (ctx, next) => {
    try {
        const productData = ctx.request.body;
        let schema = yup.object().shape({
            name: yup.string().required(),
            price: yup.number().required(),
            description: yup.string().required(),
            products: yup.string().required(),
            color: yup.string().required(),
            image: yup.string().required(),
        });

        await schema.validate(productData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name,
        };
    }
};

module.exports = { productsMiddleware };
