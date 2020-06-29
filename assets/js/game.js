let ticTacToe = (() => {
  let board = new Array(9).fill(" ");
  let currentPlayer = "X";
  let winning_lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

  render();

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
    let i = $gameBoard.find('.box').index(selected);
    if (board[i] == " ") {
      makeMove(i);
      render();
    } else {
      alert("Invalid Move")
    };
  };

  function makeMove(move) {
    board[move] = currentPlayer
    checkForWinner();
  };

  function checkForWinner() {
    if (board.every(square => square != " ")) tieGame();
    if (winning_lines.some(line => line.every(i => board[i] == currentPlayer))) {
      gameOver();
    } else {
      changePlayer();
    };
  };

  function changePlayer() {
    if (currentPlayer == "X") {
      currentPlayer = "O"
    } else {
      currentPlayer = "X"
    };
  };

  function tieGame() {
    alert.innerHTML = `Tie!`;
    alert.classList.remove("hidden");
  };

  function gameOver() {
    alert.innerHTML = `${currentPlayer} wins!`;
    alert.classList.remove("hidden");
  };

  function render() {
    board.forEach((value, index) => document.getElementById(index).innerHTML = value);
  };

  function newGame() {
    board = new Array(9).fill(" ");
    currentPlayer = "X";
    alert.classList.add("hidden");
    render();
  }

  return { newGame }
});

let game = ticTacToe();