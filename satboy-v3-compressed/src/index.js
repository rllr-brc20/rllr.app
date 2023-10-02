import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// Configure and create Draco decoder.
const draco = new DRACOLoader();
draco.setDecoderConfig({ type: "js" });
draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

// Setup
const scene = new THREE.Scene();

// Calculate a bounding box to encompass all loaded models
const boundingBox = new THREE.Box3();

const camera = new THREE.PerspectiveCamera(
  39.6, // Set FOV equivalent to a 50mm motion picture camera
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Create a parent group for all loaded models
const satBoyGroup = new THREE.Group();
scene.add(satBoyGroup);

// Load GLTF models
const loader = new GLTFLoader();
loader.setDRACOLoader(draco); // Set DRACOLoader for GLTFLoader

// Links to Recursive /content/ path for traits
const modelsToLoad = [
  "satboy_V3_screen_compressed.gltf",
  "satboy_V3_arms_compressed.gltf",
  "satboy_V3_body_compressed.gltf",
  "satboy_V3_buttons_compressed.gltf",
  "satboy_V3_cartridge_compressed.gltf",
  "satboy_V3_dpad_compressed.gltf",
  "satboy_V3_faceplate_compressed.gltf",
  "satboy_V3_legs_compressed.gltf"
];

const loadedModels = [];

const loadModels = (modelIndex) => {
  if (modelIndex < modelsToLoad.length) {
    const modelPath = `assets/${modelsToLoad[modelIndex]}`;
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      satBoyGroup.add(model); // Add model to the parent group
      loadedModels.push(model);

      // Calculate bounding box for this model
      boundingBox.expandByObject(model);

      // Load the next model
      loadModels(modelIndex + 1);
    });
  } else {
    // After loading all models, adjust camera to fit the bounding box
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    const maxDimension = Math.max(size.x, size.y, size.z);
    const distance =
      maxDimension / (1 * Math.tan((camera.fov * Math.PI) / 360)); // Adjusted factor
    camera.position.copy(center);
    camera.position.z += distance;

    controls.target.copy(center);

    camera.lookAt(center);

    // Rotate the entire "SatBoy" group
    satBoyGroup.rotation.y = -Math.PI / 2.5;
  }
};

// Start loading models
loadModels(0);

// Add hemisphere lighting
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

// Add fill light
const fillLight = new THREE.DirectionalLight(0xffffff, 1);
fillLight.position.set(10, 10, 10);
scene.add(fillLight);

// Add key light (from the front)
const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(-10, 10, 10); // Adjust light position
scene.add(keyLight);

// Add backlight (from behind)
const backlight = new THREE.DirectionalLight(0xffffff, 0.5);
backlight.position.set(0, 0, -10); // Adjust light position
scene.add(backlight);

// Add mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.025;

// Animation
const animate = () => {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

animate();
