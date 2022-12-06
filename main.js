// 0 - Empty, 1 - x, 2 - o
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
blockNewMoves = false;

function makeMove(move) {
    // Accept player move
    // Write move to the page if possible, then make ai move
    if (board[move] == 0 && blockNewMoves == false) {
        // player move
        board[move] = 1;
        document.getElementById("board" + move).innerHTML = "X";

        // ai move
        makeDrawOrWin();
        if (document.getElementById("div1").innerHTML == "") {
            let aiMove = minMax();
            board[aiMove] = 2;
            document.getElementById("board" + aiMove).innerHTML = "O";
        }
        makeDrawOrWin();
    }

}

function makeDrawOrWin() {
    // write draw or win to the page if possible 
    // draw
    if (checkForDraw() == true)
        document.getElementById("div1").innerHTML = "Draw";

    // wins
    if (checkForWins() == 1)
        document.getElementById("div1").innerHTML = "X Wins";
    if (checkForWins() == 2)
        document.getElementById("div1").innerHTML = "O Wins";

    if (document.getElementById("div1").innerHTML != "")
        blockNewMoves = true;
}

function checkForWins() {
    // check for all winning positions
    // 0 - no wins, 1 - x wins, 2 - o wins

    // split x and o to separate boards
    let boardX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let boardO = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < board.length; i++) {
        if (board[i] == 1)
            boardX[i] = 1;
        if (board[i] == 2)
            boardO[i] = 2;
    }

    // horizontal
    for (let i = 0; i < 9; i = i + 3) {
        if (boardX[i] + boardX[i + 1] + boardX[i + 2] == 3)
            return 1;
        if (boardO[i] + boardO[i + 1] + boardO[i + 2] == 6)
            return 2;
    }

    // vertical
    for (let i = 0; i < 3; i++) {
        if (boardX[i] + boardX[i + 3] + boardX[i + 6] == 3)
            return 1;
        if (boardO[i] + boardO[i + 3] + boardO[i + 6] == 6)
            return 2;
    }

    // diagonals
    if (boardX[0] + boardX[4] + boardX[8] == 3)
        return 1;
    if (boardO[0] + boardO[4] + boardO[8] == 6)
        return 2;
    if (boardX[2] + boardX[4] + boardX[6] == 3)
        return 1;
    if (boardO[2] + boardO[4] + boardO[6] == 6)
        return 2;

    return 0;
}

function checkForDraw() {
    // checks for draws by checking if all board positions are filled
    // inevitable draws are not checked for
    for (let i = 0; i < board.length; i++)
        if (board[i] == 0)
            return false;

    return true;
}

function clearBoard() {
    // clears the board for a new game
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < board.length; i++) {
        document.getElementById("board" + i).innerHTML = ""
    }
    document.getElementById("div1").innerHTML = "";
    blockNewMoves = false;
}

function minMax() {
    // alternates between finding the best move for x and best move for o
    // returns overall best move for x
    let score = -100;
    let bestMove;

    // play middle if blank
    if (board[4] == 0)
        return 4;

    for (let i = 0; i < board.length; i++)
        if (board[i] == 0) {
            // call recursive for each board positon, change and reset board positon
            board[i] = 1;
            let currentScore = recMinMax(1);
            board[i] = 0;

            if (currentScore > score) {
                score = currentScore;
                bestMove = i;
            }
        }

    return bestMove;
}

function recMinMax(color) {
    // recursive function for minMax
    // color: 1 - x, 2 - o

    let result = checkForWins(board);
    if (result != 1 || result != 2)
        return result;

    // init score for color
    let score;
    if (color == 1)
        score = -100;
    else
        score = 100;

    for (let i = 0; i < board.length; i++)
        if (board[i] == 0) {
            // find best move, change and reset board positon
            board[i] = color;

            if (color == 1)
                score = Math.max(recMinMax(2));
            else
                score = Math.min(recMinMax(1));

            board[i] = 0;
        }

    return score;
}

