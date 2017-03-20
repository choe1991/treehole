/**
 * 登录接口
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect("/login.html");
});

module.exports = router;