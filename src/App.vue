<template>
  <div class="container mt-5">

      <h3 class="text-center mb-0">Hanoi Tower</h3>
      <p class="text-center mb-5  fw-normal">{{moves}} movimentos</p>

      <div class="bg-primary bg-gradient p-4 shadow text-center rounded mb-5" :style="`transition: all 250ms ease-in-out; ${solved?'height: 250px':'height: 0px; padding: 0px !important; overflow:hidden'};`">
        <h3 class="mb-0">Parabéns!</h3>
        <p class="mb-0">Você solucionou o desafio com {{pieces}} peças!</p>
        <p><b>As peças foram movidas {{moves}} vezes</b></p>
        <h2 class="text-white fw-bold mb-4">
          <span :style="`filter: invert(${moves > (Math.pow(2, pieces) - 1)*1.7 ? '1' : '0'}`"> ⭐ </span>
          <span :style="`filter: invert(${moves > (Math.pow(2, pieces) - 1)*1.5 ? '1' : '0'}`"> ⭐ </span>
          <span :style="`filter: invert(${moves > (Math.pow(2, pieces) - 1)*1.3 ? '1' : '0'}`"> ⭐ </span>
          <span :style="`filter: invert(${moves > (Math.pow(2, pieces) - 1)*1.1 ? '1' : '0'}`"> ⭐ </span>
          <span :style="`filter: invert(${moves > Math.pow(2, pieces) - 1 ? '1' : '0'}`"> ⭐ </span>
        </h2>
        <div class="d-flex justify-content-center align-items-center flex-row" v-on:click="restart">
          <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted w-10 d-none d-md-block">␣</div>  
          <div class="d-flex justify-content-start align-items-center flex-column">
            <p class="mb-0">&nbsp; Reiniciar o jogo</p>
          </div>
        </div>
      </div>

      <div class="row  g-1 g-md-3">
        <Tower
          v-for="tower, towerIndex in towers"
          :key="`tower_${towerIndex}`"
          v-on:click="handleInput(keys.towers[towerIndex])"
          :keyName="keys.towers[towerIndex] == ' ' ? '␣' : keys.towers[towerIndex]"
          :pieces="tower"
          :selected="selected"
          :towerIndex="towerIndex"
        ></Tower>
      </div>

      <div class="row g-3 mt-1">

        <div class="col text-left">
          <div class="p-2 mb-3 d-block">
            <div class="d-flex justify-content-start align-items-center flex-row-reverse overflow-auto w-100">
              <small class="px-4 py-1 rounded-pill bg-light shadow text-muted fs-6 m-2" v-for="movement, movement_index in lastMoves" :key="`movement_${movement_index}`">
                {{towerNames[movement.from]}} ⇢ {{towerNames[movement.to]}}
              </small>
            </div>
          </div>
        </div>

      </div>

      <div class="row g-3 mt-1">

        <div class="col text-center" v-on:click="handleInput(keys.undoMovement)">
          <div class="p-2 shadow card mb-3 d-block ">
            <div class="d-flex justify-content-center align-items-center flex-row">
              <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted w-10 d-none d-md-block">
                {{keys.undoMovement == ' ' ? '␣' : keys.undoMovement}}  
              </div>  
              <div class="d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; Desfazer último movimento</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row g-3">

        <div class="col text-center" v-on:click="handleInput(keys.addTower)">
          <div class="p-2 shadow card mb-3 d-block ">
            <div class="d-flex justify-content-center align-items-center flex-row">
              <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block">
                {{keys.addTower == ' ' ? '␣' : keys.addTower}}  
              </div>  
              <div class="d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; Adicionar torre</p>
                <small class=" fw-light">Reinicia o jogo</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col text-center" v-on:click="handleInput(keys.deleteTower)">
          <div class="p-2 shadow card mb-3 d-block ">
            <div class="d-flex justify-content-center align-items-center flex-row">
              <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block">
                {{keys.deleteTower == ' ' ? 'D' : keys.deleteTower}}                  
              </div>  
              <div class="d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; Remover Torre</p>
                <small class=" fw-light">Reinicia o jogo</small>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row g-3 align-items-stretch mb-3">

        <div class="h-100 col text-center" v-on:click="handleInput(keys.resetGame)">
          <div class="h-100 p-2 shadow card d-block ">
            <div class="h-100 d-flex justify-content-center align-items-center flex-row">
              <div class="h-100 bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block">
                {{keys.resetGame == ' ' ? '␣' : keys.resetGame}}    
              </div>  
              <div class="h-100 d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; Reiniciar o jogo</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col text-center" data-bs-toggle="modal" data-bs-target="#configModal">
          <div class="h-100 p-2 shadow card d-block ">
            <div class="h-100 d-flex justify-content-center align-items-center flex-column">
              <p class="mb-0">Configurar Atalhos</p>
            </div>
          </div>
        </div>

        <!-- Modal Atalhos -->
        <div class="modal fade" id="configModal" tabindex="-1" aria-labelledby="configModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content card shadow">
              <div class="modal-header">
                <h5 class="modal-title" id="configModalLabel">Atalhos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3 form-group">
                  <label>Selecionar/Posicionar Torre Esquerda</label>
                  <input class="form-control card" type="text" minlength="1" maxlength="1" v-model="keys.towers[0]">
                </div>
                <div class="mb-3 form-group">
                  <label>Selecionar/Posicionar Torre Centro</label>
                  <input class="form-control card" type="text" minlength="1" maxlength="1" v-model="keys.towers[1]">
                </div>
                <div class="mb-3 form-group">
                  <label>Selecionar/Posicionar Torre Direita</label>
                  <input class="form-control card" type="text" minlength="1" maxlength="1" v-model="keys.towers[2]">
                </div>
                <div class="mb-3 form-group">
                  <label>Desfazer movimento</label>
                  <input class="form-control card" type="text" minlength="1" maxlength="1" v-model="keys.undoMovement">
                </div>
                <div class="mb-3 form-group">
                  <label>Adicionar peça</label>
                  <input class="form-control card" type="text" minlength="1" maxlength="1" v-model="keys.addTower">
                </div>
                <div class="mb-3 form-group">
                  <label>Remover peça</label>
                  <input class="form-control card" type="text" minlength="1" maxlength="1" v-model="keys.deleteTower">
                </div>
                <div class="mb-3 form-group">
                  <label>Reiniciar o jogo</label>
                  <input class="form-control card" type="text" minlength="1" maxlength="1" v-model="keys.resetGame">
                </div>
              </div>
              <div class="modal-footer d-flex justify-content-between flex-row align-items-center">
                <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-light btn-sm" v-on:click="setDefaultKeys">Voltar ao padrão</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="d-flex flex-row justify-content-between align-items-center mt-5 mb-5">
        <div class="col align-items-center d-flex flex-row justify-content-around mb-5" v-for="index in pieces" :key="`color_${index}`">
          <div :class="`bg-${index+1} mr-1 bg-gradient rounded shadow`" style="width: 20px; height: 20px;"></div>
          <h5 v-if="index < pieces" class="mr-2 mb-0"> ⇢ </h5>
        </div>
      </div>
  </div>
</template>

<script>
import Tower from './components/Tower.vue';

// Default hotkeys mapping
function defaultKeys(tryLocalStorage = false) {
  let keys = {
    towers:       ['1','2','3'],
    addTower:     'A',
    deleteTower:  'D',
    undoMovement: ' ',
    resetGame:    'R'
  }
  return tryLocalStorage ? (JSON.parse(localStorage.getItem('keys')) || keys) : keys;
}

// Generates initial state
function loadData(pieces, keys) {
  return {
    // Tower & Pieces
    pieces: pieces,
    towerNames: ['Left', 'Center', 'Right'],
    towers: [
      Array.from({length: pieces}, (_, i) => i + 1), // returns [1, 2, 3, 4, 5, ... pieces]
      [],
      []
    ],
    // Solution
    solved: false,
    moves:  0,
    // Controls
    keys,
    lastMoves:  [],
    selected:   -1,
    currMove:   {
      from: -1,
      to:   -1
    },
  }
}

export default {
  name: 'Hanoi Tower',
  components: {
    Tower
  },
  data: () => (loadData(7, defaultKeys())),
  // KeyDown event association
  created() {
    document.addEventListener('keydown', (event) => {
      let key           = event.key.toUpperCase();
      let possibleKeys  = Object.values(this.keys).concat(Object.values(this.keys.towers));
      let isModalOpen   = document.getElementById('configModal').className.includes('show');
      if(possibleKeys.findIndex((commandKey) => (commandKey == key)) >= 0 && !isModalOpen) {
        event.preventDefault();
        this.handleInput(key);
      }
    });
  },
  methods: {
    setDefaultKeys() {
      this.keys = defaultKeys();
    },
    // Reload initial state
    restart() {
      Object.assign(this.$data, loadData(this.pieces, this.keys));
    },
    // Check if game is solved
    verifySolution() {
      if(this.towers[1].length == this.pieces || this.towers[2].length == this.pieces) {
        this.solved = true;
      }
    },
    updateCurrMove(key, value) {
      this.currMove[key] = value;
      if(key == 'to'){
          this.lastMoves.unshift(Object.assign({}, this.currMove));
          this.currMove = { from: -1, to: -1 };
      }
    },
    inputUndoStep(){
      if(this.lastMoves[0].from >= 0 && this.lastMoves[0].to >= 0){
        this.towers[this.lastMoves[0].from].unshift(this.towers[this.lastMoves[0].to].shift());
        this.lastMoves.shift();
        this.moves--;
      }
    },
    inputGetPiece(towerId) {
      this.selected = this.towers[towerId][0];
      this.updateCurrMove('from', towerId);
    },
    // Try to put piece into tower [ true - valid input / false - invalid input ]
    inputPutPiece(towerId) {
        // If piece is smaller than tower top piece or tower is empty
        if(this.selected < this.towers[towerId][0] || this.towers[towerId].length == 0) {
          this.updateCurrMove('to', towerId);
          // Remove piece from original tower and insert into new tower
          this.towers.find((tower) => (tower.includes(this.selected))).shift();
          this.towers[towerId].unshift(this.selected);
          // Unselect current piece and increment movement
          this.selected = -1;
          this.moves++;
          return true;
        }

        // If tower is origin tower just unselect piece
        if(this.selected == this.towers[towerId][0]){
          this.selected = -1;
          return true;
        }
        
        return false;
    },
    // HandleInput (from keydown and click)
    handleInput(key) {
      // If game solved, do nothing but reset when space is pressed
      if(this.solved) {
        if(key == this.keys.undoMovement) {
          this.restart();
        }
        return;
      }

      // Adding pieces
      if(key == this.keys.addTower) {
        this.pieces = this.pieces < 10 ? this.pieces + 1 : this.pieces;
        return this.restart(); 
      }

      // Removing pieces
      if(key == this.keys.deleteTower) {
        this.pieces = this.pieces > 2 ? this.pieces - 1 : this.pieces;
        return this.restart(); 
      }

      // Reseting game
      if(key == this.keys.resetGame) {
        return this.restart(); 
      }

      // Space
      if(key == this.keys.undoMovement && this.lastMoves.length > 0){
        this.selected = -1;
        return this.inputUndoStep();
      }

      let towerIndex = Object.values(this.keys.towers).indexOf(key);

      if(this.selected >= 0) {
        this.inputPutPiece(towerIndex);
      }
      else if(this.selected == -1) {
        this.inputGetPiece(towerIndex);
      }

      this.verifySolution();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
