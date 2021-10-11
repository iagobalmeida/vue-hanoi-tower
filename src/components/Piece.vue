<template>
    <div
        :class="className"
        :style="style"
    >
    </div>
</template>

<script>
export default {
  name: "Piece",
  props: {
    value:      Number,
    selected:   Boolean,
  },
  computed: {
    className: function() {
        return `shadow mb-1 rounded bg-gradient bg-${this.value} ${this.selected ? 'selected' : ''}`;
    },
    style: function() {
        return `height: 20px; width:${this.value}0%;`;
    }
  }
};
</script>