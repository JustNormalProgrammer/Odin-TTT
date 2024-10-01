const gameboard = (function(){
    const board = [];
    for(let i = 0; i < 9; i++){
        board[i] = null;
    }
    const getBoard = () => board;
})();
const makeUser = function(name){
    let score = 0;
    const getScore = () => score;
    const incrementScore = () => score++;
    return {name, getScore, incrementScore};
};