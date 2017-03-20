var express = require('express');
var router = express.Router();
var db = require('./db.js');
/* GET home page. */
router.get('/all', function(req, res, next) {
    db.query('select * from heros', function(err, rows) {
        if (err) {
            res.send({ title: 'heros', datas: [] });
        } else {
            res.send({ title: 'heros', datas: rows });
        }
    })
});
/**
 * get方法获取前台传来的参数是使用req.query
 * post方法是                 req.body
 */
router.get('/', function(req, res, next) {
    if (req.query.pageindex == null) {
        var pageindex = 1;
    } else {
        var pageindex = req.query.pageindex;
    }
    console.log(111, req.query.pageindex);
    var startItem = (pageindex - 1) * 16;

    db.query('select * from heros limit ' + startItem + ',16', function(err, rows) {
        if (err) {
            res.send({ title: 'heros', datas: [] });
        } else {
            res.send({ title: 'heros', datas: rows });
        }
    })
});


module.exports = router;