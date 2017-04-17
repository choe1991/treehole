/**
 * 登录接口
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var moment = require('moment');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var expires = moment().add(7, 'days').valueOf();
    var token = jwt.sign({
        id: 1
    }, "secret");
    res.json({
        token: token,
        expires: expires
    });
});

module.exports = router;