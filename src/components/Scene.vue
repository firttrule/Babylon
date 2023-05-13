<template>
  <canvas ref="bjsCanvas" width="900" height="600" />
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import { myScene } from "../scenes/MyFirstScene";

const bjsCanvas = ref(null);

onMounted(async () => {
  if (bjsCanvas.value) {
    await myScene.createScene(bjsCanvas.value);
  }
});
</script>
