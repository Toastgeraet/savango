<script setup lang="ts">
import Lion from '../assets/Lion.png';
import Rhino from '../assets/Rhino.png';
import Elephant from '../assets/Elephant.png';
import Zebra from '../assets/Zebra.png';
import Gnu from '../assets/Gnu.png';
import Giraffe from '../assets/Giraffe.png';
import { computed } from '@vue/reactivity';

const props = defineProps<{
  type: string,
  player: number
}>();

function getSrc(name: string) {
    return {
        "Lion": Lion,
        "Rhino": Rhino,
        "Elephant": Elephant,
        "Zebra": Zebra,
        "Gnu": Gnu,
        "Giraffe": Giraffe,
    }[name];
}

const opponent = props.player == 2;
console.log(opponent);

</script>

<template>
  <div class="card bgZoom" :class="{ upsideDown: opponent }" :style="{ backgroundImage: `url(${getSrc(type)})` }">
    <div class="centerContent">
      <h1>{{ type }}</h1>
      <h1>{{ player }}</h1>
    </div>
  </div>
</template>

<style lang=scss scoped>
$cardSize: 150px;

.card {
  margin: 5px;
  height: $cardSize;
  width: $cardSize;
  border-radius: 20px;
  border: solid black 2px;
  display: inline-flex;
  padding: 30px;
}

.bgZoom {
    background-size: contain;
}

/** this flips everything upside down */
.upsideDown {
    transform: scaleY(-1);
}

/**This flips the content (except bg img) back */
.upsideDown > *{
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
