import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  HemisphericLight,
  ActionManager,
  InterpolateValueAction,
  Color3,
  SetValueAction,
  AbstractMesh,
  StandardMaterial,
  PointerEventTypes,
} from "babylonjs";

const myScene = {
  engine: null,
  scene: null,

  createScene: function (canvas) {
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

    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene
    );
    sphere.position.y = 1;
    sphere.material = new StandardMaterial("ground", scene);

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene
    );

    let currentMesh;
    const pointerDown = function (mesh) {
      currentMesh = mesh;
    };

    scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN:
          if (
            pointerInfo.pickInfo.hit &&
            pointerInfo.pickInfo.pickedMesh != ground
          ) {
            pointerDown(pointerInfo.pickInfo.pickedMesh);
            pointerInfo.pickInfo.pickedMesh.material.diffuseColor =
              Color3.Red();
            currentMesh = pointerInfo.pickInfo.pickedMesh;
          }
          break;
      }
    });

    // sphere.actionManager = new ActionManager(scene);
    // sphere.actionManager
    //   .registerAction(
    //     new InterpolateValueAction(
    //       ActionManager.OnLeftPickTrigger,
    //       sphere,
    //       "material.diffuseColor",
    //       Color3.Red(),
    //       1000
    //     )
    //   )
    //   .then(
    //     new InterpolateValueAction(
    //       ActionManager.OnLeftPickTrigger,
    //       sphere,
    //       "material.diffuseColor",
    //       Color3.Gray(),
    //       1000
    //     )
    //   );

    engine.runRenderLoop(() => {
      scene.render();
    });
  },
};

export { myScene };
