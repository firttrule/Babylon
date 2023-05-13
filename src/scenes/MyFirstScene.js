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
  GizmoManager,
  UtilityLayerRenderer,
  AxisDragGizmo,
  PositionGizmo,
  RotationGizmo,
  ScaleGizmo,
} from "babylonjs";

const myScene = {
  engine: null,
  scene: null,
  action: null,
  AbsMesh: null,
  gizmo: null,
  utilLayer: null,
  currentMesh: null,

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
    sphere.material = new StandardMaterial("mat", scene);

    let sphereAbs = new AbstractMesh("sphereAbs", scene);
    sphereAbs.position.y = 1;
    sphere.parent = sphereAbs;

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene
    );

    const utilLayer = new UtilityLayerRenderer(scene);
    let gizmo = null;
    let action;
    let currentMesh;

    const pointerDown = function (mesh) {
      if (gizmo) {
        currentMesh = mesh;
        if (action != "rotate") gizmo.attachedMesh = currentMesh;
        else gizmo.attachedMesh = sphereAbs;
      }
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
          } else {
            if (gizmo && gizmo.attachedMesh) gizmo.attachedMesh = null;
            currentMesh = null;
            sphere.material = new StandardMaterial("mat", scene);
          }
          break;
      }
    });

    engine.runRenderLoop(() => {
      scene.render();
      this.AbsMesh = sphereAbs;
      this.utilLayer = utilLayer;
      this.currentMesh = currentMesh;
      gizmo = this.gizmo;
      action = this.action;
    });
  },

  checkGizmo: function (curGizmo) {
    switch (curGizmo) {
      case "action":
        this.action = "action";
        this.gizmo.attachedMesh = null;
        this.gizmo = null;
        break;
      case "position":
        this.action = "position";
        this.resetGizmo(this.gizmo);
        this.gizmo = new PositionGizmo(this.utilLayer);
        if (this.currentMesh) {
          this.gizmo.attachedMesh = this.AbsMesh;
        }
        break;
      case "rotation":
        this.action = "rotation";
        this.resetGizmo(this.gizmo);
        this.gizmo = new RotationGizmo(this.utilLayer);
        if (this.currentMesh) {
          this.gizmo.updateGizmoRotationToMatchAttachedMesh = true;
          this.gizmo.attachedMesh = this.AbsMesh;
        }
        break;
      case "scaling":
        this.action = "scaling";
        this.resetGizmo(this.gizmo);
        this.gizmo = new ScaleGizmo(this.utilLayer);
        this.gizmo.attachedMesh = this.currentMesh;
        break;
    }
  },

  resetGizmo: function (gizmo) {
    if (gizmo !== null) {
      if (gizmo.attachedMesh !== null) {
        this.gizmo.attachedMesh = null;
      }
    }
  },
};

export { myScene };
