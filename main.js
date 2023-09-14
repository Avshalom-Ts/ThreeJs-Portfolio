import './style.css';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

const scene = new THREE.Scene();
console.log('🚀 ~ file: main.js:4 ~ scene:', scene);

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
console.log('🚀 ~ file: main.js:13 ~ camera:', camera);

const renderer = new THREE.WebGLRenderer();
console.log('🚀 ~ file: main.js:16 ~ renderer:', renderer);

renderer.setSize(innerHeight, innerHeight);
document.body.appendChild(renderer.domElement);
