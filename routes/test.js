/**
 * 登录接口
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send("kokokokokokokokokokokokokokokokokok");
});

router.get('/aaa', function(req, res, next) {
    res.send("aaa");
});

module.exports = router;