import * as _t from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {
  createCamera,
  createRenderer,
  runApp,
  getDefaultUniforms
} from "./coreUtils";

// 240 141 0

const fragShader = `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
vec3 colorA = vec3(0.0, 0.0, 0.0);
vec3 colorB = vec3(1.000,0.468,0.083);

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = mix(colorA, colorB, st.y);

  gl_FragColor = vec4(color,1.0);
}
`;

const vtxShader = `
#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_mouse;
uniform float u_pointsize;
uniform float u_noise_amp_1;
uniform float u_noise_freq_1;
uniform float u_spd_modifier_1;
uniform float u_noise_amp_2;
uniform float u_noise_freq_2;
uniform float u_spd_modifier_2;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                        vec2(12.9898,78.233)))
                * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
              sin(angle),cos(angle));
}

void main() {
  gl_PointSize = u_pointsize;

  vec3 pos = position;

  pos.z += noise((pos.xy + u_mouse) * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;

  pos.z += noise(rotate2d(PI / 4.) * pos.yx * u_noise_freq_2 - u_time * u_spd_modifier_2 * 0.6) * u_noise_amp_2;

  vec4 mvm = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvm;
}`

export function handleThreejsBg (element) {
  const uniforms = {
    ...getDefaultUniforms(),
    u_pointsize: { value: 2.0 },
    u_noise_freq_1: { value: 3.0 },
    u_noise_amp_1: { value: 0.2 },
    u_spd_modifier_1: { value: 1.0 },
    u_noise_freq_2: { value: 2.0 },
    u_noise_amp_2: { value: 0.3 },
    u_spd_modifier_2: { value: 0.8 }
  };

  let mouse = { x: 0, y: 0 }

  const handleMouseMove = ({ pageX, pageY }) => {
    mouse = {
      x: pageX / window.innerWidth,
      y: pageY / window.innerHeight
    }
  }

  window.addEventListener('mousemove', handleMouseMove)

  let scene = new _t.Scene();

  let renderer = createRenderer({ antialias: true, alpha: true });

  let camera = createCamera(60, 1, 100, { x: 0, y: 0, z: 4.5 });

  let app = {
    vertexShader() {
      return vtxShader;
    },
    fragmentShader() {
      return fragShader;
    },
    async initScene() {
      this.geometry = new _t.PlaneGeometry(4, 4, 128, 128);
      const material = new _t.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: this.vertexShader(),
        fragmentShader: this.fragmentShader()
      });
      this.mesh = new _t.Points(this.geometry, material);
      scene.add(this.mesh);
      this.mesh.rotation.x = _t.MathUtils.degToRad(-40);
      this.mesh.rotation.y = _t.MathUtils.degToRad(-55);
      this.mesh.rotation.z = _t.MathUtils.degToRad(-15);

      this.stats1 = new Stats();
      this.stats1.showPanel(0); // Panel 0 = fps
      this.stats1.domElement.style.cssText =
        "position:absolute;top:0px;left:0px;";
      element.appendChild(this.stats1.domElement);
    },
    updateScene(interval, elapsed) {
      this.stats1.update();
      uniforms.u_mouse.value = mouse
    }
  }

  runApp(app, scene, renderer, camera, true, uniforms, undefined, element);
}