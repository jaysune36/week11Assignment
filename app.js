// Created const variable for start-btn class.
const startBtn = $('.start-btn');
const playerMenu = $('.player-menu');
const playerInput = $('.player-menu input');
const playerLabel = $('.player-menu label');

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
      game.addPlayersTiles();
      console.log(game.players)
    }
  }
})