// Created const variable for start-btn class.
const startBtn = $('.start-btn');
const playerMenu = $('.player-menu');
const playerInput = $('.player-menu input');
const playerLabel = $('.player-menu label');
const gameBoardLayout = $('.game-board-layout');
const gameOver = $('.game-over');
const gameAnnounce = $('.game-announce');
const secondChance = $('.chance');
let playerIndex = 1;

function gameboardCreate() {
  let gbDiv = document.createElement('div');
  let gameAlert = document.createElement('div');
  gameAlert.className ='game-alert';
  gbDiv.className = 'game-board';
  for(let i=0;i<9;i++) {
      let gameBtn = document.createElement('button');
      gameBtn.setAttribute('data-index', i + 1);
      gameBtn.className = 'game-tile';
      gbDiv.insertAdjacentElement('beforeend', gameBtn);
    } 

  return gameBoardLayout.prepend(gbDiv, gameAlert);
}

function playerLayout(playerArr) {
  let gbpDiv = document.createElement('div');
  gbpDiv.className = `game-board-players`;
  for(let i=0;i<playerArr.length;i++) {
    let playerDiv = document.createElement('div');
    playerDiv.className = `player${i+1} player`
    let p = document.createElement('p');
    p.innerText = playerArr[i].name;
    let ul = document.createElement('ul');
    for(let j=0;j<playerArr[i].tilesHand.length;j++) {
      let li = document.createElement('li');
      li.innerText = playerArr[i].tilesHand[j];
      ul.appendChild(li);
    }
    playerDiv.appendChild(p);
    playerDiv.appendChild(ul);
    gbpDiv.insertAdjacentElement('beforeend', playerDiv)
  }
  return gameBoardLayout.prepend(gbpDiv) 
}

function playerHandUpdate(player) {
  player.tilesHand.pop();
  let activePlayerHndUpdte = document.querySelector(`.player${player.index} ul`);
  activePlayerHndUpdte.removeChild(activePlayerHndUpdte.firstElementChild);
  return activePlayerHndUpdte;
}

// Tiles class will create the X's and O's for each players Tile hand.
class Tiles {
  constructor() {
    this.tiles = {
      tileX: [],
      tileO: []
    }
  }
  // createTiles function does not accept any arguments and will loop through each gametiles array and push to each tiles array within the tiles constructor
  createTiles() {
    let gameTilesX = ['X','X','X','X','X']
    let gameTilesO = ['O','O','O','O','O']
    for(let gameTileX of gameTilesX) {
      this.tiles.tileX.push(gameTileX)
    }
    for(let gameTileO of gameTilesO) {
      this.tiles.tileO.push(gameTileO)
    }
  }
}

// Players class will create each player
class Player {
  // static indexValue = 0;
  constructor(name, index) {
    this.name = name;
    this.tilesHand = [];
    this.tilesClaimed = [];
    this.index = index;
  }
  
}

// GameBoard class will create the gameBoard and add functionality to gameBoard
class GameBoard {
  constructor() {
    this.players = [];
    this.playerTurn;
    this.playerWon = false;
  }

  gameWinCheck(arr) {
    let winningCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    let comboCount = 0;
    for(let i=0;i<winningCombos.length;i++) {
      let winningCombo = winningCombos[i];
      for(let j=0;j<winningCombo.length;j++) {
        if(arr.includes(winningCombo[j])) {
          comboCount++;
        }
      }
      if(comboCount === 3) {
        this.playerWon = true;
        break;
      } else {
        comboCount = 0; 
      }
    }
  }

  addPlayers(name, num) {
    this.players.push(new Player(name, num));
  }

  addPlayersTiles() {
    let gameTiles = new Tiles();
    gameTiles.createTiles();
    this.players[0].tilesHand.push(...gameTiles.tiles.tileX);
    this.players[1].tilesHand.push(...gameTiles.tiles.tileO);
  }
}

let game = new GameBoard();

// Using jquery on the start-btn variable to add an event listener of click.
startBtn.on('click', (e)=> {
  if(e.target !== startBtn) {
    startBtn.hide();
    playerMenu.show();
    playerLabel.text(`Please enter Player ${game.players.length + 1}`);
  }
})

playerMenu.on('click', (e)=> {
  e.preventDefault();
  if(e.target.id === 'player-sb' && playerInput.val() !== '') {
    game.addPlayers(playerInput.val(), playerIndex);
    playerIndex++;
    playerLabel.text(`Please enter Player ${game.players.length + 1}`);
    playerInput.val('');
    if(game.players.length === 2) {
      playerMenu.hide();
      $('.game-name').hide();
      gameBoardLayout.css('display', 'flex');
      game.addPlayersTiles();
      playerLayout(game.players);
      gameboardCreate();
      let message = $('.game-alert')
      game.playerTurn = game.players[0]
      message.text(`${game.playerTurn.name} Turn`);
      message.addClass(`player${game.playerTurn.index}`);
    }
  }
});

gameBoardLayout.on('click', (e)=> {
  if(e.target.className === 'game-tile' && e.target.innerText === '') {
    let message = $('.game-alert');
    let h2 = document.createElement('h2');
    e.target.innerText = `${game.playerTurn.tilesHand[0]}`;
    game.playerTurn.tilesClaimed.push(parseFloat(e.target.getAttribute('data-index')));
    game.gameWinCheck(game.playerTurn.tilesClaimed);
    playerHandUpdate(game.playerTurn)

    if(game.playerWon === true) {
      h2.innerText = `${game.playerTurn.name} Won!`;
      gameAnnounce.css('display', 'flex');
      secondChance.css('display', 'flex');
      gameAnnounce.prepend(h2);
      gameOver.addClass('overlay')
    } else if(game.players[0].tilesClaimed.length + game.players[1].tilesClaimed.length === 9) {
      h2.innerText = `It's a Tie!`;
      gameAnnounce.css('display', 'flex');
      secondChance.css('display', 'flex');
      gameAnnounce.prepend(h2);
      gameOver.addClass('overlay')
    }else {
    message.removeClass(`player${game.playerTurn.index}`);
    if(game.playerTurn.index === 1) {
      game.playerTurn = game.players[1];
    } else {
      game.playerTurn = game.players[0];
    }
    message.text(`${game.playerTurn.name} Turn`);
    message.addClass(`player${game.playerTurn.index}`);
    }
  }
})

gameAnnounce.on('click', (e)=> {
  if(e.target.id === 'main-menu') {
    $('.game-name').show();
    startBtn.show();
    gameBoardLayout.empty();
    gameBoardLayout.css('display', 'none');
    gameOver.removeClass('overlay')
    gameAnnounce.css('display', 'none');
    secondChance.css('display', 'none');
    playerIndex = 1;
    game.players = [];
    game.playerWon = false;
    $('.game-over h2').remove();
  } 
  if(e.target.id === 'play-again') {
    game.playerWon = false;
    for(let player of game.players) {
      player.tilesHand = [];
      player.tilesClaimed = [];
    }
    game.addPlayersTiles();
    gameBoardLayout.empty();
    gameOver.removeClass('overlay');
    gameAnnounce.css('display', 'none');
    secondChance.css('display', 'none');
    $('.game-over h2').remove();
    playerLayout(game.players)
    gameboardCreate();
    let message = $('.game-alert')
    game.playerTurn = game.players[0]
    message.text(`${game.playerTurn.name} Turn`);
    message.addClass(`player${game.playerTurn.index}`);
  }
})