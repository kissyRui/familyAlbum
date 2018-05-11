const router = require('koa-router')()

const userInfoController = require('../controllers/user-info');

const routers = router
    .get('/user/getUserInfo', userInfoController.getLoginUserInfo);

module.exports = routers