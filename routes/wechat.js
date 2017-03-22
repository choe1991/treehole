var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');

var config = {
    token: 'chengzhichao',
    appid: 'wx1d3399f54b3d8bf0',
    appsecret: '75eea3ccf6db3c5a07478aff036bc22a',
    encodingAESKey: 'raS0qTDmvC4Uo7cSnWH4myFJQfs1embZoeQLEUkDYcF',
    checkSignature: false
};

router.use(express.query());

var api = new WechatAPI(config.appid, config.appsecret);
router.use('/', wechat(config, wechat.text(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(message.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
}).image(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
}).voice(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
}).video(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
}).shortvideo(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
}).location(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
}).link(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
}).event(function(message, req, res, next) {

    if (req.weixin.Event == 'CLICK') {
        if (req.weixin.EventKey) {
            res.reply([{
                title: '正在开发中，更多精彩，马上到来',
                description: '点击查看我们的主页',
                picurl: 'http://cc.czcczc.cc/zbbpage/img/123.jpg',
                url: 'http://www.zhubaby.com/'
            }, {
                title: '微信端模型初览',
                description: '点击查看我们的主页',
                picurl: 'http://www.zhubaby.com/wis18/frontend/images/pig_icon2.png',
                url: 'http://cc.czcczc.cc/zbbpage/index.html'
            }]);
        }
    }

}).device_text(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
}).device_event(function(message, req, res, next) {
    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        nickname = result.nickname;
        res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
    });
})));



module.exports = router;