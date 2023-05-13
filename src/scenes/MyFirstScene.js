import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  HemisphericLight,
} from "babylonjs";

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

const setPosition = (name, x, y, z) => {
  const mesh = this.scene.getMeshByName(name)
  if (mesh) {
    mesh.position = new Vector3(x, y, z)
  }
}

const myScene = {
  engine: null,
  scene: null,
  createScene,
  setPosition
}
export default myScene;
