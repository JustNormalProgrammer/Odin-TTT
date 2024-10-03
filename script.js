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
    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = Cell();
        }
    }
    const checkWinner = (playerToken) => {
        // No winner until at least 6th mark
        if (numberOfMarks < 5) {
            return -1;
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
            return 1;
        } else if(checkIfDraw()){
            return 0;
        }
        return -1;
    }
    return { getBoard, printBoard, placeMark, checkWinner, resetBoard};
};
function Cell() {
    let value = 0;
    const addToken = (playersToken) => value = playersToken;
    const getValue = () => value;
    return { addToken, getValue };
}
const GameController = function () {
    let gameboard = Gameboard();
    let isGameOver = false;
    const players = [
        {
            name: "player1",
            marker: "X",
            score: 0,
            getScore: () => this.score,
            incrementScore: () => this.score++,
            token: 1,
        },
        {
            name: "player2",
            marker: "O",
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
    const resetGame = () => {
        gameboard.resetBoard();
        isGameOver = false;
        activePlayer = players[0];
    }
    const getIsGameOver = () => isGameOver;
    const playRound = (idx) => {
        if(isGameOver) {
            resetGame();
        }
        console.log(`Placing ${getActivePlayer().name} mark on ${idx} cell...`);
        let isSuccess = gameboard.placeMark(idx, getActivePlayer().token);
        if (!isSuccess) {
            console.log("exiting round");
            return -1;
        }
        let gameStatus = gameboard.checkWinner(getActivePlayer().token);
        if (gameStatus === 1) {
            console.log(`Congratulations to ${getActivePlayer().name}. You won!`);
            isGameOver = true;
            return 1;
        } else if(gameStatus === 0) {
            console.log(`It's a Draw!`)
            isGameOver = true;
            return 0;
        } 
        else {
            switchActivePlayer();
            printNewRound();
        }
    }
    return { playRound, getBoard: gameboard.getBoard, getActivePlayer, checkWinner: gameboard.checkWinner, getIsGameOver};
}
const ScreenController = function () {
    const cells = document.querySelectorAll('.cell');
    const cellArray = Array.from(cells);
    const p = document.querySelector('p');

    game = GameController();
    for (let cell of cellArray) {
        cell.addEventListener('click', function () {
            handleClick(this);
        });
    }

    const displayCell = (cell,player) => {
        const board = game.getBoard();
        let classCSS = null;
        classCSS = board[cell.dataset.idx].getValue() === 1 ? "cross" : "circle";
        cell.textContent = player.marker;
        cell.classList.add(classCSS);
    }
    const resetDisplay = () => {
        for(let cell of cellArray) {
            cell.classList.remove('circle', 'cross');
            cell.textContent = '';
            p.textContent = '';
        }
    }

    const handleClick = (cell) => {
        let isGameOver = game.getIsGameOver();
        if(isGameOver) resetDisplay();
        let idx = cell.dataset.idx;
        let activePlayer = game.getActivePlayer();
        let isWinner = game.playRound(idx)
        if(isWinner === 1){
            p.textContent = `Congrats ${game.getActivePlayer().name}! You won!`
        } else if(isWinner === 0){
            p.textContent = `It's a Draw!`;
        }
        if(isWinner !== -1){
            displayCell(cell, activePlayer);
        }
    }
}


ScreenController();



