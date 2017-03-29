/**
 * Created by choe on 2017/3/28.
 */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: "smtp.exmail.qq.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: "admin@czcczc.cc", // 账号
        pass: "Choe1992" // 密码
    }
});
var mailOptions = {
    from: '"树洞管理员" <admin@czcczc.cc>', // sender address
    subject: '邮件测试', // Subject line
    text: '验证码', // plain text body
};
function sendmail(to,content,callback) {
    mailOptions.to = to;
    mailOptions.html =content;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            callback(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        callback(error,info);
});
}

exports.sendmail = sendmail;
