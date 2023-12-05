const Router = require("koa-router");
const { readFile } = require("../utils/readFile");

const router = new Router({});

router.get("/product", async (ctx) => {
    const product = readFile();
    await ctx.render("index", { product });
});

module.exports = router;
