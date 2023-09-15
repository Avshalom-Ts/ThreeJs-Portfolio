import './style.css';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
// console.log('🚀 ~ file: main.js:4 ~ dat:', dat);

const gui = new dat.GUI();
// console.log('🚀 ~ file: main.js:6 ~ gui:', gui);
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10,
  },
};

gui.add(world.plane, 'width', 1, 20, 1).onChange(generatePlane);
gui.add(world.plane, 'height', 1, 20, 1).onChange(generatePlane);
gui.add(world.plane, 'widthSegments', 1, 20, 1).onChange(generatePlane);
gui.add(world.plane, 'heightSegments', 1, 20, 1).onChange(generatePlane);

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  const { array } = planeMesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
  }
}

const raycaster = new THREE.Raycaster();
// console.log('🚀 ~ file: main.js:42 ~ raycaster:', raycaster);

const scene = new THREE.Scene();
// console.log('🚀 ~ file: main.js:4 ~ scene:', scene);

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
// console.log('🚀 ~ file: main.js:13 ~ camera:', camera);

const renderer = new THREE.WebGLRenderer();
// console.log('🚀 ~ file: main.js:16 ~ renderer:', renderer);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 5);
controls.update();

renderer.setSize(innerHeight, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
// console.log('🚀 ~ file: main.js:36 ~ planeGeometry:', planeGeometry);

const planeMaterial = new THREE.MeshPhongMaterial({
  // color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true,
});
// console.log('🚀 ~ file: main.js:31 ~ planeMaterial:', planeMaterial);

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// console.log(
//   '🚀 ~ file: main.js:34 ~ planeMesh:',
//   planeMesh.geometry.attributes.position.array
// );

const { array } = planeMesh.geometry.attributes.position;
for (let i = 0; i < array.length; i += 3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];

  array[i + 2] = z + Math.random();
}

const colors = [];

for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
  colors.push(1, 0, 0);
}
console.log(colors);

planeMesh.geometry.setAttribute(
  'color',
  new THREE.BufferAttribute(new Float32Array(colors), 3)
);

console.log(planeMesh.geometry.attributes);

scene.add(planeMesh);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
// console.log('🚀 ~ file: main.js:38 ~ light:', light);
light.position.set(0, 0, 1);
scene.add(light);

// BackLight
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

const mouse = {
  x: undefined,
  y: undefined,
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(planeMesh);

  if (intersects.length > 0) {
    // console.log('intersecting');
    // console.log(intersects[0].face);
    const { color } = intersects[0].object.geometry.attributes;

    color.setX(intersects[0].face.a, 0);
    color.setX(intersects[0].face.b, 0);
    color.setX(intersects[0].face.c, 0);
    intersects[0].object.geometry.attributes.color.needsUpdate = true;
  }
}

animate();

addEventListener('mousemove', event => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  // console.log('🚀 ~ file: main.js:117 ~ mouse:', mouse);
});
