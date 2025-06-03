import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.153.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.153.0/examples/jsm/loaders/OBJLoader.js';

const container = document.getElementById('modelViewer');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x22232a);

const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(50, -50, 150);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.18); // Even dimmer ambient for more shadow
scene.add(ambientLight);

// "East" is positive X in Three.js by default
const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5); // Strong, but not blown out
directionalLight.position.set(50, 0, 0); // East: +X axis
directionalLight.castShadow = true;
scene.add(directionalLight);

// Optional: add a subtle fill light from the west for softer shadow edge
const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
fillLight.position.set(-50, 0, 0); // West: -X axis
scene.add(fillLight);

// Controls (disable dragging)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enablePan = false;
controls.enableZoom = false;

// Load OBJ model
let loadedObject = null;
const objLoader = new OBJLoader();
objLoader.load(
  'https://sflightx.com/resources/v4/database/model/maya_block_6.obj',
  function (object) {
    // Make all materials darker and more matte
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x555555, // Even dimmer gray
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