<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import Card from './components/Card.vue';
import { CardDef, CardType, CardTypes } from './helpers/helpers';
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
 * @param boardPos boardPos is between 0 and 15
 */
function onTapCard(boardPos: [number, number], owner: number) {
    return function (direction: any, event: any) {
        console.log(direction, event);
        console.log(...boardPos);
        // do something ~
        if (currentPlayer.value == owner)
            selectedCard.splice(0, 2, ...boardPos);

        // console.log([...selectedCard].every((num, idx) => boardPos[idx] == num), boardPos);

    };
}

const currentPlayer = ref(1);

const selectedCard = reactive([-1, -1]);

function isSelected(boardPos: [number, number]) {
    return [...selectedCard].every((num, idx) => boardPos[idx] == num);
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

function getOwner(card: CardDef) {
    return card.type == CardTypes.Empty ? 0 : (card?.isOpponent ? 2 : 1);
}

/**
 * defined from 0 to 15 
 * boardCells are numbered left to right, top to bottom
 */
const boardSetup: (CardDef)[][] = [
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
    {
        type: CardTypes.Empty
    },
    {
        type: CardTypes.Empty
    },
    {
        isOpponent: true,
        type: CardTypes.Gnu,
    }],
    [{
        isOpponent: false,
        type: CardTypes.Zebra,
    },
    {
        type: CardTypes.Empty
    },
    {
        type: CardTypes.Empty
    },
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

</script>

<template>
    <div v-for="(row, r) in boardSetup">
        <Card
            v-for="(card, c) in row"
            :player="getOwner(card)"
            :type="card?.type ?? 'Empty'"
            :selected="isSelected([c, r])"
            :pos="[c, r]"
            v-touch:tap="onTapCard([c, r], getOwner(card))"
        ></Card>
    </div>
</template>

<style>
</style>
