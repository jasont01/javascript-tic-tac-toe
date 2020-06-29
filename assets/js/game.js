let ticTacToe = (() => {

  let board = new Array(9).fill(" ");
  let currentPlayer = "X";
  const winning_lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

  //cacheDom
  let $gameBoard = $('.game-board');
  let $button = $gameBoard.find('.box');
  let $newGame = $('#new-game');
  let alert = document.getElementById('alert');

  //bindEvents
  $button.on('click', validateMove.bind(this));
  $newGame.on('click', newGame.bind(this));

  function validateMove(event) {
    let selected = $(event.target).closest('.box');
    let i = $button.index(selected);
    if (board[i] == " ") {
      board[i] = currentPlayer
      render();
      checkForWinner();
    } else {
      window.alert("Invalid Move");
    };
  };

  function checkForWinner() {
    if (winning_lines.some(line => line.every(i => board[i] == currentPlayer))) {
      gameOver(`${currentPlayer} wins!`);
    } else {
      currentPlayer = (currentPlayer == "X") ? "O" : "X";
    };
    if (board.every(square => square != " ")) gameOver('Tie!');
  };

  function gameOver(msg) {
    $button.off('click');
    alert.innerHTML = msg;
    alert.classList.remove("hidden");
  };

  function newGame() {
    board = new Array(9).fill(" ");
    currentPlayer = "X";
    $button.on('click', validateMove.bind(this));
    alert.classList.add("hidden");
    render();
  }
  
  function render() {
    board.forEach((value, index) => document.getElementById(index).innerHTML = value);
  };

})();
