let turn = ["X", "O"];
var isX = true;
var currTurn = turn[0];

// holds the gameBoard status
let boardArray = ['', '', '', '', '', '', '', '', ''];

// holds the buttons
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// makes the tic tac toe grid/board 
function makeGrid()
{
    for (var i = 0; i < 9; i++) {
        var button = document.createElement('button');
        button.innerHTML = "<button class='squares' id='"+ i + "' value='notSelected' onclick='whoseTurn("+ i + ")'><span class='test'></button></span>";
        
        gameBoard[i] = button;
        document.write(gameBoard[i].innerHTML);
    }
}

// called every time a button is clicked and handles player switches
function whoseTurn(i)
{
    let btn = document.getElementById("play");
    btn.onclick = function() {
        resetGrid();
    };
    
    if (document.getElementById(i).value == 'notSelected') { 
        // marks button as already selected
        document.getElementById(i).value = 'selected'

        // for printing out whose turn it is
        let pastTurn = change_turns();
        document.getElementById(i).innerHTML = pastTurn;
        boardArray[i] = pastTurn;

        // checks if there is a winner or if the board is full
        if (check_wins(pastTurn) || board_full()) {
            if (check_wins(pastTurn)) {
                document.getElementById("para").innerHTML = "Player " + pastTurn + " wins!";
                markVisited();
            }

            // makes sure that the reset grid button works between each turn
            let btn = document.getElementById("play");
            btn.onclick = function() {
                    resetGrid();
            };

            if (board_full()) {
                document.getElementById("para").innerHTML = "The game ended in a stalemate";
            }

        } else {
            document.getElementById("para").innerHTML = "Player " + currTurn + "'s Turn!";
        }
    }
}

// changes the player turn
function change_turns()
{
    if (currTurn == "X") {
        currTurn = turn[1];
        return turn[0];
    } else {
        currTurn = turn[0];
        return turn[1];
    }
}

// checks for across, down, and diagonal tic tac toe wins
function check_wins(pastTurn)
{
    if (check_across(pastTurn) || check_down(pastTurn) || check_diagonal(pastTurn)) {
        return true;
    } 
    return false;
}

// checks for horizontal tic tac toe wins
function check_across(pastTurn)
{
    if (pastTurn == boardArray[0] && pastTurn == boardArray[1] && pastTurn == boardArray[2]) {
        return true;
    }

    if (pastTurn == boardArray[3] && pastTurn == boardArray[4] && pastTurn == boardArray[5]) {
        return true;
    }

    if (pastTurn == boardArray[6] && pastTurn == boardArray[7] && pastTurn == boardArray[8]) {
        return true;
    }

    return false;
}

// checks for vertical tic tac toe wins
function check_down(pastTurn)
{
    if (pastTurn == boardArray[0] && pastTurn == boardArray[3] && pastTurn == boardArray[6]) {
        return true;
    }

    if (pastTurn == boardArray[1] && pastTurn == boardArray[4] && pastTurn == boardArray[7]) {
        return true;
    }

    if (pastTurn == boardArray[2] && pastTurn == boardArray[5] && pastTurn == boardArray[8]) {
        return true;
    }

    return false;
}

// checks for diagonal tic tac toe wins
function check_diagonal(pastTurn)
{
    if (pastTurn == boardArray[0] && pastTurn == boardArray[4] && pastTurn == boardArray[8]) {
        return true;
    }

    if (pastTurn == boardArray[2] && pastTurn == boardArray[4] && pastTurn == boardArray[6]) {
        return true;
    }

    return false;
}


// checks if the board is full
function board_full()
{
    let count = 0;

    for (var i = 0; i < 9; i++) {
        if (boardArray[i] == "X" || boardArray[i] == "O") {
            count++;
        }
    }

    if (count == 9) {
        return true;
    }
    
    return false;
}

// resets the grid to its initial state
function resetGrid()
{
    currTurn = turn[0];
    document.getElementById("para").innerHTML = "Player " + currTurn + "'s Turn!";
    
    for (var i = 0; i < 9; i++) {
        boardArray[i] = '';
        gameBoard[i] = '';
        document.getElementById(i).innerHTML = '';

        document.getElementById(i).value = 'notSelected';
    }
}

// marks each button as visited/selected, prevents double clicking on a button
function markVisited()
{
    for (var i = 0; i < 9; i++) {
        if (boardArray[i] === '') {
            document.getElementById(i).value = 'selected';
        }
    }
}
