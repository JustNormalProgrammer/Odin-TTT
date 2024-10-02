const Gameboard = function () {
    const board = [];
    let numberOfMarks = 0;
    for (let i = 0; i < 9; i++) {
        board[i] = Cell();
    }

    const getBoard = () => board;
    const printBoard = () => {
        let row = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                row.push(board[i * 3 + j].getValue());
            }
            console.log(row);
            row = [];
        }
    }
    const placeMark = (idx, playerToken) => {
        if (board[idx].getValue() !== 0) {
            console.log("Illegal move, space is occupied by another mark");
            return false;
        } else {
            board[idx].addToken(playerToken);
            numberOfMarks++;
            return true;
        }
    }
    const checkIfDraw = () => {
        for (let cell of board) {
            if (cell.getValue() === 0) {
                return false;
            }
        }
        return true;
    }
    const checkWinner = (playerToken) => {
        // No winner until at least 6th mark
        if (numberOfMarks < 5) {
            return false;
        }
        if (checkIfDraw()) {
            console.log("Game is a draw!");
            return false;
        }
        // Looks awfull, still better than L00ps tho. 
        if (
            (board[3].getValue() == playerToken && board[4].getValue() == playerToken && board[5].getValue() == playerToken) ||
            (board[0].getValue() == playerToken && board[1].getValue() == playerToken && board[2].getValue() == playerToken) ||
            (board[6].getValue() == playerToken && board[7].getValue() == playerToken && board[8].getValue() == playerToken) ||
            (board[0].getValue() == playerToken && board[3].getValue() == playerToken && board[6].getValue() == playerToken) ||
            (board[1].getValue() == playerToken && board[4].getValue() == playerToken && board[7].getValue() == playerToken) ||
            (board[2].getValue() == playerToken && board[5].getValue() == playerToken && board[8].getValue() == playerToken) ||
            (board[0].getValue() == playerToken && board[4].getValue() == playerToken && board[8].getValue() == playerToken) ||
            (board[2].getValue() == playerToken && board[4].getValue() == playerToken && board[6].getValue() == playerToken)
        ) {
            return true;
        } else {
            return false;
        }
    }
    return { getBoard, printBoard, placeMark, checkWinner };
};
function Cell() {
    let value = 0;
    const addToken = (playersToken) => value = playersToken;
    const getValue = () => value;
    return { addToken, getValue };
}
const GameController = function () {
    let gameboard = Gameboard();
    const players = [
        {
            name: "player1",
            score: 0,
            getScore: () => this.score,
            incrementScore: () => this.score++,
            token: 1,
        },
        {
            name: "player2",
            score: 0,
            getScore: () => score,
            incrementScore: () => score++,
            token: 2,
        }
    ];

    let activePlayer = players[0];
    const switchActivePlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn...`);
    }
    const resetGame = () => gameboard = Gameboard();

    const playRound = (idx) => {
        console.log(`Placing ${getActivePlayer().name} mark on ${idx} cell...`);
        let isSuccess = gameboard.placeMark(idx, getActivePlayer().token);
        if (!isSuccess) {
            console.log("exiting round");
            resetGame();
            return;
        }
        if (gameboard.checkWinner(getActivePlayer().token)) {
            console.log(`Congratulations to ${getActivePlayer().name}. You won!`);
            resetGame();
        } else {
            switchActivePlayer();
            printNewRound();
        }
    }
    return { playRound };
}
const ScreenController = function() {
    const game = GameController();
    
}





