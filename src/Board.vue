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
    return array[Math.floor((Math.random() * array.length))];
}

/**
 * 
 * z     g
 * e l r g
 * 
 * zebra ur ul dr dl
 * gnu u d l r
 * elephant uu dd ll rr
 * lion u d l r ur ul dr dl
 * rhino uu dd ll rr ur ul dr dl
 * giraffe u urur ulul drdr dldl
 * 
 * gazelle
 * 
 */

const types = ["Lion", "Rhino", "Giraffe", "Gnu", "Elephant", "Zebra"];

type CardType = "Lion" | "Rhino" | "Giraffe" | "Gnu" | "Elephant" | "Zebra"
enum CardTypes {
    Lion = "Lion",
    Rhino = "Rhino",
    Giraffe = "Giraffe",
    Gnu = "Gnu",
    Elephant = "Elephant",
    Zebra = "Zebra",
}

/**
 * defined from 0 to 15 
 * boardCells are numbered left to right, top to bottom
 */
const boardSetup: ({ isOpponent: boolean, type: CardType } | null)[][] = [
    [{
        isOpponent: true,
        type: CardTypes.Elephant,
    },
    {
        isOpponent: true,
        type: CardTypes.Lion,
    },
    {
        isOpponent: true,
        type: CardTypes.Rhino,
    },
    {
        isOpponent: true,
        type: CardTypes.Giraffe,
    }],
    [{
        isOpponent: true,
        type: CardTypes.Zebra,
    },
        null,
        null,
    {
        isOpponent: true,
        type: CardTypes.Gnu,
    }],
    [{
        isOpponent: false,
        type: CardTypes.Zebra,
    },
        null,
        null,
    {
        isOpponent: false,
        type: CardTypes.Gnu,
    }],
    [{
        isOpponent: false,
        type: CardTypes.Elephant,
    },
    {
        isOpponent: false,
        type: CardTypes.Lion,
    },
    {
        isOpponent: false,
        type: CardTypes.Rhino,
    },
    {
        isOpponent: false,
        type: CardTypes.Giraffe,
    }],
]

function getRandomType(): string {
    return get_random(types);
}


</script>

<template>
    <div v-for="row in boardSetup">
        <Card
            v-for="card in row"
            :player="card == null ? 0 : (card?.isOpponent ? 2 : 1)"
            :type="card?.type ?? 'Empty'"            
        ></Card>
    </div>
</template>

<style>
</style>
