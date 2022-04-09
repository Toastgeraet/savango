<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import Card from './components/Card.vue';
import { Add, CardDef, CardType, CardTypes, IntersectingPos, Pos } from './helpers/helpers';

function onTapCard(boardPos: Pos) {
    return function (direction: any, event: any) {
        const card = getCard(boardPos);
        //console.log(boardPos, card);

        const target = validMoveTargets.find(p => [...p].every((num, idx) => boardPos[idx] == num));
        if (target) {
            const sourceIdx = selectedCard[0] + selectedCard[1] * 4;
            const targetIdx = boardPos[0] + boardPos[1] * 4;
            const flatBoard = boardState.flat();
            let temp = flatBoard[targetIdx];
            flatBoard[targetIdx] = flatBoard[sourceIdx];
            flatBoard[sourceIdx] = temp;

            boardState.splice(0, boardState.length, ...chunkArray(flatBoard, 4));

            selectedCard.splice(0, 2, -1, -1);
            validMoveTargets.splice(0, validMoveTargets.length);
            return;
        }

        if ([...selectedCard].every((num, idx) => boardPos[idx] == num)) {
            selectedCard.splice(0, 2, -1, -1);
            validMoveTargets.splice(0, validMoveTargets.length);
            return;
        }

        if (currentPlayer.value == getCardOwner(card)) {
            selectedCard.splice(0, 2, ...boardPos);
            validMoveTargets.splice(0, validMoveTargets.length, ...getCardMoves(card, boardPos))
            // console.log(getCardMoves(card, boardPos))
            // console.log(validMoveTargets);
            return;
        }

    };
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    return array.reduce((resultArray: T[][], item: T, index) => {
        const chunkIndex = Math.floor(index / chunkSize)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray;
    }, [])
}

const currentPlayer = ref(1);

const selectedCard = reactive([-1, -1]);
const validMoveTargets = reactive([] as Pos[])

function getCard(pos: Pos) {
    return boardState[pos[1]][pos[0]];
}

function isValidMoveTarget(boardPos: Pos): boolean {
    return validMoveTargets.some(p => [...p].every((num, idx) => boardPos[idx] == num));
}

function isSelected(boardPos: Pos): boolean {
    return [...selectedCard].every((num, idx) => boardPos[idx] == num);
}

function getCardOwner(card: CardDef) {
    return card.type == CardTypes.Empty ? 0 : (card?.isOpponent ? 2 : 1);
}

function getCardMoves(card: CardDef, cardPos: Pos): Pos[] {
    return card.getMoves().map(moveVector => Add(cardPos, moveVector)).filter(targetPos => {

        if (!targetPos.every(i => i >= 0 && i < 4)) {
            return false;
        };


        const targetCard = getCard(targetPos);
        if (!(targetCard.type == CardTypes.Empty || (targetCard.isOpponent ?? false))) {
            return false;
        }

        //console.log("getMoves", cardPos, targetPos);

        const jumpPos = IntersectingPos(cardPos, targetPos);
        const jumpCard = getCard(jumpPos);
        if (jumpCard !== targetCard) {
            if (!(jumpCard.type == CardTypes.Empty)) {
                return false;

            }
        }

        return true;
    });
}

const boardState: (CardDef)[][] = reactive([
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
]);

// setInterval(()=>{
//     let tmp = boardState[3][0];
//     boardState[3][0] = boardState[3][3]
//     boardState[3][3] = tmp
// }, 3000)


</script>

<template>
    <div v-for="(row, r) in boardState">
        <Card
            v-for="(card, c) in row"
            :player="getCardOwner(card)"
            :type="card.type"
            :selected="isSelected([c, r])"
            :target="isValidMoveTarget([c, r])"
            :pos="[c, r]"
            v-touch:tap="onTapCard([c, r])"
        ></Card>
    </div>
</template>

<style>
</style>
