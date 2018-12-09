var numberOfSquares = 6;
var colors = [];
var winningColor = "";
var rgbDisplay = document.querySelector("#rgbDisplay").textContent = winningColor.slice(3);
var h1 = document.querySelector("h1");
var reset = document.querySelector("#resetButton");
var outcome = document.querySelector("#outcome");
var allSquares = document.querySelectorAll(".square");
var difficulty = document.querySelectorAll(".difficulty");

init();

function init() {
	difficulty[1].classList.add("selected");
	reset.addEventListener("click", newGame);
	for (var i = 0; i < difficulty.length; i++) {
		difficulty[i].addEventListener("click", function(){
			difficulty[0].classList.remove("selected");
			difficulty[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6;
			newGame();
		});
	}
	newGame();
}

function newGame() {
	colors = generateColors(numberOfSquares);
	winningColor = randomColor();
	rgbDisplay = document.querySelector("#rgbDisplay").textContent = winningColor.slice(3);
	outcome.textContent = "";
	h1.style.background = "#2F4F4F";
	setupSquares();
}


function setupSquares() {
	for (var i = 0; i < allSquares.length; i++){
		allSquares[i].style.background = colors[i];
		allSquares[i].addEventListener("click", checkAnswer);
		reset.textContent = "New Colors";
	}
	if(numberOfSquares === 3) {
		for (var i = 3; i < 6; i++){
			allSquares[i].style.background = "#232323";
			allSquares[i].removeEventListener("click", checkAnswer);
			reset.textContent = "New Colors";
		}
	}
}

//create an array rgb values either 3 or 6 elements long, i.e. rgb(200, 100, 255)
function generateColors(num) {
	var arr = [];
	for (var i = 1; i <= num; i++) {
		var rValue = Math.floor(Math.random() * 256);
		var gValue = Math.floor(Math.random() * 256);
		var bValue = Math.floor(Math.random() * 256);
		arr.push("rgb(" + rValue + ", " + gValue + ", " + bValue +")")
	}
	return arr;
}

//choose a random element from the 'colors' array
function randomColor() {
	var element = Math.floor(Math.random() * colors.length);
	return colors[element];
}

//if the user guesses correctly turn all squares to the winning color, otherwise blackout the incorrect choices
function checkAnswer() {
	var userGuess = this.style.background;
	if (userGuess === winningColor) {
		outcome.textContent = "Correct!!";
		if(numberOfSquares === 3) {
			for (var i = 0; i < 3; i++){
				allSquares[i].style.background = winningColor;
				h1.style.background = winningColor;
			}
		}
		else {
			for (var i = 0; i < allSquares.length; i++) {
				allSquares[i].style.background = winningColor;
				h1.style.background = winningColor;
			}
		}
		reset.textContent = "Play Again?";
	}
	else {
		this.style.background = "#232323";
		outcome.textContent = "Try Again...";
	}
}
