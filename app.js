const fs = require('fs.promised');
const path = require('path');
const route = require('koa-route');
const compose = require('koa-compose');
const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

const main = async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
};

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">首页</a>';
};

const logger = async (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    await next();
}

const staticServe = serve(path.join(__dirname, 'static'));

// const middlewares = compose([logger, route.get('/', main), route.get('/about', about)]);
// app.use(middlewares);


app.use(logger);
app.use(staticServe);
app.use(route.get('/', main));
app.use(route.get('/about', about));

app.listen(3000);

