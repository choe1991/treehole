var bg = document.getElementById('jd');
console.log(bg);
var ctx = bg.getContext('2d');
var pi = Math.PI;

function draw(current) {
	
	ctx.font = '15px courier';
	ctx.textBaseline = 'hanging';
	ctx.fontWeight = "lighter";
	var text1 = "进度:" + parseInt(current * 100) + "%";
	ctx.textAlign = "center";
	ctx.fillStyle = "#595757";
	ctx.fillText(text1, 150, 50);
	
	ctx.stroke();
	ctx.restore();
	ctx.save();

	ctx.font = '22px courier';
	ctx.fontWeight = "bold";
	ctx.textAlign = "center";
	ctx.fillStyle = "red";
	ctx.fillText("新手专享", 150, 15);
	ctx.stroke();
	ctx.restore();
	ctx.save();
	
	ctx.beginPath();

	var gradient = ctx.createLinearGradient(0, 0, bg.width * 0.8, 0);

	gradient.addColorStop("0.1", "#f9d8d8");
	gradient.addColorStop("0.3", "#f4b2aa");
	gradient.addColorStop("0.6", "#f0968d");
	gradient.addColorStop("1", "#eb6d65");
	// 用渐变进行填充
	ctx.strokeStyle = gradient;

	ctx.lineWidth = 30;
	ctx.arc(150, 0, 100, pi, (1-current)*pi, true);

	ctx.stroke();
	ctx.restore();

}

function loadCanvas(now) {
	var t = 0;
	var timer = null;
	timer = setInterval(function() {
		ctx.clearRect(0, 0, bg.width, bg.height);
		if(t >= now) {
			draw(now); //最后一次绘制
			clearInterval(timer);
		} else {
			draw(t);

			t += 0.01;
		}
	}, 10);
}
loadCanvas(1);