import './style.css';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import * as dat from 'dat.gui';
// console.log('🚀 ~ file: main.js:4 ~ dat:', dat);

const gui = new dat.GUI();
// console.log('🚀 ~ file: main.js:6 ~ gui:', gui);
const world = {
  plane: {
    width: 10,
    height: 10,
  },
};
gui.add(world.plane, 'width', 1, 20, 1).onChange(() => {
  // console.log(world.plane.width);
  // console.log(planeMesh.geometry);
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    10,
    10
  );
  const { array } = planeMesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
  }
});
gui.add(world.plane, 'height', 1, 20, 1).onChange(() => {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    10,
    10
  );
  const { array } = planeMesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
  }
});

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

renderer.setSize(innerHeight, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
// console.log('🚀 ~ file: main.js:36 ~ planeGeometry:', planeGeometry);

const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
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

scene.add(planeMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
// console.log('🚀 ~ file: main.js:38 ~ light:', light);

light.position.set(0, 0, 5);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
