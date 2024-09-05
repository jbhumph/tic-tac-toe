const Gameboard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let boardHTML = "";
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
            document.querySelector(".gameBoard").innerHTML = boardHTML;
        })
        const squares = document.querySelectorAll(".square");
        console.log(squares);
        squares.forEach((square) => {
            square.addEventListener("click", Game.boxClick)
        })
    }

    const renderBanner = (p1, p2, turn, win) => {
        const p1Name = document.querySelector("#pa");
        const p1Char = document.querySelector("#pb");
        const p2Name = document.querySelector("#pd");
        const p2Char = document.querySelector("#pe");
        const status = document.querySelector(".status");
        p1Name.innerHTML = `Name: ${p1.name}`;
        p1Char.innerHTML = `Sign: ${p1.mark}`;
        p2Name.innerHTML = `Name: ${p2.name}`;
        p2Char.innerHTML = `Sign: ${p2.mark}`;

        if (win === 0) {
            if (turn === 0) {
                status.innerText = `${p1.name}'s turn`;
            } else if (turn === 1) {
                status.innerText = `${p2.name}'s turn`;
            }
        } else if (win === 1) {
            if (turn === 0) {
                status.innerText = `${p2.name} Wins!`;
            } else if (turn === 1) {
                status.innerText = `${p1.name} Wins!`;
            }
        } else if (win === 2) {
            status.innerText = "It's a tie!"
        }
    }

    const update = (index, value) => {
        gameBoard[index] = value;
        render();
    };

    const reset = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        render();
    }

    const getGameBoard = () => gameBoard;

    return {
        render,
        renderBanner,
        update,
        reset,
        getGameBoard
    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    let winner;
    let win = 0;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]

        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        Gameboard.renderBanner(players[0], players[1], currentPlayerIndex, win);
    }

    const restart = () => {
        players = [];
        currentPlayerIndex = 0;
        gameOver = false;
        win = 0;


    }

    const boxClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        if (Gameboard.getGameBoard()[index] !== "") {
            return;
        }
        Gameboard.update(index, players[currentPlayerIndex].mark);


        win = checkBoard();
        if (gameOver === true) {
            winner = players[currentPlayerIndex].name;
            console.log(winner);
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        Gameboard.renderBanner(players[0], players[1], currentPlayerIndex, win);
    }

    const checkBoard = () => {
        let board = Gameboard.getGameBoard();
        let caseA = board[0] + board[1] + board[2];
        let caseB = board[3] + board[4] + board[5];
        let caseC = board[6] + board[7] + board[8];
        let caseD = board[0] + board[3] + board[6];
        let caseE = board[1] + board[4] + board[7];
        let caseF = board[2] + board[5] + board[8];
        let caseG = board[0] + board[4] + board[8];
        let caseH = board[6] + board[4] + board[2];
        let rows = [caseA, caseB, caseC, caseD, caseE, caseF, caseG, caseH];
        let winner = 0;
        rows.forEach((row) => {
            if (row === "XXX") {
                gameOver = true;
                winner = 1;
            } else if (row === "OOO") {
                gameOver = true;
                winner = 1;
            }
        })
        if (board.includes("") === false) {
            if (winner === 1) {
                return winner;
            } else {
                winner = 2;
                return winner;
            }
        }

        console.log(caseA);
        return winner;
    }

    return {
        start,
        restart,
        boxClick,
        checkBoard,
    }
})()

const startButton = document.querySelector("#start-game");
const restartButton = document.querySelector("#restart-game");
startButton.addEventListener("click", () => {
    Game.start();
})
restartButton.addEventListener("click", () => {
    Game.restart();
    Game.start();
    Gameboard.reset();
})