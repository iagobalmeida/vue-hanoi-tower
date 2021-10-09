<template>
  <div class="container mt-5 shadow card">
    <div class="card-body">
      <h4>Hanoi Tower</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    tower: [
      [5, 4, 3, 2, 1],
      [],
      []
    ]
  }),
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
