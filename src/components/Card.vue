<script setup lang="ts">
import Lion from "../assets/Lion.png";
import Rhino from "../assets/Rhino.png";
import Elephant from "../assets/Elephant.png";
import Zebra from "../assets/Zebra.png";
import Gnu from "../assets/Gnu.png";
import Giraffe from "../assets/Giraffe.png";
import { PropType } from "vue";

const props = defineProps({
    type: String,
    player: Number,
    selected: Boolean,
    pos: {
        type: Object as PropType<[Number, Number]>,
    },
});

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
            upsideDown: player == 2,
            empty: player == 0,
            own: player == 1,
            selected: selected,
        }"
        :style="{ backgroundImage: `url(${getSrc(type)})` }"
    >
        <div class="centerContent">
            <h1>{{ type }}</h1>
            <h1>{{ player }}</h1>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$cardSize: 200px;

.card {
    margin: 5px;
    height: $cardSize;
    width: $cardSize;
    border-radius: 20px;
    border: solid black 2px;
    display: inline-flex;
    padding: 30px;
    box-sizing: border-box;
}

.selected {
    border-width: 10px;
    border-color: rgb(22, 194, 206);
}

.bg {
    background-size: contain;
}

.own {
    background-color: rgb(121, 128, 228);
}

/** this flips everything upside down */
.upsideDown {
    transform: scaleY(-1);
    background-color: rgb(231, 85, 85);
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
