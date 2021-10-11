<template>
    <div class="col">
        <div :class="`p-2 shadow card mb-3 d-none d-md-block ${bgColor} text-light border-light`">
            <div class="d-flex justify-content-center align-items-center flex-row">
                <div class="bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block">
                    {{ keyName }}
                </div>
                <div class="d-flex justify-content-start align-items-center flex-column">
                    <p class="mb-0">&nbsp; {{ arrow }}</p>
                </div>
            </div>
        </div>
        <div class="card shadow p-md-2 d-flex justify-content-end align-items-center flex-column tower">
            <Piece
            v-for="(piece, pieceIndex) in pieces"
            :key="`tower_${towerIndex}_piece_${pieceIndex}`"
            :selected="selected == piece"
            :value="piece"
            >
            </Piece>
        </div>
    </div>
</template>

<script>
import Piece from './Piece.vue';

export default {
  name: "Tower",
  components: {
    Piece
  },
  props: {
    towerIndex: Number,
    keyName:        String,
    pieces:     Array,
    selected:   Number,
  },
  computed: {
    bgColor: function() {
        return this.pieces.includes(this.selected) ? `bg-${this.selected}` : '';
    },
    arrow: function() {
        return this.selected >= 0 ? "⇣" : "⇡";
    }
  }
};
</script>