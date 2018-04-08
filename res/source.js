var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var leftFrame, rightFrame, updateTime = 0, gameEnd = 0, 
cacheLeft = 0, cacheRight = 0, over = 0, _test = false, loadStatus = 0;

var frame = [0, 100, 200, 300, 400, 500];

function main() {
		if(updateTime % 10 == 0) {
			cacheLeft = Math.random() * 6;
			cacheLeft = cacheLeft - (cacheLeft % 1);
			
			cacheRight = Math.random() * 6;
			cacheRight = cacheRight - (cacheRight % 1);
			
			leftFrame = frame[cacheLeft];
			rightFrame = frame[cacheRight];
		}	
	}

function render(){
	var cubs = new Image();
	cubs.src = "res/cubs.png";
	var bg = new Image();
	bg.src = "res/bg.jpg";
			ctx.drawImage(bg, 0, 0, 200, 150);
			ctx.drawImage(cubs, 0, leftFrame, 100, 100, 0, 0, 100, 100);
			ctx.drawImage(cubs, 0, rightFrame, 100, 100, 100, 0, 100, 100);
}

function UI() {
		if(_test == true) {
			var startButton = new Image();
			startButton.src = "res/startButton.png";
			startButton.onload = function() {
			ctx.drawImage(startButton, 50, 115, 100, 20);
			}
		}
		if(_test == false) {
			loadStatus += 0.33;
			var loading = new Image();
			loading.src = "res/loading.png";
			var loadingFon = new Image();
			loadingFon.src = "res/loadingFon.png";
			ctx.drawImage(loadingFon, 50, 115, 100, 20);
			ctx.drawImage(loading, 50, 115, loadStatus, 20);
		}	
}

function gameOver() {
		_test = true;
		loadStatus = 0;
		render();
		UI();
		if(leftFrame == 0 && rightFrame == 0) {
			var winScreen = new Image();
			winScreen.src = "res/winScreen.jpg";
			winScreen.onload = function() {
				ctx.clearRect(0, 0, 200, 150);
				ctx.drawImage(winScreen, 0, 0, 200, 150);
			} 
		}

		window.onkeydown = function (event) {
			if(event.keyCode == 32 && _test == true) {
				gameEnd = 0;
				updateTime = 0;
				ctx.clearRect(0, 0, 200, 150);
				update();
				var dropSound = new Audio();
				dropSound.src = "res/drop.mp3";
				dropSound.play();
			}
		}
}

function update() {
	setTimeout(function() {
		if(gameEnd >= 300) 
			gameOver();	
		if (gameEnd < 300) {
			_test = false
			gameEnd++;
			updateTime++;
			
			main();
			render();
			UI();

			window.requestAnimationFrame(update);
		}
	}, 1000/60);}
