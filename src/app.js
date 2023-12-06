const Koa = require("koa");
const koaBody = require("koa-body");
const routes = require("./routes/routes.js");
const routesView = require("./routes/productViewRoute.js");
const { faker } = require("@faker-js/faker");
const { writeFile } = require("./utils/writeFile.js");
const views = require("koa-views");
const path = require("path");

const app = new Koa();

app.use(
    views(path.join(__dirname, "view"), {
        extension: "ejs", // Chọn loại template engine (vd: 'pug', 'ejs', ...)
    })
);
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());
app.use(routesView.routes());

const generateBooks = () => {
    const listProduct = [];
    for (let i = 0; i < 100; i++) {
        const product = {
            id: i + 1,
            name: faker.name.fullName(),
            price: faker.number.int(),
            description: faker.lorem.paragraph(),
            product: faker.company.name(),
            color: faker.color.rgb(),
            createdAt: faker.date.anytime(),
            image: faker.image.url(),
        };
        listProduct.push(product);
    }
    // writeFile(listProduct);
};
// generateBooks();

const listProduct = app.listen(5000);
