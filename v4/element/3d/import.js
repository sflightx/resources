import * as THREE from 'three';
import { OBJLoader } from 'https://unpkg.com/three@0.153.0/examples/jsm/loaders/OBJLoader.js';

const container = document.getElementById('modelViewer');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x22232a);

const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(35, -75, 75);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);

// FIX: Make the canvas ignore all touch/mouse events so page scrolling works effortlessly
renderer.domElement.style.pointerEvents = 'none';
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.18);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5);
directionalLight.position.set(50, 0, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
fillLight.position.set(-50, 0, 0);
scene.add(fillLight);

// Load OBJ model
let loadedObject = null;
const objLoader = new OBJLoader();
objLoader.load(
  'https://sflightx.com/resources/v4/database/model/maya_block_6.obj',
  function (object) {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x555555,
          roughness: 0.8,
          metalness: 0.1
        });
      }
    });
    object.scale.set(1, 1, 1);
    object.position.y = -1;
    scene.add(object);
    loadedObject = object;
  },
  undefined,
  function (error) {
    console.error('An error happened loading the OBJ model:', error);
  }
);

// Animation loop with automated rotation
function animate() {
  requestAnimationFrame(animate);
  if (loadedObject) {
    loadedObject.rotation.y += 0.005; // Auto-rotate
  }
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});