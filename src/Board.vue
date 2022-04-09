<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import Card from "./components/Card.vue";
import {
    Add,
    CardDef,
    CardTypes,
    IntersectingPos,
    Player,
    Pos,
    Same,
} from "./helpers/helpers";

function onTapCard(tappedPos: Pos) {
    return function (direction: any, event: any) {
        const card = getCard(tappedPos);

        const tappedATarget = validMoveTargets.find((p) => Same(p, tappedPos));
        if (tappedATarget) {

            // Flattening the board makes it easier to manipulate
            const flatBoard = boardState.flat();

            // Calculate flat indices
            const sourceIdx = activePos[0] + activePos[1] * 4;
            const targetIdx = tappedPos[0] + tappedPos[1] * 4;

            const targetCard = getCard(tappedPos);

            // If opponent, replace with empty card
            if (isOpponent(targetCard)) {
                lastCardTaken.value = flatBoard[targetIdx];
                flatBoard[targetIdx] = new CardDef(CardTypes.Empty, Player.None);
            }

            // Swap active and target cards
            let temp = flatBoard[targetIdx];
            flatBoard[targetIdx] = flatBoard[sourceIdx];
            flatBoard[sourceIdx] = temp;


            // Recreate original board dimensions
            boardState.splice(0, boardState.length, ...chunkArray(flatBoard, 4));

            resetSelectionMarkers();

            passTurn();
            return;
        }

        if (Same(activePos, tappedPos)) {
            resetSelectionMarkers();
            return;
        }

        if (isPlayer(card)) {
            const moves = getCardMoves(card, tappedPos);
            activePos.splice(0, 2, ...tappedPos);
            validMoveTargets.splice(0, validMoveTargets.length, ...moves);
            return;
        }
    };
}

function resetSelectionMarkers() {
    activePos.splice(0, 2, -1, -1);
    validMoveTargets.splice(0, validMoveTargets.length);
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    return array.reduce((resultArray: T[][], item: T, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
}

function getPlayerName(pl: Player) {
    switch (currentPlayer.value) {
        case Player.Blue:
            return "Blue"
        case Player.Red:
            return "Red"
        case Player.None:
            return "None"
    }
}

function passTurn() {
    checkWinCondition()
    if (currentPlayer.value == Player.Blue) {
        currentPlayer.value = Player.Red
    } else {
        currentPlayer.value = Player.Blue
    }
}

function checkWinCondition() {
    if (lastCardTaken.value.type == CardTypes.Lion) {
        alert(`Player ${getPlayerName(currentPlayer.value)} has won the game!`)

    }
}

function isOpponent(card: CardDef): boolean {
    return card.player != currentPlayer.value && card.player != Player.None;
}

function isPlayer(card: CardDef): boolean {
    return card.player == currentPlayer.value;
}

function getCard(pos: Pos) {
    return boardState[pos[1]][pos[0]];
}

function isValidMoveTarget(boardPos: Pos): boolean {
    return validMoveTargets.some((p) => Same(p, boardPos));
}

function isSelected(boardPos: Pos): boolean {
    return [...activePos].every((num, idx) => boardPos[idx] == num);
}

function getCardMoves(card: CardDef, cardPos: Pos): Pos[] {
    return card
        .getMoves()
        .map((moveVector) => {
            if (card.player == Player.Red) {
                moveVector = moveVector.map(v => -1 * v) as Pos;
            }
            return Add(cardPos, moveVector)
        })
        .filter((targetPos) => {

            if (!targetPos.every((i) => i >= 0 && i < 4)) {
                return false;
            }

            const targetCard = getCard(targetPos);
            if (isPlayer(targetCard)) {
                return false;
            }

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

function restart() {
    boardState.splice(0, boardState.length, ...boardSetup);
    isGameOver.value = false;
}

const isGameOver = ref(true);
const currentPlayer = ref(Player.Blue);
const activePos = reactive([-1, -1] as Pos);
const validMoveTargets = reactive([] as Pos[]);
const lastCardTaken = ref(new CardDef(CardTypes.Empty, Player.None));

const boardSetup: CardDef[][] = [
    [
        new CardDef(CardTypes.Elephant, Player.Red),
        new CardDef(CardTypes.Lion, Player.Red),
        new CardDef(CardTypes.Rhino, Player.Red),
        new CardDef(CardTypes.Giraffe, Player.Red),
    ],
    [
        new CardDef(CardTypes.Zebra, Player.Red),
        new CardDef(CardTypes.Empty, Player.None),
        new CardDef(CardTypes.Empty, Player.None),
        new CardDef(CardTypes.Gnu, Player.Red),
    ],
    [
        new CardDef(CardTypes.Zebra, Player.Blue),
        new CardDef(CardTypes.Empty, Player.None),
        new CardDef(CardTypes.Empty, Player.None),
        new CardDef(CardTypes.Gnu, Player.Blue),
    ],
    [
        new CardDef(CardTypes.Elephant, Player.Blue),
        new CardDef(CardTypes.Lion, Player.Blue),
        new CardDef(CardTypes.Rhino, Player.Blue),
        new CardDef(CardTypes.Giraffe, Player.Blue),
    ]
];

const boardState: CardDef[][] = reactive([

]);
</script>

<template>
    <h1>
        It's
        <span
            class="stroked"
            :class="{
                redPlayerColor: currentPlayer == Player.Red,
                bluePlayerColor: currentPlayer == Player.Blue,
            }"
        >{{ getPlayerName(currentPlayer) }}</span>'s turn
    </h1>
    <button @click="restart()" :class="{ hidden: !isGameOver }">Start a new game!</button>
    <div v-for="(row, r) in boardState">
        <Card
            v-for="(card, c) in row"
            :player="card.player"
            :type="card.type"
            :selected="isSelected([c, r])"
            :target="isValidMoveTarget([c, r])"
            :pos="[c, r]"
            v-touch:tap="onTapCard([c, r])"
        ></Card>
    </div>
</template>

<style lang="scss" scoped>
@import "./main.scss";

h1 span {
    font-size: 1.5em;
}

.hidden {
    display: none;
}

.stroked {
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
}
</style>
