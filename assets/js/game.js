let ticTacToe = {
  board: new Array(9).fill(" "),
  currentPlayer: "X",
  init: function () {
    this.cacheDom();
    this.bindEvents();
    this.render();
  },
  cacheDom: function () {
    this.$board = $('.game-board');
    this.$button = this.$board.find('.box');
    this.$newgame = $('#new-game');
    this.$alert = document.getElementById('alert');
  },
  bindEvents: function () {
    this.$button.on('click', this.validateMove.bind(this));
    this.$newgame.on('click', this.newGame.bind(this));
  },
  validateMove: function (event) {
    let selected = $(event.target).closest('.box');
    let i = this.$board.find('.box').index(selected);
    if (this.board[i] == " ") {
      this.makeMove(i);
      this.render();
    } else {
      alert("Invalid Move")
    };
  },
  makeMove: function (move) {
    this.board[move] = this.currentPlayer
    this.checkForWinner();
  },
  checkForWinner: function () {
    let winning_lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]];
    if (this.board.every(square => square != " ")) this.tieGame();
    if (winning_lines.some(line => line.every(i => this.board[i] == this.currentPlayer))) {
      this.gameOver();
    } else {
      this.changePlayer();
    };
  },
  changePlayer: function () {
    if (this.currentPlayer == "X") {
      this.currentPlayer = "O"
    } else {
      this.currentPlayer = "X"
    };
  },
  tieGame: function () {
    this.$alert.innerHTML = `Tie!`;
    this.$alert.classList.remove("hidden");
  },
  gameOver: function () {
    this.$alert.innerHTML = `${this.currentPlayer} wins!`;
    this.$alert.classList.remove("hidden");
  },
  render: function () {
    this.board.forEach((value, index) => document.getElementById(index).innerHTML = value);
  },
  newGame: function () {
    this.board = new Array(9).fill(" ");
    this.currentPlayer = "X";
    this.$alert.classList.add("hidden");
    this.render();
  }

};

var game = ticTacToe.init();