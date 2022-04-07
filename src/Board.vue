<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import Card from './components/Card.vue';
import { CardDef, CardType, CardTypes, Pos } from './helpers/helpers';

/**
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
 */

function getCardOwner(card: CardDef) {
    return card.type == CardTypes.Empty ? 0 : (card?.isOpponent ? 2 : 1);
}

function getCardMoves(card: CardDef, boardPos: Pos) {
    switch (card.type) {
        case CardTypes.Elephant:

            break;

        default:
            break;
    }
}


/**
 * defined from 0 to 15 
 * boardCells are numbered left to right, top to bottom
 */
const boardSetup: (CardDef)[][] = [
    [new CardDef(CardTypes.Elephant, true),
    new CardDef(CardTypes.Lion, true),
    new CardDef(CardTypes.Rhino, true),
    new CardDef(CardTypes.Giraffe, true)],
    [new CardDef(CardTypes.Zebra, true),
    new CardDef(CardTypes.Empty),
    new CardDef(CardTypes.Empty),
    new CardDef(CardTypes.Gnu, true)],
    [new CardDef(CardTypes.Zebra, false),
    new CardDef(CardTypes.Empty),
    new CardDef(CardTypes.Empty),
    new CardDef(CardTypes.Gnu, false)],
    [new CardDef(CardTypes.Elephant, false),
    new CardDef(CardTypes.Lion, false),
    new CardDef(CardTypes.Rhino, false),
    new CardDef(CardTypes.Giraffe, false)],
]


</script>

<template>
    <div v-for="(row, r) in boardSetup">
        <Card
            v-for="(card, c) in row"
            :player="getCardOwner(card)"
            :type="card?.type ?? 'Empty'"
            :selected="isSelected([c, r])"
            :pos="[c, r]"
            v-touch:tap="onTapCard([c, r], getCardOwner(card))"
        ></Card>
    </div>
</template>

<style>
</style>
