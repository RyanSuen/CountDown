var tangram = [
	{p: [{x: 0, y: 0}, {x: 800, y: 0}, {x: 400, y: 400}], color: '#caff67'},
	{p: [{x: 0, y: 0}, {x: 400, y: 400}, {x: 0, y: 800}], color: '#67becf'},
	{p: [{x: 800, y: 0}, {x: 800, y: 400}, {x: 600, y: 600},{x: 600, y: 200}], color: '#ef3d61'},
	{p: [{x: 600, y: 200}, {x: 600, y: 600}, {x: 400, y: 400}], color: '#f9f51a'},
	{p: [{x: 400, y: 400}, {x: 600, y: 600}, {x: 400, y: 800}, {x: 200, y: 600}], color: '#a594c0'},
	{p: [{x: 200, y: 600}, {x: 400, y: 800}, {x: 0, y: 800}], color: '#fa8ecc'},
	{p: [{x: 800, y: 400}, {x: 800, y: 800}, {x: 400, y: 800}], color: '#f6ca29'}
];

function draw(piece, cxt) {
	cxt.beginPath();
	cxt.moveTo(piece.p[0].x, piece.p[0].y);
	for(var i = 1; i < piece.p.length; i++) {
		cxt.lineTo(piece.p[i].x, piece.p[i].y);
	}
	cxt.closePath();
	cxt.fillStyle = piece.color;
	cxt.fill();
}

$(function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		len = tangram.length;
	for(var i = 0; i < len; i ++) {
		draw(tangram[i], context);
	}
	context.beginPath();
	context.lineWidth = 5;
	context.strokeStyle = 'green';
	context.arc(400, 400, 100,0,Math.PI, true);
	//context.closePath();
	context.stroke();
});