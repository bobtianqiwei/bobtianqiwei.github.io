// teapot.js developed by Bob Tianqi Wei
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TeapotGeometry } from "three/addons/geometries/TeapotGeometry.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const DEFAULT_IMAGE = "/website_files/pictures/goldengate/bob@goldengate_square.jpg";
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MODEL_PATH = "/works/experiments/utah-teapot/models/";
const TEST_OBJECTS = {
  teapot: {
    label: "Utah Teapot",
    status: "Original 32-patch Bézier geometry"
  },
  bunny: {
    label: "Bunny",
    file: "animal-bunny.glb",
    status: "Kenney Cube Pets · CC0",
    rotation: Math.PI
  },
  monkey: {
    label: "Monkey",
    file: "animal-monkey.glb",
    status: "Kenney Cube Pets · CC0",
    rotation: Math.PI
  },
  chair: {
    label: "Chair",
    file: "chair.glb",
    status: "Kenney Furniture Kit · CC0",
    rotation: -0.55
  },
  toilet: {
    label: "Toilet",
    file: "toilet.glb",
    status: "Kenney Furniture Kit · CC0",
    rotation: -0.55
  },
  plant: {
    label: "Potted Plant",
    file: "pottedPlant.glb",
    status: "Kenney Furniture Kit · CC0",
    rotation: -0.35
  }
};
const stage = document.querySelector("#teapot-stage");
const modeButtons = [...document.querySelectorAll("[data-mode]")];
const modePanels = [...document.querySelectorAll("[data-panel]")];
const controlSidebar = document.querySelector(".teapot-controls");
const actions = document.querySelector("#teapot-3d-actions");
const hint = document.querySelector("#teapot-hint");
const loading = document.querySelector("#teapot-loading");
const testObjectInput = document.querySelector("#test-object");
const testObjectStatus = document.querySelector("#test-object-status");

const textureInput = document.querySelector("#texture-file");
const texturePreview = document.querySelector("#texture-preview");
const textureStatus = document.querySelector("#texture-status");
const scaleInput = document.querySelector("#texture-scale");
const scaleOutput = document.querySelector("#texture-scale-output");

const environmentInput = document.querySelector("#environment-file");
const environmentPreview = document.querySelector("#environment-preview");
const environmentStatus = document.querySelector("#environment-status");
const environmentRotationInput = document.querySelector("#environment-rotation");
const environmentRotationOutput = document.querySelector("#environment-rotation-output");

const samplingButtons = [...document.querySelectorAll("[data-sampling]")];
const frequencyInput = document.querySelector("#filter-frequency");
const frequencyOutput = document.querySelector("#filter-frequency-output");
const distanceInput = document.querySelector("#camera-distance");
const distanceOutput = document.querySelector("#camera-distance-output");

const anamorphicInput = document.querySelector("#anamorphic-file");
const anamorphicPreview = document.querySelector("#anamorphic-preview");
const anamorphicStatus = document.querySelector("#anamorphic-status");
const anamorphicView = document.querySelector("#anamorphic-view");
const distortedCanvas = document.querySelector("#distorted-canvas");
const reflectionCanvas = document.querySelector("#reflection-canvas");
const downloadAnamorphicButton = document.querySelector("#download-anamorphic");
const resetButton = document.querySelector("#reset-view");
const saveButton = document.querySelector("#save-png");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
stage.prepend(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.enablePan = false;
controls.minDistance = 6;
controls.maxDistance = 18;
controls.target.set(0, -0.05, 0);

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.56,
  metalness: 0.02,
  side: THREE.DoubleSide
});

// Three.js keeps each of the classic 32 cubic Bézier patches as an independent UV island.
const geometry = new TeapotGeometry(2, 18, true, true, true, false, true);
const teapot = new THREE.Mesh(geometry, material);
teapot.rotation.y = -0.12;
const objectContainer = new THREE.Group();
objectContainer.add(teapot);
scene.add(objectContainer);

const modelLoader = new GLTFLoader();
const objectCache = new Map([["teapot", teapot]]);
const objectLoads = new Map();
let activeObjectKey = "teapot";
let objectRequest = 0;

scene.add(new THREE.HemisphereLight(0xffffff, 0x8b8276, 2.2));
const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
keyLight.position.set(5, 7, 6);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xb6cdfd, 1.35);
rimLight.position.set(-6, 2, -5);
scene.add(rimLight);

let activeMode = "texture";
let currentTexture = null;
let currentEnvironment = null;
let samplingMode = "point";
let anamorphicImage = null;
const filterTexture = createCheckerTexture();

function generateObjectUvs(root) {
  const meshes = [];
  const bounds = new THREE.Box3();
  const point = new THREE.Vector3();
  root.updateMatrixWorld(true);

  root.traverse((child) => {
    if (!child.isMesh) {
      return;
    }

    child.geometry = child.geometry.index ? child.geometry.toNonIndexed() : child.geometry.clone();
    child.geometry.computeVertexNormals();
    child.skeleton?.update();
    child.updateMatrixWorld(true);
    const position = child.geometry.getAttribute("position");

    for (let index = 0; index < position.count; index += 1) {
      point.fromBufferAttribute(position, index);
      if (child.isSkinnedMesh) {
        child.applyBoneTransform(index, point);
      }
      bounds.expandByPoint(point.applyMatrix4(child.matrixWorld));
    }
    meshes.push(child);
  });

  const size = bounds.getSize(new THREE.Vector3());
  const width = size.x || 1;
  const height = size.y || 1;
  const depth = size.z || 1;

  meshes.forEach((mesh) => {
    const position = mesh.geometry.getAttribute("position");
    const normal = mesh.geometry.getAttribute("normal");
    const normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);
    const projectedPoint = new THREE.Vector3();
    const projectedNormal = new THREE.Vector3();
    const uv = new Float32Array(position.count * 2);

    for (let index = 0; index < position.count; index += 1) {
      projectedPoint.fromBufferAttribute(position, index);
      if (mesh.isSkinnedMesh) {
        mesh.applyBoneTransform(index, projectedPoint);
      }
      projectedPoint.applyMatrix4(mesh.matrixWorld);
      projectedNormal.fromBufferAttribute(normal, index).applyMatrix3(normalMatrix).normalize();
      const nx = Math.abs(projectedNormal.x);
      const ny = Math.abs(projectedNormal.y);
      const nz = Math.abs(projectedNormal.z);

      if (nx >= ny && nx >= nz) {
        uv[index * 2] = (projectedPoint.z - bounds.min.z) / depth;
        uv[index * 2 + 1] = (projectedPoint.y - bounds.min.y) / height;
      } else if (ny >= nz) {
        uv[index * 2] = (projectedPoint.x - bounds.min.x) / width;
        uv[index * 2 + 1] = (projectedPoint.z - bounds.min.z) / depth;
      } else {
        uv[index * 2] = (projectedPoint.x - bounds.min.x) / width;
        uv[index * 2 + 1] = (projectedPoint.y - bounds.min.y) / height;
      }
    }

    mesh.geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    mesh.material = material;
  });
}

function prepareObject(root, rotation) {
  root.rotation.y = rotation || 0;
  generateObjectUvs(root);

  root.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(root);
  const size = bounds.getSize(new THREE.Vector3());
  const scale = 4.8 / Math.max(size.x, size.y, size.z, 0.001);
  root.scale.multiplyScalar(scale);
  root.updateMatrixWorld(true);
  bounds.setFromObject(root);
  const center = bounds.getCenter(new THREE.Vector3());
  root.position.sub(center);
  return root;
}

function loadTestObject(key) {
  if (objectCache.has(key)) {
    return Promise.resolve(objectCache.get(key));
  }
  if (objectLoads.has(key)) {
    return objectLoads.get(key);
  }

  const definition = TEST_OBJECTS[key];
  const request = modelLoader.loadAsync(`${MODEL_PATH}${definition.file}`).then((gltf) => {
    const object = prepareObject(gltf.scene, definition.rotation);
    objectCache.set(key, object);
    return object;
  }).finally(() => objectLoads.delete(key));
  objectLoads.set(key, request);
  return request;
}

async function selectTestObject(key) {
  const definition = TEST_OBJECTS[key];
  if (!definition) {
    return;
  }

  const request = ++objectRequest;
  testObjectStatus.textContent = objectCache.has(key) ? definition.status : `Loading ${definition.label}…`;

  try {
    const object = await loadTestObject(key);
    if (request !== objectRequest) {
      return;
    }
    objectContainer.clear();
    objectContainer.add(object);
    activeObjectKey = key;
    testObjectStatus.textContent = definition.status;
    applyMode(activeMode);
    setView();
  } catch (error) {
    if (request !== objectRequest) {
      return;
    }
    testObjectInput.value = activeObjectKey;
    testObjectStatus.textContent = `${definition.label} could not be loaded`;
  }
}

function createCheckerTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const cells = 16;
  const cellSize = canvas.width / cells;

  for (let row = 0; row < cells; row += 1) {
    for (let column = 0; column < cells; column += 1) {
      context.fillStyle = (row + column) % 2 === 0 ? "#f4f1e8" : "#101010";
      context.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(Number(frequencyInput.value), Number(frequencyInput.value));
  texture.generateMipmaps = false;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.anisotropy = 1;
  texture.needsUpdate = true;
  return texture;
}

function configureTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  texture.repeat.set(Number(scaleInput.value), Number(scaleInput.value));
  texture.needsUpdate = true;
}

function configureEnvironment(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.wrapS = THREE.RepeatWrapping;
  texture.needsUpdate = true;
}

function applySampling() {
  if (!filterTexture) {
    return;
  }

  const filtered = samplingMode === "filtered";
  filterTexture.generateMipmaps = filtered;
  filterTexture.magFilter = filtered ? THREE.LinearFilter : THREE.NearestFilter;
  filterTexture.minFilter = filtered ? THREE.LinearMipmapLinearFilter : THREE.NearestFilter;
  filterTexture.anisotropy = filtered ? renderer.capabilities.getMaxAnisotropy() : 1;
  filterTexture.needsUpdate = true;
}

function setView() {
  camera.position.set(7.2, 3.3, 8.2);
  controls.target.set(0, -0.05, 0);
  controls.update();
  syncDistanceControl();
}

function syncDistanceControl() {
  const distance = camera.position.distanceTo(controls.target);
  const clamped = THREE.MathUtils.clamp(distance, Number(distanceInput.min), Number(distanceInput.max));
  distanceInput.value = clamped.toFixed(1);
  distanceOutput.value = clamped.toFixed(1);
}

function setCameraDistance(distance) {
  const direction = camera.position.clone().sub(controls.target).normalize();
  camera.position.copy(controls.target).addScaledVector(direction, distance);
  controls.update();
  distanceOutput.value = Number(distance).toFixed(1);
}

function updateTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  scene.background = new THREE.Color(dark ? 0x141414 : 0xffffff);
}

function resize() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  if (!width || !height) {
    return;
  }
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function useTexture(texture, label, previewSource) {
  configureTexture(texture);
  const previousTexture = currentTexture;
  currentTexture = texture;
  textureStatus.textContent = label;
  texturePreview.src = previewSource;
  if (previousTexture) {
    previousTexture.dispose();
  }
  if (activeMode === "texture") {
    applyMode("texture");
  }
}

function useEnvironment(texture, label, previewSource) {
  configureEnvironment(texture);
  const previousEnvironment = currentEnvironment;
  currentEnvironment = texture;
  environmentStatus.textContent = label;
  environmentPreview.src = previewSource;
  if (previousEnvironment) {
    previousEnvironment.dispose();
  }
  updateEnvironmentRotation();
  if (activeMode === "environment") {
    applyMode("environment");
  }
}

function loadSharedImage(file) {
  const statuses = [textureStatus, environmentStatus, anamorphicStatus];
  if (!file || !IMAGE_TYPES.includes(file.type)) {
    statuses.forEach((status) => {
      status.textContent = "Choose a JPG, PNG, or WebP image";
    });
    return;
  }

  [textureInput, environmentInput, anamorphicInput].forEach((input) => {
    input.value = "";
  });

  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      useTexture(texture, file.name, reader.result);
      useEnvironment(texture.clone(), file.name, reader.result);
      anamorphicImage = image;
      anamorphicPreview.src = reader.result;
      anamorphicStatus.textContent = file.name;
      generateAnamorphic(image);
    };
    image.onerror = () => {
      statuses.forEach((status) => {
        status.textContent = "This image could not be opened";
      });
    };
    image.src = reader.result;
  };
  reader.onerror = () => {
    statuses.forEach((status) => {
      status.textContent = "This image could not be opened";
    });
  };
  reader.readAsDataURL(file);
}

function applyMode(mode) {
  activeMode = mode;
  controlSidebar.scrollTop = 0;
  modeButtons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.mode === mode)));
  modePanels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== mode;
  });

  const anamorphic = mode === "anamorphic";
  actions.hidden = anamorphic;
  anamorphicView.hidden = !anamorphic;
  stage.classList.toggle("is-anamorphic", anamorphic);
  objectContainer.visible = !anamorphic;
  controls.enabled = !anamorphic;

  if (anamorphic) {
    return;
  }

  material.color.set(0xffffff);
  material.envMap = null;
  material.map = null;
  material.envMapIntensity = 1;

  if (mode === "texture") {
    material.map = currentTexture;
    material.roughness = 0.56;
    material.metalness = 0.02;
  } else if (mode === "environment") {
    material.envMap = currentEnvironment;
    material.roughness = 0.06;
    material.metalness = 1;
    material.envMapIntensity = 1.45;
    updateEnvironmentRotation();
  } else {
    material.map = filterTexture;
    material.roughness = 0.62;
    material.metalness = 0;
    syncDistanceControl();
  }

  material.needsUpdate = true;
}

function updateEnvironmentRotation() {
  const degrees = Number(environmentRotationInput.value);
  environmentRotationOutput.value = `${degrees}°`;
  if (material.envMapRotation) {
    material.envMapRotation.y = THREE.MathUtils.degToRad(degrees);
  }
}

function updateFrequency() {
  const frequency = Number(frequencyInput.value);
  filterTexture.repeat.set(frequency, frequency);
  frequencyOutput.value = `${frequency}×`;
}

function generateAnamorphic(image) {
  const size = distortedCanvas.width;
  const center = size / 2;
  const innerRadius = size * 0.17;
  const outerRadius = size * 0.475;
  const radialPower = 1.22;
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = size;
  sourceCanvas.height = size;
  const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
  sourceContext.drawImage(image, 0, 0, size, size);
  const sourcePixels = sourceContext.getImageData(0, 0, size, size).data;
  const distortedContext = distortedCanvas.getContext("2d");
  const distortedImage = distortedContext.createImageData(size, size);
  const distortedPixels = distortedImage.data;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x - center;
      const dy = y - center;
      const radius = Math.hypot(dx, dy);
      if (radius < innerRadius || radius > outerRadius) {
        continue;
      }

      const angle = Math.atan2(dy, dx);
      const u = ((angle / (Math.PI * 2) + 1.25) % 1 + 1) % 1;
      const radial = (radius - innerRadius) / (outerRadius - innerRadius);
      const v = 1 - Math.pow(radial, radialPower);
      const sourceX = Math.min(size - 1, Math.floor(u * size));
      const sourceY = Math.min(size - 1, Math.floor(v * size));
      const sourceIndex = (sourceY * size + sourceX) * 4;
      const outputIndex = (y * size + x) * 4;
      distortedPixels[outputIndex] = sourcePixels[sourceIndex];
      distortedPixels[outputIndex + 1] = sourcePixels[sourceIndex + 1];
      distortedPixels[outputIndex + 2] = sourcePixels[sourceIndex + 2];
      distortedPixels[outputIndex + 3] = 255;
    }
  }

  distortedContext.clearRect(0, 0, size, size);
  distortedContext.putImageData(distortedImage, 0, 0);
  distortedContext.strokeStyle = "rgba(128, 128, 128, 0.52)";
  distortedContext.lineWidth = 2;
  distortedContext.beginPath();
  distortedContext.arc(center, center, innerRadius, 0, Math.PI * 2);
  distortedContext.arc(center, center, outerRadius, 0, Math.PI * 2);
  distortedContext.stroke();
  drawCylindricalReflection(distortedPixels, innerRadius, outerRadius, radialPower);
}

function drawCylindricalReflection(distortedPixels, innerRadius, outerRadius, radialPower) {
  const size = reflectionCanvas.width;
  const center = size / 2;
  const cylinder = { x: size * 0.18, y: size * 0.1, width: size * 0.64, height: size * 0.8 };
  const temporaryCanvas = document.createElement("canvas");
  temporaryCanvas.width = size;
  temporaryCanvas.height = size;
  const temporaryContext = temporaryCanvas.getContext("2d");
  const reflectedImage = temporaryContext.createImageData(size, size);
  const reflectedPixels = reflectedImage.data;

  for (let y = Math.floor(cylinder.y); y < cylinder.y + cylinder.height; y += 1) {
    for (let x = Math.floor(cylinder.x); x < cylinder.x + cylinder.width; x += 1) {
      const u = (x - cylinder.x) / cylinder.width;
      const v = (y - cylinder.y) / cylinder.height;
      const angle = (u - 1.25) * Math.PI * 2;
      const radial = Math.pow(1 - v, 1 / radialPower);
      const radius = innerRadius + radial * (outerRadius - innerRadius);
      const sourceX = Math.round(center + Math.cos(angle) * radius);
      const sourceY = Math.round(center + Math.sin(angle) * radius);
      const sourceIndex = (sourceY * size + sourceX) * 4;
      const outputIndex = (y * size + x) * 4;
      reflectedPixels[outputIndex] = distortedPixels[sourceIndex];
      reflectedPixels[outputIndex + 1] = distortedPixels[sourceIndex + 1];
      reflectedPixels[outputIndex + 2] = distortedPixels[sourceIndex + 2];
      reflectedPixels[outputIndex + 3] = 255;
    }
  }

  temporaryContext.putImageData(reflectedImage, 0, 0);
  const context = reflectionCanvas.getContext("2d");
  const radiusX = cylinder.width / 2;
  const radiusY = size * 0.065;
  const topY = cylinder.y + radiusY;
  const bottomY = cylinder.y + cylinder.height - radiusY;
  const curve = 0.5522848;

  function traceCylinder() {
    context.beginPath();
    context.moveTo(center - radiusX, topY);
    context.bezierCurveTo(center - radiusX, topY - radiusY * curve, center - radiusX * curve, topY - radiusY, center, topY - radiusY);
    context.bezierCurveTo(center + radiusX * curve, topY - radiusY, center + radiusX, topY - radiusY * curve, center + radiusX, topY);
    context.lineTo(center + radiusX, bottomY);
    context.bezierCurveTo(center + radiusX, bottomY + radiusY * curve, center + radiusX * curve, bottomY + radiusY, center, bottomY + radiusY);
    context.bezierCurveTo(center - radiusX * curve, bottomY + radiusY, center - radiusX, bottomY + radiusY * curve, center - radiusX, bottomY);
    context.closePath();
  }

  context.clearRect(0, 0, size, size);
  context.save();
  traceCylinder();
  context.clip();
  context.drawImage(temporaryCanvas, 0, 0);
  const shade = context.createLinearGradient(cylinder.x, 0, cylinder.x + cylinder.width, 0);
  shade.addColorStop(0, "rgba(0, 0, 0, 0.58)");
  shade.addColorStop(0.22, "rgba(255, 255, 255, 0.08)");
  shade.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
  shade.addColorStop(0.78, "rgba(255, 255, 255, 0.08)");
  shade.addColorStop(1, "rgba(0, 0, 0, 0.58)");
  context.fillStyle = shade;
  context.fillRect(cylinder.x, cylinder.y, cylinder.width, cylinder.height);
  context.restore();

  context.fillStyle = "rgba(20, 20, 20, 0.2)";
  context.beginPath();
  context.ellipse(center, topY, radiusX, radiusY, 0, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = "rgba(150, 150, 150, 0.92)";
  context.lineWidth = 4;
  traceCylinder();
  context.stroke();

  context.beginPath();
  context.ellipse(center, topY, radiusX, radiusY, 0, 0, Math.PI * 2);
  context.stroke();

  context.beginPath();
  context.ellipse(center, bottomY, radiusX, radiusY, 0, 0, Math.PI);
  context.stroke();
}

function downloadCanvas(canvas, name) {
  canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}

function savePng() {
  renderer.render(scene, camera);
  downloadCanvas(renderer.domElement, `${activeObjectKey}-${activeMode}.png`);
}

modeButtons.forEach((button) => button.addEventListener("click", () => applyMode(button.dataset.mode)));
testObjectInput.addEventListener("change", () => selectTestObject(testObjectInput.value));
[textureInput, environmentInput, anamorphicInput].forEach((input) => {
  input.addEventListener("change", () => loadSharedImage(input.files[0]));
});

scaleInput.addEventListener("input", () => {
  const scale = Number(scaleInput.value);
  if (currentTexture) {
    currentTexture.repeat.set(scale, scale);
  }
  scaleOutput.value = `${Number.isInteger(scale) ? scale : scale.toFixed(1)}×`;
});

environmentRotationInput.addEventListener("input", updateEnvironmentRotation);
samplingButtons.forEach((button) => button.addEventListener("click", () => {
  samplingMode = button.dataset.sampling;
  samplingButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  applySampling();
}));
frequencyInput.addEventListener("input", updateFrequency);
distanceInput.addEventListener("input", () => setCameraDistance(Number(distanceInput.value)));
controls.addEventListener("change", () => {
  if (activeMode === "filtering") {
    syncDistanceControl();
  }
});

resetButton.addEventListener("click", setView);
saveButton.addEventListener("click", savePng);
downloadAnamorphicButton.addEventListener("click", () => downloadCanvas(distortedCanvas, "utah-teapot-anamorphic.png"));
stage.addEventListener("pointerdown", () => hint.classList.add("is-hidden"), { once: true });

new ResizeObserver(resize).observe(stage);
new MutationObserver(updateTheme).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"]
});

setView();
updateTheme();
resize();
updateFrequency();
applySampling();
applyMode("texture");

new THREE.TextureLoader().load(
  DEFAULT_IMAGE,
  (texture) => {
    useTexture(texture, "bob@goldengate_square.jpg", DEFAULT_IMAGE);
    useEnvironment(texture.clone(), "bob@goldengate_square.jpg", DEFAULT_IMAGE);
    loading.classList.add("is-hidden");
    loading.addEventListener("transitionend", () => loading.remove(), { once: true });
  },
  undefined,
  () => {
    loading.textContent = "The default texture could not be opened";
  }
);

const defaultAnamorphicImage = new Image();
defaultAnamorphicImage.onload = () => {
  anamorphicImage = defaultAnamorphicImage;
  generateAnamorphic(defaultAnamorphicImage);
};
defaultAnamorphicImage.src = DEFAULT_IMAGE;

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
