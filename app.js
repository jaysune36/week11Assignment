// Created const variable for start-btn class.
const startBtn = $('.start-btn');
const playerMenu = $('.player-menu');
const playerInput = $('.player-menu input');
const playerLabel = $('.player-menu label');
const gameBoardLayout = $('.game-board-layout');

function gameboardCreate() {
  let gbDiv = document.createElement('div');
  gbDiv.className = 'game-board';
  let index = 1;
  for(let i=0;i<3;i++) {
    let colDiv = document.createElement('div');
    colDiv.className = `col${i + 1}`
    for(let j=0;j<3;j++){
      let spaceDiv = document.createElement('div');
      spaceDiv.setAttribute('data-index', index);
      colDiv.insertAdjacentElement('beforeend', spaceDiv);
      index++;
    } 
    gbDiv.insertAdjacentElement('beforeend', colDiv)
  }

  return gameBoardLayout.prepend(gbDiv);
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
  // console.log(gbpDiv)
  return gameBoardLayout.prepend(gbpDiv)
  
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
  constructor(name) {
    this.name = name;
    this.tilesHand = [];
  }

  addPlayersTiles() {
    let tiles = new Tiles();
  }
  
}

// GameBoard class will create the gameBoard and add functionality to gameBoard
class GameBoard {
  constructor() {
    this.players = [];
    this.winner;
  }

  gameStart() {

  }

  addPlayers(name) {
    this.players.push(new Player(name));
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
  if(e.target.id === 'player-sb') {
    game.addPlayers(playerInput.val());
    playerLabel.text(`Please enter Player ${game.players.length + 1}`);
    playerInput.val('');
    if(game.players.length === 2) {
      playerMenu.hide();
      $('.game-name').hide();
      gameBoardLayout.show();
      // console.log(gameboardCreate());
      game.addPlayersTiles();
      playerLayout(game.players);
      gameboardCreate()
      // console.log(game.players.length)
    }
  }
});

gameBoardLayout.on('click', (e)=> {
  console.log(e.target)
})