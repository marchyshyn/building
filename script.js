var canvas = $('#workSpace')[0],
	ctx = canvas.getContext('2d'),
	canvasWidth = $('#workSpace').width(),
	canvasHeight = $('#workSpace').height(),
	randomBlock,
	block,
	allBlock = [],
	empty = [],
	direction,
	speed,
	localCount = 0,
	cellSize,
	randomBlock;



	function init() {
		direction = 'down';
		speed = 500;
		cellSize = 20;
		createBlock();
		paintDown();
		loop = setInterval(paintDown, speed);
	}

	function createBlock() {
		block = [];
		block.push(
			[{x:7, y:0},{x:8, y:0},{x:9, y:0},{x:10, y:0}],
			[{x:7, y:0},{x:8, y:0},{x:9, y:0},{x:7, y:1}],
			[{x:7, y:0},{x:8, y:0},{x:8, y:1},{x:9, y:1}],
			[{x:9, y:0},{x:8, y:1},{x:8, y:0},{x:7, y:1}],
			[{x:9, y:0},{x:8, y:1},{x:9, y:1},{x:10, y:1}],
			[{x:8, y:0},{x:9, y:0},{x:8, y:1},{x:9, y:1}]
			);
		//	randomBlock = Math.floor(Math.random() * (6 - 0)) + 0;
		randomBlock = 0;
	}

	function setLoop(speed){
		clearInterval(loop);
		loop = setInterval(paintDown, speed); 
	}

	function newBlock(){
		if(block[randomBlock][3].y == 27 && !allBlock.length){
			var tail = block[randomBlock];
			for(var i = 0; i < tail.length; i++){
				allBlock.push(tail[i]);
			}
			clearInterval(loop);
			init();
		}
		if(allBlock.length > 0){
			for( var i = 0; i < allBlock.length; i++){
			for(var k = 0; k < block[randomBlock].length; k++){
				if((allBlock[i].y == (block[randomBlock][k].y + 1) && allBlock[i].x == block[randomBlock][k].x ) || block[randomBlock][3].y == 27){
					var tail = block[randomBlock];
						for(var i = 0; i < tail.length; i++){
							allBlock.push(tail[i]);
						}
					clearInterval(loop);
					init();
				}
			}
		}
		}

		if(allBlock.length > 0){
			for(var i = 0; i < allBlock.length; i++){
				var c = allBlock[i];
				paintCanvas(c.x, c.y);
			}
		}
	}

	function turnBlock(){
		
			var prev = block[randomBlock].splice(block[randomBlock]);
			var turn = block[randomBlock].splice(block[randomBlock]);
			console.log(prev, turn, block[randomBlock]);
			
	}

	function paintDown() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		ctx.strokeStyle = 'red';
		ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
		var count = block[randomBlock].length;

		for (var i = 0; i < count; i++) {
			var nx = block[randomBlock][i].x;
			var ny = block[randomBlock][i].y;
			if(direction == 'down') {	
				ny++;
			}
			else if(direction == 'left') {
				nx--;
			}
			else if(direction == 'right') {
				nx++;
			}
			var tail = block[randomBlock][i];
			tail.y = ny;
			tail.x = nx;
		};
		if(direction == 'up'){
			turnBlock();
		}
		direction = 'down';
		newBlock();
		for(var i = 0; i < block[randomBlock].length; i++){
			var c = block[randomBlock][i];
			paintCanvas(c.x, c.y);
		}
	}

	function paintCanvas(x, y) {
		ctx.fillStyle = 'red';
		ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize);
	}
$(document).keydown(function(e){
		var key = e.which;
		if(key == '37') direction = 'left';
		if(key == '38') direction = 'up';
		if(key == '39') direction = 'right';
		if(key == '40') direction = 'down';
	})

$(window).load(function() {
	init();
})