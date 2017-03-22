/**
 * 登录接口
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var API = require('wechat-api');
var request = require('request');
var WechatAPI = require('wechat-api');

var config = {
    token: 'chengzhichao',
    appid: 'wx1d3399f54b3d8bf0',
    appsecret: '75eea3ccf6db3c5a07478aff036bc22a',
    encodingAESKey: 'raS0qTDmvC4Uo7cSnWH4myFJQfs1embZoeQLEUkDYcF',
    checkSignature: false
};
var api = new WechatAPI(config.appid, config.appsecret);
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
    appsecret: '75eea3ccf6db3c5a07478aff036bc22a'
};

router.get('/test', function(req, res, next) {

    var menu = {
        "button": [{
                "name": "个人中心",
                "sub_button": [{
                        "type": "click",
                        "name": "绑定账号",
                        "key": "M1"
                    },
                    {
                        "type": "click",
                        "name": "立即进入",
                        "key": "M2"
                    }
                ]
            }, {
                "type": "click",
                "name": "投资理财",
                "key": "M3"
            },
            {
                "name": "其他信息",
                "sub_button": [{
                        "type": "click",
                        "name": "关于我们",
                        "key": "M4"
                    },
                    {
                        "type": "click",
                        "name": "实时车库",
                        "key": "M5"
                    }
                ]
            }
        ]
    }

    api.createMenu(menu, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

})



router.get('/oauth', function(req, res, next) {
    console.log("进入方法了");
    var code = req.query.code;
    var state = req.query.state;
    var userinfo = {};
    if (code) {
        request("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + config.appid + "&secret=" + config.appsecret + "&code=" + code + "&grant_type=authorization_code", function(error, response, body) {
            var data = JSON.parse(body);
            var openid = data.openid;
            var access_token = data.access_token;
            console.log(openid, access_token)
            if (state == 2) {
                request("https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid + "&lang=zh_CN", function(error, response, body) {
                    userinfo = JSON.parse(body);
                    res.send(userinfo);
                })
            } else {
                api.getUser(openid, function(err, result) {
                    userinfo = result;
                    res.send(userinfo);
                });
            }

        });
    } else {
        console.log("请求获取到的结果??");
        userinfo.errmsg = "用户取消授权了";
        res.send(userinfo);
    }


});
module.exports = router;