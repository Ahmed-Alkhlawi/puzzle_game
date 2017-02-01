var PUZZLE_DIFFICULTY = 4;
const PUZZLE_HOVER_TINT = '#009900';
 
var _canvas;
var _stage;

var _img;
var _pieces;
var _puzzleWidth;
var _puzzleHeight;
var _pieceWidth;
var _pieceHeight;
var _currentPiece;
var _currentDropPiece;
var tries = 0;
var _mouse;



$(document).ready(function()
{
	//hide all questions
	$( "#first_question" ).toggle();
	$( "#second_question" ).toggle();
	$( "#third_question" ).toggle();
	$( "#fourth_question" ).toggle();
	$( "#fifth_question" ).toggle();
	$( "#sixth_question" ).toggle();



//----

//shuffle all the answers
var selector = document.querySelector('select#answer1');
for (var i = selector.children.length; i >= 0; i--) {
    selector.appendChild(selector.children[Math.random() * i | 0]);
}

var selector = document.querySelector('select#answer2');
for (var i = selector.children.length; i >= 0; i--) {
    selector.appendChild(selector.children[Math.random() * i | 0]);
}

var selector = document.querySelector('select#answer3');
for (var i = selector.children.length; i >= 0; i--) {
    selector.appendChild(selector.children[Math.random() * i | 0]);
}


var selector = document.querySelector('select#answer4');
for (var i = selector.children.length; i >= 0; i--) {
    selector.appendChild(selector.children[Math.random() * i | 0]);
}

var selector = document.querySelector('select#answer5');
for (var i = selector.children.length; i >= 0; i--) {
    selector.appendChild(selector.children[Math.random() * i | 0]);
}

var selector = document.querySelector('select#answer6');
for (var i = selector.children.length; i >= 0; i--) {
    selector.appendChild(selector.children[Math.random() * i | 0]);
}




	$("button#run").on('click', function()
	{


	PUZZLE_DIFFICULTY = $( "#diff_level option:selected" ).val();
	$( "#setting" ).css("display", "none");
	start("images/puzzle_image_test.jpg")



    });

	$("button#question_one").on('click', function()
	{
		$( "#first_question" ).toggle();
		var answer = $( "#answer1 option:selected" ).val();
		if(answer === 'correct')
		{
			start("images/puzzle_image_1.jpg")
		}
		else
		{

			alert("wrong answer try again");
			tries = tries - 1;
			start("images/puzzle_image_test.jpg")

		}

	});

	$("button#question_two").on('click', function()
	{
	
		$( "#second_question" ).toggle();
		var answer = $( "#answer2 option:selected" ).val();
		if(answer === 'correct')
		{
			start("images/puzzle_image_2.jpg")
		}
		else
		{

			alert("wrong answer try again");
			tries = tries - 1;
			start("images/puzzle_image_1.jpg")

		}

	});

	$("button#question_three").on('click', function()
	{
		
		$( "#third_question" ).toggle();
		var answer = $( "#answer3 option:selected" ).val();
		if(answer === 'correct')
		{

			start("images/puzzle_image_3.jpg")
		}
		else
		{

			alert("wrong answer try again");
			tries = tries - 1;
			start("images/puzzle_image_2.jpg")

		}

	});

	$("button#question_four").on('click', function()
	{
		
		$( "#fourth_question" ).toggle();
		var answer = $( "#answer4 option:selected" ).val();
		if(answer === 'correct')
		{
			start("images/puzzle_image_4.jpg")
		}
		else
		{

			alert("wrong answer try again");
			tries = tries - 1;
			start("images/puzzle_image_3.jpg")

		}

	});

	$("button#question_five").on('click', function()
	{
	
		$( "#fifth_question" ).toggle();
		var answer = $( "#answer5 option:selected" ).val();
		if(answer === 'correct')
		{
			start("images/puzzle_image_5.jpg")
		}
		else
		{

			alert("wrong answer try again");
			tries = tries - 1;
			start("images/puzzle_image_4.jpg")

		}
		

	});

	$("button#question_six").on('click', function()
	{
		
		$( "#sixth_question" ).toggle();
		var answer = $( "#answer6 option:selected" ).val();
		if(answer === 'correct')
		{
			start("images/puzzle_image_6.jpg")
		}
		else
		{

			alert("wrong answer try again");
			tries = tries - 1;
			start("images/puzzle_image_5.jpg")

		}

	});


});

function start(img)
{

	switch(img){		
		case "question1":

		$( "#canvas" ).css("display", "none");
		$( "#first_question" ).toggle();
		break

		case "question2":		
		$( "#canvas" ).css("display", "none");
		$( "#second_question" ).toggle();
		break

		case "question3":
		$( "#canvas" ).css("display", "none");
		$( "#third_question" ).toggle();
		break

		case "question4":
		$( "#canvas" ).css("display", "none");
		$( "#fourth_question" ).toggle();
		break

		case "question5":
		$( "#canvas" ).css("display", "none");
		$( "#fifth_question" ).toggle();
		break

		case "question6":
		$( "#canvas" ).css("display", "none");
		$( "#sixth_question" ).toggle();
		break

		case "done":
		alert("You managed to solve all the puzzles!!!");
		tries = 1;
		start("question1")
		break

		default:
				console.log("ran");

		l_img = img;
		$( "#canvas" ).css("display", "block");
		console.log(l_img)
		_img = new Image();
	    _img.addEventListener('load',onImage,false);
	    _img.src = l_img;

	}


}


function onImage(e){
    _pieceWidth = Math.floor(_img.width / PUZZLE_DIFFICULTY)
    _pieceHeight = Math.floor(_img.height / PUZZLE_DIFFICULTY)
    _puzzleWidth = _pieceWidth * PUZZLE_DIFFICULTY;
    _puzzleHeight = _pieceHeight * PUZZLE_DIFFICULTY;
    setCanvas();
    initPuzzle();
}

function setCanvas(){
    _canvas = document.getElementById('canvas');
    _stage = _canvas.getContext('2d');
    _canvas.width = _puzzleWidth;
    _canvas.height = _puzzleHeight;
    _canvas.style.border = "1px solid black";
}

function initPuzzle(){
    _pieces = [];
    _mouse = {x:0,y:0};
    _currentPiece = null;
    _currentDropPiece = null;
    _stage.drawImage(_img, 0, 0, _puzzleWidth, _puzzleHeight, 0, 0, _puzzleWidth, _puzzleHeight);
    createTitle("Click to Play");
    buildPieces();
}

function createTitle(msg){
    _stage.fillStyle = "#000000";
    _stage.globalAlpha = .4;
    _stage.fillRect(100,_puzzleHeight - 40,_puzzleWidth - 200,40);
    _stage.fillStyle = "#FFFFFF";
    _stage.globalAlpha = 1;
    _stage.textAlign = "center";
    _stage.textBaseline = "middle";
    _stage.font = "20px Arial";
    _stage.fillText(msg,_puzzleWidth / 2,_puzzleHeight - 20);
}

function buildPieces(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY;i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        _pieces.push(piece);
        xPos += _pieceWidth;
        if(xPos >= _puzzleWidth){
            xPos = 0;
            yPos += _pieceHeight;
        }
    }
    document.onmousedown = shufflePuzzle;
}

function shufflePuzzle(){
    _pieces = shuffleArray(_pieces);
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, xPos, yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(xPos, yPos, _pieceWidth,_pieceHeight);
        xPos += _pieceWidth;
        if(xPos >= _puzzleWidth){
            xPos = 0;
            yPos += _pieceHeight;
        }
    }
    document.onmousedown = onPuzzleClick;
}
function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function onPuzzleClick(e){
    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX - _canvas.offsetLeft;
        _mouse.y = e.layerY - _canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX - _canvas.offsetLeft;
        _mouse.y = e.offsetY - _canvas.offsetTop;
    }
    _currentPiece = checkPieceClicked();
    if(_currentPiece != null){
        _stage.clearRect(_currentPiece.xPos,_currentPiece.yPos,_pieceWidth,_pieceHeight);
        _stage.save();
        _stage.globalAlpha = .9;
        _stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
        _stage.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
    }

    function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

function updatePuzzle(e){
    _currentDropPiece = null;
    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX - _canvas.offsetLeft;
        _mouse.y = e.layerY - _canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX - _canvas.offsetLeft;
        _mouse.y = e.offsetY - _canvas.offsetTop;
    }
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(piece == _currentPiece){
            continue;
        }
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        if(_currentDropPiece == null){
            if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
                //NOT OVER
            }
            else{
                _currentDropPiece = piece;
                _stage.save();
                _stage.globalAlpha = .4;
                _stage.fillStyle = PUZZLE_HOVER_TINT;
                _stage.fillRect(_currentDropPiece.xPos,_currentDropPiece.yPos,_pieceWidth, _pieceHeight);
                _stage.restore();
            }
        }
    }
    _stage.save();
    _stage.globalAlpha = .6;
    _stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
    _stage.restore();
    _stage.strokeRect( _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth,_pieceHeight);
}
}

function pieceDropped(e){
    document.onmousemove = null;
    document.onmouseup = null;
    if(_currentDropPiece != null){
        var tmp = {xPos:_currentPiece.xPos,yPos:_currentPiece.yPos};
        _currentPiece.xPos = _currentDropPiece.xPos;
        _currentPiece.yPos = _currentDropPiece.yPos;
        _currentDropPiece.xPos = tmp.xPos;
        _currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin(){
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
        }
    }
    if(gameWin){
        setTimeout(gameOver,500);
    }
}

function gameOver(){
	console.log("done processing ...")
	console.log(l_img)
	tries = tries +1
	console.log(tries)
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    switch(tries) {
    	case 1:
    	start("question1")
    	break
    	case 2:
    	start("question2")
    	break
    	case 3:
    	start("question3")
    	break
    	case 4:
    	start("question4")
    	break
    	case 5:
    	start("question5")
    	break
    	case 6:
    	start("question6")
    	break
    	case 7:
    	start("done")
    	break
    } 

  
}