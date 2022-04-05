<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  type: string,
  player: number
}>()

const count = ref(0)
</script>

<template>
  <div class="card">
    <div class="centerContent">
      <h1>{{ type }}</h1>
      <h1>{{ player }}</h1>
    </div>
  </div>
</template>

<style lang=scss scoped>
$cardSize: 150px;

.card {
  margin: 5px;
  height: $cardSize;
  width: $cardSize;
  border-radius: 20px;
  border: solid black 2px;
  display: inline-flex;
  padding: 30px;
}

.centerContent {
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
}
</style>
