<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import Card from './components/Card.vue';
import { Add, CardDef, CardType, CardTypes, Pos } from './helpers/helpers';

function onTapCard(boardPos: [number, number], card: CardDef) {
    return function (direction: any, event: any) {
        // console.log(direction, event);
        // console.log(...boardPos);

        if (currentPlayer.value == getCardOwner(card)) {
            selectedCard.splice(0, 2, ...boardPos);
            validMoveTargets.splice(0, validMoveTargets.length, ...getCardMoves(card, boardPos))
            console.log(getCardMoves(card, boardPos))
            console.log(validMoveTargets);
        }

    };
}

const currentPlayer = ref(1);

const selectedCard = reactive([-1, -1]);
const validMoveTargets = reactive([] as Pos[])

function isValidMoveTarget(boardPos: Pos): boolean {
    return validMoveTargets.some(p => [...p].every((num, idx) => boardPos[idx] == num));
}

function isSelected(boardPos: Pos): boolean {
    return [...selectedCard].every((num, idx) => boardPos[idx] == num);
}

function getCardOwner(card: CardDef) {
    return card.type == CardTypes.Empty ? 0 : (card?.isOpponent ? 2 : 1);
}

function getCardMoves(card: CardDef, boardPos: Pos): Pos[] {
    return card.getMoves().map(moveVector => Add(boardPos, moveVector)).filter(p => p.every(i => i >= 0 && i < 4));
}

const boardState: (CardDef)[][] = [
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
    <div v-for="(row, r) in boardState">
        <Card
            v-for="(card, c) in row"
            :player="getCardOwner(card)"
            :type="card?.type ?? 'Empty'"
            :selected="isSelected([c, r])"
            :target="isValidMoveTarget([c, r])"
            :pos="[c, r]"
            v-touch:tap="onTapCard([c, r], card)"
        ></Card>
    </div>
</template>

<style>
</style>
