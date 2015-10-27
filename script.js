var canvas = $('#workSpace')[0],
	ctx = canvas.getContext('2d'),
	canvasWidth = $('#workSpace').width(),
	canvasHeight = $('#workSpace').height(),
	randomBlock,
	block,
	direction,
	randomBlock;



	function init() {
		direction = 'down';
		createBlock();
		paint();
		//loop = setInterval(paint, 1000);
	}

	function createBlock() {
		block = [];
		block.push(
			[{x:7, y:0},{x:8, y:0},{x:9, y:0},{x:10, y:0}],
			[{x:7, y:0},{x:8, y:0},{x:9, y:0},{x:7, y:1}],
			[{x:7, y:0},{x:8, y:0},{x:8, y:1},{x:9, y:1}],
			[{x:7, y:1},{x:8, y:1},{x:8, y:0},{x:9, y:0}],
			[{x:9, y:0},{x:8, y:1},{x:9, y:1},{x:10, y:1}],
			[{x:8, y:0},{x:9, y:0},{x:8, y:1},{x:9, y:1}]
			);
		randomBlock = Math.floor(Math.random() * (1 - 0)) + 0;
	}

	function paint() {
		ctx.strokeStyle = 'black';
		ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
		var count = block[randomBlock].length;

		for (var i = 0; i < count; i++) {
			var nx = block[randomBlock][i].x;
			var ny = block[randomBlock][i].y;
				ny++;
				var tail = block[randomBlock][i];
				var del = block[randomBlock].shift();
			tail.x = nx;
			tail.y = ny;
			block[randomBlock].unshift(tail);	
		};

		for(var i = 0; i < block[randomBlock].length; i++){
			var c = block[randomBlock][i];
			paintCanvas(c.x, c.y);
		}
	}

	function paintCanvas(x, y) {
		ctx.fillStyle = 'red';
		ctx.fillRect(x*20, y*20, 20, 20);
	}


$(window).ready(function() {
	init();
})