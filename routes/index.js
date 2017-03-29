var express = require('express');
var router = express.Router();


var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: "smtp.exmail.qq.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: "admin@czcczc.cc", // 账号
        pass: "Choe1992" // 密码
    }
});

// setup email data with unicode symbols
var mailOptions = {
    from: '"猪宝宝管理员" <admin@czcczc.cc>', // sender address
    to: 'e1j92lo@dingtalk.com', // list of receivers
    subject: '邮件测试', // Subject line
    text: '哈喽哈喽 ?', // plain text body
    html: '<b>仅仅测试</b>' // html body
};

// send mail with defined transport object


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index", { title: "主页" });
});

router.get('/picker', function(req, res, next) {
    res.render("picker", { title: "替身" });
});



// router.get("/mail", function(req, res, next) {
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//             res.send("邮件发送失败");
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//         res.send("邮件发送成功");
//     });
// })



module.exports = router;