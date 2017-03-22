var pi = Math.PI;
window.onload = function() {
	var size = $(".cvs").length;

	for(var i = 0; i < size; i++) {
		var canvas = document.createElement('canvas');
		canvas.id = "cvs" + i;
		canvas.width = 140;
		canvas.height = 65;
		$(".cvs").get(i).append(canvas);
		var a = $(".cvs").get(i).getAttribute('data-baifenbi');
		loadCanvas(canvas, a);
	}
}

function draw(ctx, current, obj) {

	ctx.font = '14px Arial';
	ctx.textBaseline = 'hanging';
	ctx.fontWeight = "lighter";
	var text1 = "进度:" + parseInt(current * 100) + "%";
	ctx.textAlign = "center";
	ctx.strokeStyle = "#999";
	ctx.strokeText(text1, 65, 15);
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.beginPath();
	var gradient = ctx.createLinearGradient(0, 0, obj.width, 0);
	gradient.addColorStop("0", "white");
	gradient.addColorStop("0.3", "pink");
	gradient.addColorStop("0.6", "orange");
	gradient.addColorStop("1", "red");
	// 用渐变进行填充
	ctx.strokeStyle = gradient;

	ctx.lineWidth = 10;
	ctx.arc(65, 0, 55, pi, pi * (1 - current), true);

	ctx.stroke();
	ctx.restore();

}

function loadCanvas(obj, now) {
	var ctx = obj.getContext('2d');
	var t = 0;
	var timer = null;
	timer = setInterval(function() {
		ctx.clearRect(0, 0, obj.width, obj.height);
		if(t >= now) {
			draw(ctx, now, obj); //最后一次绘制
			clearInterval(timer);
		} else {
			draw(ctx, t, obj);
			t += 0.01;
		}
	}, 10);
}