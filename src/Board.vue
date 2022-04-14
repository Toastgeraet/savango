<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import Card from "./components/Card.vue";
import {
    Add,
    CardDef,
    CardType,
    IntersectingPos,
    Player,
    Pos,
    Same,
} from "./helpers/helpers";

function onTapCard(tappedPos: Pos, tappedCard: CardDef) {
    return function (direction: any, event: any) {

        if (isGameOver.value) {
            return;
        }

        // const tappedCard = getCard(tappedPos);

        if (validMoveTargets.find((p) => Same(p, tappedPos))) {

            // If opponent, replace with empty card
            if (isOpponent(tappedCard)) {
                lastCardTaken.value = tappedCard;

                const emptyCard = new CardDef(CardType.Empty, Player.None);
                boardState[tappedPos[1]][tappedPos[0]] = emptyCard;

                const capturedCard = new CardDef(lastCardTaken.value.type, currentPlayer.value, true);
                capturedCards[getPlayerName(currentPlayer.value) as any].push(capturedCard)
            }

            // Swap active and target cards            
            const temp = boardState[tappedPos[1]][tappedPos[0]];
            boardState[tappedPos[1]][tappedPos[0]] = getCard(activePos);
            boardState[activePos[1]][activePos[0]] = temp;

            resetSelectionMarkers();

            passTurn();
            return;
        }

        if (Same(activePos, tappedPos)) {
            resetSelectionMarkers();
            return;
        }

        if (isPlayer(tappedCard)) {
            if (tappedCard.captured) {
                activePos.splice(0, 2, -1, -1);    
                gameData.activeCard = tappedCard;         
                console.log("its happening");
                   
                validMoveTargets.splice(0, validMoveTargets.length, ...getEmptyStartingPosOfCurrentPlayer());
            } else {
                const moves = getCardMoves(tappedCard, tappedPos);
                activePos.splice(0, 2, ...tappedPos);
                validMoveTargets.splice(0, validMoveTargets.length, ...moves);
                return;
            }
        }
    };
}

function onTapCapturedCard(card: CardDef) {
    return function (direction: any, event: any) {
    }
}

function getEmptyStartingPosOfCurrentPlayer() {
    let pos: Pos[];
    if (currentPlayer.value == Player.Blue) {
        pos = [[0, 2], [3, 2], [0, 3], [1, 3], [2, 3], [3, 3]];
    } else {
        pos = [[0, 1], [3, 1], [0, 0], [1, 0], [2, 0], [3, 0]];
    }
    return pos.filter(p => getCard(p).type == CardType.Empty);
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
    switch (pl) {
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
    if (lastCardTaken.value.type == CardType.Lion) {
        isGameOver.value = true;
        lastWinner.value = currentPlayer.value;
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
                if (!(jumpCard.type == CardType.Empty)) {
                    return false;
                }
            }
            return true;
        });
}

function restart() {
    boardState.splice(0, boardState.length, ...boardSetup.map(r => r.map(c => (new CardDef(c.type, c.player)))));
    isGameOver.value = false;
    lastCardTaken.value = new CardDef(CardType.Empty, Player.None);
}

interface GameData {
    activeCard: CardDef
}

const gameData: GameData = reactive({
    activeCard: new CardDef(CardType.Empty, Player.None)
})

const isGameOver = ref(true);
const currentPlayer = ref(Player.Blue);
const activePos = reactive([-1, -1] as Pos);
const validMoveTargets = reactive([] as Pos[]);
const lastCardTaken = ref(new CardDef(CardType.Empty, Player.None));
const lastWinner = ref(Player.None);

//todo how to type this
const capturedCards: any = reactive({
    "Red": [] as CardDef[],
    "Blue": [] as CardDef[]
});

const boardSetup: CardDef[][] = [
    [
        new CardDef(CardType.Elephant, Player.Red),
        new CardDef(CardType.Lion, Player.Red),
        new CardDef(CardType.Rhino, Player.Red),
        new CardDef(CardType.Giraffe, Player.Red),
    ],
    [
        new CardDef(CardType.Zebra, Player.Red),
        new CardDef(CardType.Empty, Player.None),
        new CardDef(CardType.Empty, Player.None),
        new CardDef(CardType.Gnu, Player.Red),
    ],
    [
        new CardDef(CardType.Zebra, Player.Blue),
        new CardDef(CardType.Empty, Player.None),
        new CardDef(CardType.Empty, Player.None),
        new CardDef(CardType.Gnu, Player.Blue),
    ],
    [
        new CardDef(CardType.Elephant, Player.Blue),
        new CardDef(CardType.Lion, Player.Blue),
        new CardDef(CardType.Rhino, Player.Blue),
        new CardDef(CardType.Giraffe, Player.Blue),
    ]
];

const boardState: CardDef[][] = reactive([]);
</script>

<template>
    <h1 :class="{ hidden: isGameOver }">
        It's
        <span class="stroked" :class="{
            redPlayerColor: currentPlayer == Player.Red,
            bluePlayerColor: currentPlayer == Player.Blue,
        }">{{ getPlayerName(currentPlayer) }}</span>'s turn
    </h1>

    <!-- <h1>{{ isGameOver ? "GameOver" : "git stameRunning" }}</h1> -->

    <h1 :class="{ hidden: (!isGameOver) || lastWinner == Player.None }">
        <span class="stroked" :class="{
            redPlayerColor: lastWinner == Player.Red,
            bluePlayerColor: lastWinner == Player.Blue,
        }">{{ getPlayerName(lastWinner) }}</span> has won the game!
    </h1>

    <button @click="restart()" :class="{ hidden: !isGameOver }">
        <h1 :class="{ hidden: !isGameOver }">Start a new game of Savango!</h1>
    </button>
    <div class="flex">

        <div>
            <h2 :class="{ hidden: isGameOver }">
                <span class="stroked redPlayerColor">{{ getPlayerName(Player.Red) }}</span>'s captured cards
            </h2>
            <Card v-for="(card) in capturedCards.Red" :player="card.player" :type="card.type" :selected="card == gameData.activeCard" :target="false"
                v-touch:tap="onTapCapturedCard(card)" :captured="card.captured"></Card>
        </div>

        <div class="mainBoard">
            <div v-for="(row, r) in boardState">
                <Card v-for="(card, c) in row" :key="`r${r}c${c}${card.player}${card.type}`" :player="card.player" :type="card.type" :selected="isSelected([c, r])"
                    :target="isValidMoveTarget([c, r])" v-touch:tap="onTapCard([c, r], card)" :captured="card.captured"></Card>
            </div>
        </div>

        <div>
            <h2 :class="{ hidden: isGameOver }">
                <span class="stroked bluePlayerColor">{{ getPlayerName(Player.Blue) }}</span>'s captured cards
            </h2>
            <Card v-for="(card) in capturedCards.Blue" :player="card.player" :type="card.type" :selected="card == gameData.activeCard" :target="false"
                v-touch:tap="onTapCapturedCard(card)" :captured="card.captured"></Card>
        </div>

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

.mainBoard {
    min-width: calc($cardSize * 4 + 60px);
}

.flex {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.stroked {
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
}
</style>
