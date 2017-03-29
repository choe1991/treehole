/**
 * Created by choe on 2017/3/28.
 */
var express = require('express');
var router = express.Router();
var WXPay = require('node-wxpay');

var wxpay = WXPay({
    appid: 'xxxxxxxx',
    mch_id: '1428338402',
    partner_key: 'xxxxxxxxxxxxxxxxx',
    pfx: fs.readFileSyncu('./123.p12'),
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    wxpay.createEnterprisePay({
        openid: openid,
        desc: "测试",
        partner_trade_no: '' + 1 + 2 + 3 +Math.random().toString().substr(2, 10),
        amount: 1,
        spbill_create_ip: '127.0.0.1'
    }, function(err, result){

        console.log('------企业付款-----'+JSON.stringify(result));
    });
});

module.exports = router;