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
router.use('/', wechat(config, function(req, res, next) {
    console.log(req.weixin);
    var message = req.weixin;
    //文本

    var nickname = "未知用户";
    api.getUser(req.weixin.FromUserName, function(err, result) {
        if (err) {
            console.log(err);
            res.reply('出错了');
        } else {
            nickname = result.nickname;
            res.reply("亲爱的" + nickname + ',我们正在开发中，更多精彩，马上到来');
        }
    });



}));



module.exports = router;