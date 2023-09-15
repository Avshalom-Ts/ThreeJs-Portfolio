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

camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
// console.log('🚀 ~ file: main.js:36 ~ planeGeometry:', planeGeometry);

const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(planeMesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  planeMesh.rotation.x += 0.01;
  // planeMesh.rotation.y += 0.01;
}

animate();
