var pi = Math.PI;
window.onload = function() {
	var size = $(".jdcavn").length;

	for(var i = 0; i < size; i++) {
		var canvas = document.createElement('canvas');
		canvas.id = "jdcavn" + i;
		canvas.width = 150;
		canvas.height = 80;
		var curt = $(".jdcavn").eq(i);
		curt.append(canvas);
		var a = curt.attr('data-baifenbi');
		/*var title=curt.attr('title');*/
		loadCanvas(canvas, a);
	}
}

function draw(ctx, current, obj) {
	var text1 = "进度:" + parseInt(current * 100) + "%";
	ctx.font = '14px Microsoft Yahei';
	ctx.textBaseline = 'hanging';
	ctx.fontWeight = "normal";
	ctx.textAlign = "center";
	ctx.fillStyle = "#717071";
	ctx.fillText(text1, 70, 20);
	ctx.stroke();
	ctx.restore();
	ctx.save();
	
	/*ctx.font = '15px Microsoft Yahei';
	ctx.fontWeight = "bold";
	ctx.textAlign = "center";
	ctx.fillStyle = "#717071";
	ctx.fillText(title, 90, 15); 
	ctx.stroke();
	ctx.restore();
	ctx.save();*/
	

	
	ctx.beginPath();
	var gradient = ctx.createLinearGradient(0, 0, obj.width, 0);
	gradient.addColorStop("0.1", "#e6e6e7");
	gradient.addColorStop("0.3", "#e6e6e7");
	gradient.addColorStop("0.6", "#e6e6e7");
	gradient.addColorStop("1", "#e6e6e7");
	// 用渐变进行填充
	ctx.strokeStyle = gradient;

	ctx.lineWidth = 20;
	ctx.arc(70, 0, 60, pi, 0, true);
//ctx.arc(65, 0, 55, 0.75*pi, 0.25*pi+(0.5-0.5*current)*pi, true);
	ctx.stroke();
	ctx.restore();
	ctx.save();
	
	
	ctx.beginPath();
	var gradient = ctx.createLinearGradient(0, 0, obj.width, 0);
	gradient.addColorStop("0.1", "#f9d8d8");
	gradient.addColorStop("0.3", "#f4b2aa");
	gradient.addColorStop("0.6", "#f0968d");
	gradient.addColorStop("1", "#eb6d65");
	// 用渐变进行填充
	ctx.strokeStyle = gradient;

	ctx.lineWidth = 20;
	ctx.arc(70, 0, 60, pi, pi * (1 - current), true);
//ctx.arc(65, 0, 55, 0.75*pi, 0.25*pi+(0.5-0.5*current)*pi, true);
	ctx.stroke();
	ctx.restore();
	ctx.save();
	
	
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