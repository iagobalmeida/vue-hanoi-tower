<template>
    <div class="col">
        <KeyButton
          v-on:handleClick="()=>{}"
          :keyName="`${keyName}`"
          :title="arrow"
          :wrapperClass="bgColor"
        />
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
import KeyButton from './KeyButton.vue';

export default {
  name: "Tower",
  components: {
    Piece,
    KeyButton
  },
  props: {
    towerIndex: Number,
    keyName:    String,
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