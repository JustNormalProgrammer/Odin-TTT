const Gameboard = function () {
    const board = [];
    let numberOfMarks = 0;
    for (let i = 0; i < 9; i++) {
        board[i] = Cell();
    }

    const getBoard = () => board;
    const printBoard = () => {
        let row = [];
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                row.push(board[i*3 + j].getValue());
            }
            console.log(row);
            row = [];
        }
    }
    const placeMark = (idx, playerToken) => {
        if(board[idx].getValue !== 0){
            console.log("Illegal move, space is occupied by another mark");
            return -1;
        } else {
            board[idx].addToken(playerToken);
            numberOfMarks++;
            return 1;
        }
    }
    const checkWinner = (playerToken) => {
        if(numberOfMarks < 5) {
            return 0;
        }
        // Looks awfull, still better than L00ps tho. 
        if (
            (board[0] == playerToken && board[1] == playerToken && board[2] == playerToken) ||
            (board[3] == playerToken && board[4] == playerToken && board[5] == playerToken) ||
            (board[6] == playerToken && board[7] == playerToken && board[8] == playerToken) ||
            (board[0] == playerToken && board[3] == playerToken && board[6] == playerToken) ||
            (board[1] == playerToken && board[4] == playerToken && board[7] == playerToken) ||
            (board[2] == playerToken && board[5] == playerToken && board[8] == playerToken) ||
            (board[0] == playerToken && board[4] == playerToken && board[8] == playerToken) ||
            (board[2] == playerToken && board[4] == playerToken && board[6] == playerToken)
            ) {
            return true;
            } else {
            return false;
            }
    }
    return { getBoard, printBoard, placeMark, checkWinner};
};
function Cell(){
    let value = 0;
    const addToken = (playersToken) => value = playersToken;
    const getValue = () => value;
    return {addToken, getValue};
}
const MakeUser = function (name) {
    let score = 0;

    return { name, getScore, incrementScore };
};
const GameController = function () {
    const gameboard = Gameboard();
    const players = [
        {
            name: "player1",
            score: 0,
            getScore: () => this.score,
            incrementScore: () => this.score++,
            token: 1,
        },
        {
            name: "player1",
            score: 0,
            getScore: () => score,
            incrementScore: () => score++,
            token: 2,
        }
    ];

    let activePlayer = players[0];
    const switchActivePlayer = () =>  activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn...`);
    }

    const playRound = (idx) => {
        console.log(`Placing ${getActivePlayer().name}mark on ${idx} cell...`);
        let isSuccess = gameboard.placeMark(idx, getActivePlayer().token);
        while(isSuccess === -1) {
            isSuccess = gameboard.placeMark(idx, getActivePlayer().token);
        }
        if(gameboard.checkWinner(getActivePlayer().token)){
            console.log(`Congratulations to ${getActivePlayer().name}. You won!`);
        } else {
            switchActivePlayer();
            printNewRound();
        }
    }
    return {playRound};
}

let game = GameController();

while(true) {
    let idx = prompt("IDX:")
    game.playRound(idx);
}

