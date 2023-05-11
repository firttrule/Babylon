<template>
  <q-page class="flex flex-center">
    <div>
      <q-radio dense v-model="btn" val="action" label="Курсор" />
      <q-radio dense v-model="btn" val="position" label="Смещение" />
      <q-radio dense v-model="btn" val="rotation" label="Вращение" />
      <q-radio dense v-model="btn" val="scaling" label="Маштабирование" />
    </div>

    <canvas ref="canvas" width="1000" height="700" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";
// import * as BABYLON from "babylonjs";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  HemisphericLight,
} from "babylonjs";

const btn = ref("action");
const canvas = ref(null);

const createScene = (canvas) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    10,
    new Vector3(0, 0, 0)
  );

  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0));

  light.intensity = 0.7;

  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );

  sphere.position.y = 1;

  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );

  engine.runRenderLoop(() => {
    scene.render();
  });
};

onMounted(() => {
  if (canvas.value) {
    createScene(canvas.value);
  }
});
</script>
