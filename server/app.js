const fs = require('fs.promised');
const path = require('path');
const Koa = require('koa');
const compose = require('koa-compose');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('nunjucks');
const views = require('koa-views');
const proxy = require('./middlewares/proxy');
// const Router = require('koa-router');

const routers = require('./routers/index')

const app = new Koa();
// const router = new Router();

app.use(bodyParser());

// 配置api
app.use(proxy(app, {
    github_api: 'https://api.github.com/',
    github: 'https://github.com/',
    local: 'http://127.0.0.1:3000/',
    baidu: 'https://www.baidu.com/'
}, {
    allowShowApi: true,
    timeout: 15000 // 接口超时时间
}));

nunjucks.configure(__dirname + '/views', { autoescape: true });
app.use(views(__dirname + '/views', {
    map: {
        html: 'nunjucks'
    }
}));

const logger = async (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    await next();
}

app.use(logger);
app.use(koaStatic(path.join(__dirname, './../static')));

app.use(routers.routes());
app.use(routers.allowedMethods());

app.listen(3000);

