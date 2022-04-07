<script setup lang="ts">
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import Board from './Board.vue';
</script>

<template>
  <Board>
  </Board>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
  margin-left: 30px;
}

.j-left {
  display: flex;
  justify-content: start;
}
</style>
