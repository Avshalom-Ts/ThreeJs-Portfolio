import './style.css';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

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

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// console.log('🚀 ~ file: main.js:22 ~ boxGeometry:', boxGeometry);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// console.log('🚀 ~ file: main.js:25 ~ material:', material);

const mesh = new THREE.Mesh(boxGeometry, material);
// console.log('🚀 ~ file: main.js:28 ~ mesh:', mesh);

scene.add(mesh);

camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
// console.log('🚀 ~ file: main.js:36 ~ planeGeometry:', planeGeometry);

const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(planeMesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

animate();
