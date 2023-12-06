const Router = require("koa-router");
const products = require("../database/products.json");

const router = new Router({});

router.get("/product", async (ctx) => {
    await ctx.render("index", { products });
});

module.exports = router;
