/**
 * 登录接口
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("login",{title:"登录"});
});

module.exports = router;