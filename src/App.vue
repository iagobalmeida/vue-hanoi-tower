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

        <div class="col" v-for="tower, tower_index in towers" :key="`tower_${tower_index}`" v-on:click="handleInput(tower_index+1)">

          <div :class="`p-2 shadow card mb-3 d-none d-md-block ${tower.includes(selected)?`bg-${colors[selected-1]} text-light border-light`: ''}`"  v-on:click="handleInput(tower_index+1)">
            <div class="d-flex justify-content-center align-items-center flex-row">
              <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block">{{tower_index+1}}</div>  
              <div class="d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; {{selected >= 0 ? '⇣' : '⇡'}}</p>
              </div>
            </div>
          </div>
          <div class="card shadow p-md-2 d-flex justify-content-end align-items-center flex-column tower">
            <div v-for="piece, piece_index in tower" :key="`tower_${tower_index}_piece_${piece_index}`" :class="`shadow mb-1 rounded bg-gradient w-${piece}0 bg-${colors[piece-1]} ${selected == piece ? 'selected' : ''}`" style="height:20px;"></div>
          </div>
        </div>

      </div>

      <div class="row g-3 mt-1">

        <div class="col text-center" v-on:click="handleInput(' ')">
          <div class="p-2 shadow card mb-3 d-block ">
            <div class="d-flex justify-content-center align-items-center flex-row">
              <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted w-10 d-none d-md-block">␣</div>  
              <div class="d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; Desfazer último movimento</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row g-3">

        <div class="col text-center" v-on:click="handleInput('A')">
          <div class="p-2 shadow card mb-3 d-block ">
            <div class="d-flex justify-content-center align-items-center flex-row">
              <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block">A</div>  
              <div class="d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; Adicionar torre</p>
                <small class=" fw-light">Reinicia o jogo</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col text-center" v-on:click="handleInput('R')">
          <div class="p-2 shadow card mb-3 d-block ">
            <div class="d-flex justify-content-center align-items-center flex-row">
              <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block">D</div>  
              <div class="d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; Remover Torre</p>
                <small class=" fw-light">Reinicia o jogo</small>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row g-3">

        <div class="col text-center" v-on:click="handleInput('R')">
          <div class="p-2 shadow card mb-3 d-block ">
            <div class="d-flex justify-content-center align-items-center flex-row">
              <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block">R</div>  
              <div class="d-flex justify-content-start align-items-center flex-column">
                <p class="mb-0">&nbsp; Reiniciar o jogo</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="d-flex flex-row justify-content-between align-items-center mt-5 mb-5">
        <div class="col align-items-center d-flex flex-row justify-content-around mb-5" v-for="index in pieces" :key="`color_${index}`">
          <div :class="`bg-${colors[index]} mr-1 bg-gradient rounded shadow`" style="width: 20px; height: 20px;"></div>
          <h5 v-if="index < pieces" class="mr-2 mb-0"> ⇢ </h5>
        </div>
      </div>
  </div>
</template>

<script>

// Generates initial state
function loadData(pieces) {
  return {
    // Tower & Pieces
    pieces: pieces,
    colors: ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark', 'light'],
    towers: [
      Array.from({length: pieces}, (_, i) => i + 1), // returns [1, 2, 3, 4, 5, ... pieces]
      [],
      []
    ],
    // Solution
    solved: false,
    moves:  0,
    // Controls
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
  data: () => (loadData(7)),
  // KeyDown event association
  created() {
    document.addEventListener('keydown', (event) => {
      let key = event.key.toUpperCase();
      if(key != 1 && key != 2 && key != 3 && key != ' ' &&  key != 'A' && key != 'D' && key != 'R') { return; }
      event.preventDefault();
      this.handleInput(key);
    });
  },
  methods: {
    // Reload initial state
    restart() {
      Object.assign(this.$data, loadData(this.pieces));
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
    inputGetPiece(key) {
      this.selected = this.towers[key-1][0];
      this.updateCurrMove('from', key-1);
    },
    // Try to put piece into tower [ true - valid input / false - invalid input ]
    inputPutPiece(key) {
        // If piece is smaller than tower top piece or tower is empty
        if(this.selected < this.towers[key-1][0] || this.towers[key-1].length == 0) {
          this.updateCurrMove('to', key-1);
          // Remove piece from original tower and insert into new tower
          this.towers.find((tower) => (tower.includes(this.selected))).shift();
          this.towers[key-1].unshift(this.selected);
          // Unselect current piece and increment movement
          this.selected = -1;
          this.moves++;
          return true;
        }

        // If tower is origin tower just unselect piece
        if(this.selected == this.towers[key-1][0]){
          this.selected = -1;
          return true;
        }
        
        return false;
    },
    // HandleInput (from keydown and click)
    handleInput(key) {
      // If game solved, do nothing but reset when space is pressed
      if(this.solved) {
        if(key == ' ') {
          this.restart();
        }
        return;
      }

      // Adding pieces
      if(key == 'A') {
        this.pieces = this.pieces < this.colors.length ? this.pieces + 1 : this.pieces;
        return this.restart(); 
      }

      // Removing pieces
      if(key == 'D') {
        this.pieces = this.pieces > 2 ? this.pieces - 1 : this.pieces;
        return this.restart(); 
      }

      // Reseting game
      if(key == 'R') {
        return this.restart(); 
      }

      // Space
      if(key == ' ' && this.lastMoves.length > 0){
        return this.inputUndoStep();
      }

      if(this.selected >= 0) {
        this.inputPutPiece(key);
      }
      else if(this.selected == -1) {
        this.inputGetPiece(key);
      }

      this.verifySolution();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
