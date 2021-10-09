<template>
  <div class="container mt-5">

      <h3 class="text-center mb-0">Hanoi Tower</h3>
      <p class="text-center mb-5 text-muted fw-normal">{{moves}} movimentos</p>

      <div class="bg-primary bg-gradient p-4 shadow text-center rounded mb-5" :style="`transition: all 250ms ease-in-out; ${solved?'height: 250px':'height: 0px; padding: 0px !important; overflow:hidden'};`">
        <h3 class="mb-0">Parabéns!</h3>
        <p class="mb-0">Você solucionou o desafio com 7 peças!</p>
        <p><b>As peças foram movidas {{moves}} vezes</b></p>
        <h2 class="text-white fw-bold mb-4">
          <span :style="`filter: invert(${moves > 200 ? '1' : '0'}`"> ⭐ </span>
          <span :style="`filter: invert(${moves > 180 ? '1' : '0'}`"> ⭐ </span>
          <span :style="`filter: invert(${moves > 160 ? '1' : '0'}`"> ⭐ </span>
          <span :style="`filter: invert(${moves > 140 ? '1' : '0'}`"> ⭐ </span>
          <span :style="`filter: invert(${moves > 130 ? '1' : '0'}`"> ⭐ </span>
        </h2>
        <button class="btn btn-sm btn-outline-light" v-on:click="restart">
          Jogar novamente
        </button>
      </div>

      <div class="row  g-1 g-md-3">

        <div class="col" v-for="tower, tower_index in towers" :key="`tower_${tower_index}`" v-on:click="handleInput(tower_index+1)">
          <span :class="`p-2 shadow card mb-3 d-none d-md-block ${tower.includes(selected)?`bg-${colors[selected-1]} text-light border-light`: 'text-muted'}`">Pressione <b>{{tower_index+1}}</b> para {{selected > 0 ? 'posicionar' : 'selecionar'}}</span>
          <div class="card shadow p-md-2 d-flex justify-content-end align-items-center flex-column tower">
            <div v-for="piece, piece_index in tower" :key="`tower_${tower_index}_piece_${piece_index}`" :class="`shadow mb-1 rounded bg-gradient w-${piece}0 bg-${colors[piece-1]} ${selected == piece ? 'selected' : ''}`" style="height:20px;"></div>
          </div>
        </div>

      </div>

      <div class="row g-3 mt-1">
        <div class="col text-center" v-on:click="handleInput(' ')">
          <span class="p-2 shadow card mb-3 d-block text-muted">Pressione <b>Espaço</b> para voltar</span>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-between align-items-center mt-5 mb-5">
        <div class="col align-items-center d-flex flex-row justify-content-around mb-5" v-for="color, index in colors" :key="`color_${index}`">
          <div :class="`bg-${color} mr-1 bg-gradient rounded shadow`" style="width: 20px; height: 20px;"></div>
          <h5 v-if="index < colors.length - 1" class="mr-2 mb-0"> ⇢ </h5>
        </div>
      </div>
  </div>
</template>

<script>

// Estado inicial dos dados
function loadData() {
  return {
    colors: ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark', 'dark'],
    towers: [
      [1, 2, 3, 4, 5, 6, 7],
      [],
      []
    ],
    moves: 0,
    solved: false,
    selected: -1,
    currMove: {
      from: -1,
      to: -1
    },
    lastMoves: [
      {
        from: -1,
        to: -1
      }
    ]
  }
}

export default {
  name: 'HelloWorld',
  data: () => (loadData()),
  // Ao inicializar associe evento de pressionar tecla
  created() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    // Recarrega o estado inicial
    restart() {
      Object.assign(this.$data, loadData());
    },
    // Verifica se foi solucionado
    verifySolution() {
      // Se a torre 1 ou 2 possuem 7 peças
      if(this.towers[1].length == 7 || this.towers[2].length == 7) {
        this.solved = true;
      }
    },
    // Ao pressionar uma tecla
    handleKeyDown(event) {
      // Recebendo entrada do usuário
      let key = event.key;
      this.handleInput(key);
    },
    handleInput(key) {
      // Caso não seja nenhuma das teclas mapeadas - return;
      if(key != 1 && key != 2 && key != 3 && key != ' ') { return; }
      // Caso seja ESPAÇO e não seja o primeiro movimento
      if(key == ' ' && this.lastMoves.length > 0){
        // Caso possua uma posição inicial e final no ultimo movimento
        if(this.lastMoves[0].from >= 0 && this.lastMoves[0].to >= 0){
          // Mova a peça da posição final para a inicial do ultimo movimento
          this.towers[this.lastMoves[0].from].unshift(this.towers[this.lastMoves[0].to].shift());
          // Remova o ultimo movimento
          this.lastMoves.shift();
          // Desconte 1 movimento
          this.moves--;
        }
        // return;
        return;
      }
      // Caso possua uma peça selecionada para mover
      if(this.selected > 0){
        // Se a peça é menor que a primeira peça da torre selecionada ou a torre estiver vazia
        if(this.selected < this.towers[key-1][0] || this.towers[key-1].length == 0) {
          // Insira na lista de movimentos o movimento atual com a torre selecionada como posição final
          this.currMove.to = key-1;
          this.lastMoves.unshift(Object.assign({}, this.currMove));
          // Remova a peça selecionada da sua torre de origem
          this.towers.find((tower) => (tower.includes(this.selected))).shift();
          // Insira na torre selecionada
          this.towers[key-1].unshift(this.selected);
          // Defina que não há peça selecionada
          this.selected = -1;
          // Incremente um movimento
          this.moves++;
        // Caso esteja posicionando a peça sobre sua torre de origem
        }else if(this.selected == this.towers[key-1][0]){
          // Defina que não há peça selecionada
          this.selected = -1;
        }
      }else{
        // Selecione a primeira peça da torre selecionada
        this.selected = this.towers[key-1][0];
        // Defina a posição inicial do movimento atual como a torre selecionada
        this.currMove.from = key-1;
      }
      // Verifique se foi solucionado
      this.verifySolution();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
