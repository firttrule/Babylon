<template>
  <q-page class="flex flex-center">
    <div>
      <q-radio dense v-model="btn" val="action" label="Курсор" />
      <q-radio dense v-model="btn" val="position" label="Смещение" />
      <q-radio dense v-model="btn" val="rotation" label="Вращение" />
      <q-radio dense v-model="btn" val="scaling" label="Масштабирование" />
    </div>

    <Scene />
  </q-page>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import Scene from "../components/Scene.vue";
import { myScene } from "../scenes/MyFirstScene";
import { watch } from "vue";

const btn = ref("action");

watch(btn, () => {
  myScene.checkGizmo(btn.value);
});
</script>
