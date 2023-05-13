<template>
  <q-page class="q-ma-md">
    <!-- <div>
      <q-radio dense v-model="btn" val="action" label="Курсор" />
      <q-radio dense v-model="btn" val="position" label="Смещение" />
      <q-radio dense v-model="btn" val="rotation" label="Вращение" />
      <q-radio dense v-model="btn" val="scaling" label="Масштабирование" />
    </div> -->
    <div>
      <q-btn @click="moveCube">Move cube</q-btn>
    </div>

    <Scene :position="cubePosition" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import Scene from "../components/Scene.vue";

const btn = ref("action");
const cubePosition = ref({
  x: 0,
  y: 0,
  z: 0,
});
const offset = ref(0);

const moveCube = () => {
  getNextPosition();
  moveCubeTheRightWay();
  console.log(cubePosition.value);
};

const moveCubeTheRightWay = () => {
  cubePosition.value = {
    x: 2,
    y: cubePosition.value.y,
    z: cubePosition.value.z,
  };
};

const getNextPosition = () => {
  offset.value += 0.5;
  cubePosition.value = { x: 0, y: 0 + offset.value, z: 0 };
};
</script>
