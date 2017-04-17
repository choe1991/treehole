var express = require('express');
var jwt = require('jsonwebtoken');
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
    var token = req.headers.authorization;
    var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDkyNDIyNzQzfQ.3hetfEnTei0w83wZrQjoGrQ2slP-iYpJ0yiF3711U3E", "secret");
    console.log(decoded);
    if (req.query.pageindex == null) {
        var pageindex = 1;
    } else {
        var pageindex = req.query.pageindex;
    }
    var startItem = (pageindex - 1) * 16;

    db.query('SELECT ta.id , h.headimg , h.zhName , ta.content , ta.time , ta.userid , IFNULL(b.sss , 0) AS comments_count , IFNULL(c.ccc , 0) AS likes_count FROM( heros AS h , treehole_article AS ta , treehole_user AS tu) LEFT JOIN( SELECT count(id) AS sss , articleid FROM treehole_comment GROUP BY articleid) b ON(b.articleid = ta.id) LEFT JOIN( SELECT count(id) AS ccc , article_id FROM treehole_like GROUP BY article_id) c ON(c.article_id = ta.id) WHERE ta.userid = tu.id AND tu.heroid = h.id GROUP BY ta.id ORDER BY ta.time DESC LIMIT ' + startItem + ',16', function(err, rows) {
        if (err) {
            res.send({ datas: [] });
        } else {
            res.send({ datas: rows });
        }
    })
});



router.get('/add', function(req, res, next) {
    var userid = req.session.userid;
    if (!userid) {
        res.redirect("/static/login.html");
    } else {
        res.redirect("/static/add.html");
    }
});


router.get("/getComments", function(req, res, next) {
    var article_id = req.query.article_id;
    if (article_id == null) {
        res.send({ result: [] })
    } else {
        var sql = "SELECT * FROM treehole_comment AS tc , treehole_user AS tu , heros AS hr WHERE hr.id = tu.heroid AND tc.userid = tu.id AND tc.articleid =" + article_id;
        db.query(sql, function(err, row) {
            if (err) {
                res.send({ result: [] });
            } else {
                res.send({ result: row });
            }
        });
    }
})

/**
 * 赞
 */
router.post('/like', function(req, res, next) {
        var article_id = req.body.article_id;
        var userid = req.session.userid;
        if (req.session.userid == null || req.session.userid == undefined) {
            res.send({ result: -2 });
        } else {
            var sql = "insert into treehole_like (userid,article_id) values('" + userid + "','" + article_id + "')";
            db.query(sql, function(err, row) {
                if (article_id == null || userid == null || err) {
                    res.send({ result: -1 });
                } else {
                    res.send({ result: 0 });
                }
            })
        }

    })
    /**
     * 查看某篇文章
     */
router.get('/view', function(req, res, next) {
    var article_id = req.query.article_id;
    var sql = "SELECT hr.headimg , hr.zhname , ta.id , ta.content , ta.time FROM treehole_article AS ta , heros AS hr , treehole_user as tu WHERE tu.heroid = hr.id AND tu.id = ta.userid AND ta.id =" + article_id;
    db.query(sql, function(err, row) {
        if (article_id == null || err) {
            res.send({ result: -1 });
        } else {
            res.send({ result: row });
        }
    })
})


router.post('/add', function(req, res, next) {
    var userid = req.session.userid;
    console.log(JSON.stringify(req.session))
    var postData = req.body.content;
    console.log("前台传过来的内容是:", req.body);
    var sql = "insert into treehole_article (userid,content) values (" + userid + ",'" + postData + "') ";
    db.query(sql, function(err, row) {
        if (err) {
            res.send(err);
        } else {
            res.send({ result: row });
        }
    });

});

router.post('/addComment', function(req, res, next) {
    var userid = req.session.userid;
    var postData = req.body.content;
    var article_id = req.body.article_id;
    if (userid == null || postData == null || article_id == null) {
        res.send({ result: -1 });
    } else {
        var sql = "insert into treehole_comment (userid,content,articleid) values (" + userid + ",'" + postData + "'," + article_id + ") ";
        db.query(sql, function(err, row) {
            if (err) {
                res.send({ result: -1, err: err });
            } else {
                res.send({ result: 0 });
            }
        });
    }
});


// router.get("/token", function(req, res, next) {
//     var result = getToken(setToken(1));
//     console.log(result);
//     res.send(result);
// })

// function setToken(userid) {
//     var token = jwt.sign({
//         exp: Math.floor(Date.now() / 1000) + 1,
//         data: userid
//     }, 'secret');
//     console.log(token);
//     return token
// }

// function getToken(token) {

//     var result = jwt.verify(token, 'secret', function(err, decoded) {
//         if (err) {
//             console.log(err);
//             return err
//         } else {
//             console.log(decoded.data);
//             return decoded
//         }
//     });

//     return result
// }




module.exports = router;