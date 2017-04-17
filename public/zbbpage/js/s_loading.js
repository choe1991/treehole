var bg = document.getElementById('jd');
console.log(bg);
var ctx = bg.getContext('2d');
var pi = Math.PI;
/**
 * 
 * @param {*} current 百分比
 * @param {*} title 类别
 * @param {*} name 标题
 */
function draw(current, title, name) {

    //浅灰底色
    ctx.beginPath();
    ctx.strokeStyle = "#e6e6e7";
    ctx.lineWidth = 20;
    ctx.arc(150, 0, 100, pi, 0, true);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    //画方框
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ec6e65";
    ctx.strokeRect(80, 18, 60, 18); /*绘制一个矩形，前两个参数决定开始位置，后两个分别是矩形的宽和高*/
    ctx.stroke();
    ctx.restore();
    ctx.save();
    //画类别
    ctx.font = '13px courier';
    ctx.textBaseline = 'hanging';
    ctx.fontWeight = "lighter";
    var title = title;
    ctx.textAlign = "center";
    ctx.fillStyle = "#595757";
    ctx.fillText(title, 110, 22);
    ctx.stroke();
    ctx.restore();
    ctx.save();

    //画名称
    ctx.font = '20px courier';
    ctx.textBaseline = 'hanging';
    ctx.fontWeight = "lighter";
    var name = name;
    ctx.textAlign = "center";
    ctx.fillStyle = "#ec6d65";
    ctx.fillText(name, 182, 20);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    

    //进度
    ctx.font = '15px courier';
    ctx.textBaseline = 'hanging';
    ctx.fontWeight = "lighter";
    var text1 = "进度: ";
    ctx.textAlign = "center";
    ctx.fillStyle = "#595757";
    ctx.fillText(text1, 125, 60);
    ctx.stroke();
    ctx.restore();
    ctx.save();

    //百分比parseInt(current * 100) 
    ctx.font = '25px Arial';
    ctx.textBaseline = 'hanging';
    ctx.fontWeight = "lighter";
    var bai = parseInt(current * 100) + "%";
    ctx.textAlign = "center";
    ctx.fillStyle = "#595757";
    ctx.fillText(bai, 170, 53);
    ctx.stroke();
    ctx.restore();
    ctx.save();


    //画弧线
    ctx.beginPath();
    var gradient = ctx.createLinearGradient(0, 0, bg.width * 0.8, 0);
    gradient.addColorStop("0.1", "#f9d8d8");
    gradient.addColorStop("0.3", "#f4b2aa");
    gradient.addColorStop("0.6", "#f0968d");
    gradient.addColorStop("1", "#eb6d65");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 20;
    ctx.arc(150, 0, 100, pi, (1 - current) * pi, true);
    ctx.stroke();
    ctx.restore();
    ctx.save();


}
/**
 * 
 * @param {*} now 当前百分比
 * @param {*} title 优选计划
 * @param {*} name 供应链包
 */
function loadCanvas(now, title, name) {
    var t = 0;
    var timer = null;
    timer = setInterval(function() {
        ctx.clearRect(0, 0, bg.width, bg.height);
        if (t >= now) {
            draw(now, title, name); //最后一次绘制
            clearInterval(timer);
        } else {
            draw(t, title, name);

            t += 0.01;
        }
    }, 10);
}
