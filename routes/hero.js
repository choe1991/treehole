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



module.exports = router;