var bg = document.getElementById('loading');
console.log(bg);
var ctx = bg.getContext('2d');
var pi = Math.PI;




function draw(current) {
	ctx.font = '14px Arial';
	ctx.textBaseline = 'hanging';
	ctx.fontWeight = "lighter";
	var text1 = "进度:" + parseInt(current * 100) + "%";
	ctx.textAlign = "center";
	ctx.strokeStyle = "#999";
	ctx.strokeText(text1, 50, 40);

	ctx.stroke();
	ctx.restore();
	ctx.save();

	ctx.beginPath();

	var gradient = ctx.createLinearGradient(0, 0, bg.width * 0.8, 0);

	gradient.addColorStop("0", "white");
	gradient.addColorStop("0.3", "pink");
	gradient.addColorStop("0.6", "orange");
	gradient.addColorStop("1", "red");
	// 用渐变进行填充
	ctx.strokeStyle = gradient;

	ctx.lineWidth = 10;
	ctx.arc(52, 50, 42, 0, 2*pi*current, false);

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