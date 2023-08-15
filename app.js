const startBtn = $('.start-btn');

class Tiles {
  constructor() {
    this.tiles = {
      tileX: [],
      tileO: []
    }
  }

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


class Player {

}

class GameBoard {

}

startBtn.on('click', (e)=> {
  
  if(e.target !== startBtn) {
    $('.game-name').hide();
    startBtn.hide();
  }
})