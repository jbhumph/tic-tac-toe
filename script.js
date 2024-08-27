const Gameboard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let boardHTML = "";
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>"`
            document.querySelector(.gameBoard).innerHTML = boardHTML;
        })
    }

    return render,
})();

const startButton = document.querySelector("#start-game");
startButton.addEventListener("click", () => {
    // startGame()
})