const Router = require("koa-router");
const {
    getProductsHandler,
    createProductHandler,
    changInforProductHandler,
    deletteProductHandler,
    getProductByIdHandler,
} = require("../handlers/productsHandler");
const { productsMiddleware } = require("../middleware/productsMiddleware");

const router = new Router({
    prefix: "/api",
});

router.get("/products", getProductsHandler);
router.post("/product", productsMiddleware, createProductHandler);
router.put("/product/:id", productsMiddleware, changInforProductHandler);
router.delete("/product/:id", deletteProductHandler);
router.get("/product/:id", getProductByIdHandler);

module.exports = router;
