/**
 * 登录接口
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var API = require('wechat-api');



/* 微信接入验证模块 */
router.get('/', function(req, res, next) {
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var echostr = req.query.echostr;
    var nonce = req.query.nonce;
    var list = [timestamp, "chengzhichao", nonce].sort();
    var result = '';
    for (var i = 0; i < list.length; i++) {
        result += list[i];
    }
    var hash = crypto.createHash('sha1');
    hash.update(result);
    result = hash.digest('hex');
    res.send(echostr);
});


/**
 * 微信令牌相关
 */
var wxinfo = {
    appid: 'wx1d3399f54b3d8bf0',
    appsecret: '75eea3ccf6db3c5a07478aff036bc22a',
    tokenTime: 0,
    token: ''
};

router.get('/test', function(req, res, next) {

    var api = new API(wxinfo.appid, wxinfo.appsecret);
    var menu = {
        "button": [{
                "type": "click",
                "name": "正在开发",
                "key": "V1001_TODAY_MUSIC"
            },
            {
                "name": "稍后精彩",
                "sub_button": [{
                        "type": "view",
                        "name": "PC站",
                        "url": "http://www.zhubaby.com/"
                    },
                    {
                        "type": "click",
                        "name": "测试中",
                        "key": "V1001_GOOD"
                    }
                ]
            }
        ]
    }

    api.createMenu(menu, function(err, result) {
        if (err) {
            console.log('报错');
        } else {
            console.log(result);
        }
    });

})

module.exports = router;