<script setup lang="ts">
import Card from './components/Card.vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_random<T>(array: Array<T>): T {
  return array[Math.floor((Math.random()*array.length))];
}

const types = ["Lion", "Rhino", "Giraffe", "Gnu", "Elephant", "Mouse"];

function getRandomType(): string {
    return get_random(types);
}

</script>

<template>
    <div v-for="row in 4">
        <Card v-for="col in 4" :player="getRandomInt(0,2)" :type="getRandomType()"></Card>
    </div>
</template>

<style>
</style>
