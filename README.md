# rllr.app

---

## 📂 satboy-v3-compressed

This is a 3D recursive ordinal (not inscribed) created using the three.js, .gltf, and Draco compression libraries. It loads and displays multiple 3D models in a scene, applies lighting, and allows for interactive camera controls.

### Preview -- https://2sz79q.csb.app/

### Code Sandbox -- https://codesandbox.io/s/satboy-v3-compressed-2sz79q

### Use Case -- https://rllr.typedream.app/

### Reference -- https://github.com/metagood/OCM-Dimensions

## Features

- Loads and displays 3D models in the GLTF format.
- Uses Draco compression for efficient model loading.
- Configured with a 50mm motion picture camera perspective.
- Provides lighting with a standard 3-point lighting setup.
- Supports interactive camera controls for easy navigation.
- Aligns the world center to the center of the loaded models.
- Sets a black background for a clean presentation.

## Usage

1. Clone this repository to your local machine.
2. Ensure you have a web server set up to serve the files.
3. Open the `index.html` file in a modern web browser.

## Controls

- Use mouse controls to orbit, pan, and zoom around the 3D scene.
- The camera perspective is equivalent to a 50mm motion picture camera.
- You can rotate the loaded models using mouse controls.
- Lighting is set up with a key light, fill light, and backlight for optimal model visibility.

## Dependencies

- Three.js: A JavaScript 3D library.
- OrbitControls: A Three.js extension for easy camera controls.
- GLTFLoader: A Three.js loader for GLTF 3D models.
- DRACOLoader: A Three.js loader for Draco compressed models.

## Configuration

- Model paths are specified in the `modelsToLoad` array.
- Draco compression is enabled to efficiently load models.
- Lighting can be adjusted by modifying light positions and settings.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
