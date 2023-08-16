import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import * as _t from "three";

global._t = _t;
export const getDefaultUniforms = () => {
  return {
    u_time: { value: 0.0 },
    u_mouse: {
      value: {
        x: 0.0,
        y: 0.0
      }
    },
    u_resolution: {
      value: {
        x: window.innerWidth * window.devicePixelRatio,
        y: window.innerHeight * window.devicePixelRatio
      }
    }
  };
};

/**
 * This function contains the boilerplate code to set up the environment for a threejs app;
 * e.g. HTML canvas, resize listener, mouse events listener, requestAnimationFrame
 * Consumer needs to provide the created renderer, camera and (optional) composer to this setup function
 * This has the benefit of bringing the app configurations directly to the consumer, instead of hiding/passing them down one more layer
 * @param {object} app a custom Threejs app instance that needs to call initScene and (optioal) updateScene if animation is needed
 * @param {object} scene Threejs scene instance
 * @param {object} renderer Threejs renderer instance
 * @param {object} camera Threejs camera instance
 * @param {bool} enableAnimation whether the app needs to animate stuff
 * @param {object} uniforms Uniforms object to be used in fragments, u_resolution/u_mouse/u_time got updated here
 * @param {object} composer Threejs EffectComposer instance
 * @returns a custom threejs app instance that has the basic setup ready that can be further acted upon/customized
 */
export const runApp = (
  app,
  scene,
  renderer,
  camera,
  enableAnimation = false,
  uniforms = getDefaultUniforms(),
  composer = null,
  element
) => {
  element.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (uniforms.u_resolution !== undefined) {
      uniforms.u_resolution.value.x =
        window.innerWidth * window.devicePixelRatio;
      uniforms.u_resolution.value.y =
        window.innerHeight * window.devicePixelRatio;
    }
  });

  const mouseListener = (e) => {
    uniforms.u_mouse.value.x = e.touches ? e.touches[0].clientX : e.clientX;
    uniforms.u_mouse.value.y = e.touches ? e.touches[0].clientY : e.clientY;
  };
  if ("ontouchstart" in window) {
    window.addEventListener("touchmove", mouseListener);
  } else {
    window.addEventListener("mousemove", mouseListener);
  }

  if (app.updateScene === undefined) {
    app.updateScene = (delta, elapsed) => {};
  }
  Object.assign(app, { ...app, element });

  const clock = new _t.Clock();
  const animate = () => {
    if (enableAnimation) {
      requestAnimationFrame(animate);
    }

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();
    uniforms.u_time.value = elapsed;

    app.updateScene(delta, elapsed);

    if (composer === null) {
      renderer.render(scene, camera);
    } else {
      composer.render();
    }
  };

  app
    .initScene()
    .then(animate)
    .catch((error) => {
      console.error(error);
    });
};

export const createRenderer = (
  rendererProps,
  configureRenderer = (_) => {}
) => {
  const renderer = new _t.WebGLRenderer(rendererProps);
  renderer.setClearColor( 0x000000, 0.1);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  configureRenderer(renderer);

  return renderer;
};

export const createComposer = (renderer, scene, camera, extraPasses) => {
  const renderScene = new RenderPass(scene, camera);

  let composer = new EffectComposer(renderer);
  composer.addPass(renderScene);

  extraPasses(composer);

  return composer;
};

export const createCamera = (
  fov = 45,
  near = 0.1,
  far = 100,
  camPos = { x: 0, y: 0, z: 5 },
  camLookAt = { x: 0, y: 0, z: 0 },
  aspect = window.innerWidth / window.innerHeight
) => {
  const camera = new _t.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(camPos.x, camPos.y, camPos.z);
  camera.lookAt(camLookAt.x, camLookAt.y, camLookAt.z); // this only works when there's no OrbitControls
  camera.updateProjectionMatrix();
  return camera;
};
