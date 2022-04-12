<script setup lang="ts">
import Lion from "../assets/Lion.png";
import Rhino from "../assets/Rhino.png";
import Elephant from "../assets/Elephant.png";
import Zebra from "../assets/Zebra.png";
import Gnu from "../assets/Gnu.png";
import Giraffe from "../assets/Giraffe.png";
import { Player } from "../helpers/helpers";

const props = defineProps<{
    type: string,
    player: Player,
    selected: boolean,
    target: boolean,
    captured: boolean
    }>();

function getSrc(name: string) {
    return {
        Lion: Lion,
        Rhino: Rhino,
        Elephant: Elephant,
        Zebra: Zebra,
        Gnu: Gnu,
        Giraffe: Giraffe,
    }[name];
}
</script>

<template>
    <div
        class="card bg"
        :class="{
            upsideDown: player == Player.Red,
            empty: player == Player.None,
            own: player == Player.Blue,
            selected: selected,
            target: target,
            captured: captured
        }"
        :style="{ backgroundImage: `url(${getSrc(type)})` }"
    >
        <div class="centerContent">
            <h1>{{ type }}</h1>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../main.scss";
$cardSize: 200px;
$capturedSize: 150px;

.card {
    margin: 5px;
    height: $cardSize;
    width: $cardSize;
    border-radius: 20px;
    border: solid black 2px;
    display: inline-flex;
    padding: 30px;
    box-sizing: border-box;
    cursor: pointer;
}

.card.captured {
    height: $cardSize;
    width: $cardSize;
    border-radius: 15px;
}

.selected {
    border-width: 10px;
    border-color: rgb(22, 194, 206);
}

.target {
    border-width: 10px;
    border-color: rgb(206, 22, 206);
    border-style: dashed;
}

.bg {
    background-size: contain;
}

.own {
    background-color: $playerColorBlue;
}

/** this flips everything upside down */
.upsideDown {
    transform: scaleY(-1);
    background-color: $playerColorRed;
}

.empty {
    background-color: rgb(145, 165, 113);
}

/**This flips the content (except bg img) back */
.upsideDown > * {
    transform: scaleY(-1);
}

.centerContent {
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    flex-direction: column;
}
</style>
