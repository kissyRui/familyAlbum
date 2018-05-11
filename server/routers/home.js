const router = require('koa-router')()

const homeController = require('../controllers/home');

const routers = router
    .get('/', homeController.index)
    .get('about', homeController.about);

module.exports = routers