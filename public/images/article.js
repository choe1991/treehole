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

/* GET home page. */
router.get('/rand', function(req, res, next) {
    db.query('select * from heros order by rand() limit 16', function(err, rows) {
        if (err) {
            res.send({ title: 'heros', datas: [] });
        } else {
            res.send({ title: 'heros', datas: rows });
        }
    })
});


//SELECT * FROM `table` ORDER BY RAND() LIMIT 5

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

    db.query('select h.headimg,h.zhName,ta.content,ta.time,ta.userid from heros as h,treehole_article as ta,treehole_user as tu where ta.userid = tu.id and tu.heroid  = h.id limit ' + startItem + ',16', function(err, rows) {
        if (err) {
            res.send({ title: 'heros', datas: [] });
        } else {
            res.send({ title: 'heros', datas: rows });
        }
    })
});



router.get('/add', function(req, res, next) {
    res.redirect("/add.html");
});

router.post('/add', function(req, res, next) {
    var userid = 1;
    var postData = req.body.content;
    console.log("前台传过来的内容是:", req.body);
    var sql = "insert into treehole_article (userid,content) values (" + userid + ",'" + postData + "') ";
    db.query(sql, function(err, row) {
        res.send({ result: row });
    });
});



module.exports = router;