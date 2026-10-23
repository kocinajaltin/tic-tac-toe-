// player selection


// readline

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askName() {
    rl.question("What's your name? ", (name) => {
        console.log(`\nWelcome to the game, ${name}!\n`)

        game(board)

        frontMove()
    })
}

askName ()

// table display 

let board = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
]

const WIN_COMBINATIONS = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const players = ["X", "O"]

let turn = players[0]

function move (a) {

    board[a] = "X"
    game(board)
}

// function updateTurn() {
// 	if (turn === players[0]) {
// 		turn = players[1];
// 	} else if (turn === players[1]) {
// 		turn = players[0];
// 	} else {
// 		throw 'Invalid turn value';
// 	}
// }


function game (input) {
    finalBoard = (
    `\n
    ${input[0]} | ${input[1]} | ${input[2]}
    --|---|--
    ${input[3]} | ${input[4]} | ${input[5]}
    --|---|--
    ${input[6]} | ${input[7]} | ${input[8]}
    \n
    `
    );
    console.log(finalBoard)
    function updateTurn() {
        if (turn === players[0]) {
            turn = players[1]
            console.log('player: ', turn);;
        } else if (turn === players[1]) {
            turn = players[0];
        } else {
            throw 'Invalid turn value';
        }
    }
    return frontMove()
}

function checkWin (player) {
    for (let combo of WIN_COMBINATIONS){
        const [a,b,c] = combo
        if (board[a] === player && board[b] === player && board[c] === player){
            return true
        } else {
            return frontMove()
        }
    }
}

function frontMove () {
    rl.question("Choose a position, from 0-8? ", (input) => {
        const position = parseInt(input.trim(), 10);

        // 1. Check for invalid move
        if (isNaN(position) || position < 0 || position > 8 || board[position] !== ' ') {
            console.log(" Invalid move! Try again.");
            return frontMove(); // Retry human turn
        }

        // 2. Place Human mark
        board[position] = 'X';

        // 3. Check if Human won or drew
        if (checkWin('X')) {
            printBoard();
            console.log("You Win!");
            rl.close();
        } else if (checkDraw()) {
            printBoard();
            console.log(" It’s a draw!");
            rl.close();
        } else {
            // 4. Pass control to the computer
            console.log("\n Computer is making a move...");
            setTimeout(() => {
            computerMove();
            }, 1000);
        }
        });   


    }

const computerPlayer = "O"

function computerMove (){
    const emptySpots = [];
    board.forEach((cell, index) => {
        if (cell === " ") {
            emptySpots.push(index)
        }
    const randomIndex = Math.floor(Math.random() * emptySpots.length)
    const chosenPosition = emptySpots[randomIndex]
    board[chosenPosition] = computerPlayer
    if (checkWin(computerPlayer)) {
        game()
        console.log('computer outsmarted you!!!!!, better luck next time');
        }
        else if (checkDraw()) {
        game()
        console.log('draw, better luck next time');
        } else {
            frontMove()
        }
    })
}

function checkDraw() { 
    for (let cell of board) { 
        if (cell === ' ') { 
            return false; 
        } 
    } 
    return true; 
}

