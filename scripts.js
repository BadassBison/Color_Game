var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var h1 = document.querySelector("h1");
var h2 = document.querySelector("h2");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");

init();

resetBtn.addEventListener("click", function(){
	reset();
});

function init(){
	ModeBtns();
	squareListeners();
	reset();
}

function ModeBtns(){
	for(var i = 0; i < modeBtns.length; i++){
		modeBtns[i].addEventListener("click", function(){
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			modeBtns[2].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy"){
				numSquares = 3;
			} else if (this.textContent === "Normal"){
				numSquares = 6;
			} else if (this.textContent === "Hard"){
				numSquares = 9;
			}
			reset();
		});
	}
}

function squareListeners(){
	// assign colors to the squares
	for (var i = 0; i < squares.length; i++){
		// add event listeners for the squares
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			//compare color picked to color to Find
			if(clickedColor === pickedColor){
				h2.innerHTML = "You're Right!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				h2.style.backgroundColor = clickedColor;
				resetBtn.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

// when the right color is picked,
//change all squares to that color
function changeColors(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

// random color to find
function pickColor(){
	var x = colors.length;
	var random = Math.floor(Math.random() * x);
	return colors[random];
}

// randomly placing colors in squares
function generateRandomColors(num){
	// make an array
	var arr = [];
	// add num colors to array
	for(var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	// return that array
	return arr;
}

// colors for the game
function randomColor(){
	var baseColor = [
		"red",
		"orange",
		"green",
		"blue",
		"purple",
		"pink",
		"yellow",
		"gray"
	];
	var foo = baseColor.length;
	var x = Math.floor(Math.random() * foo);
	return baseColor[x];
}

function reset(){
	colors = generateRandomColors(numSquares);
	// get a new picked color
	pickedColor = pickColor();
	// change colors of squares
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
	h2.style.backgroundColor = "steelblue";
	h2.textContent = "Where's " + pickedColor + "?";
	resetBtn.textContent = "New Colors";
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
}
