// teapot.js developed by Bob Tianqi Wei
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TeapotGeometry } from "three/addons/geometries/TeapotGeometry.js";

const stage = document.querySelector("#teapot-stage");
const fileInput = document.querySelector("#texture-file");
const texturePreview = document.querySelector("#texture-preview");
const textureStatus = document.querySelector("#texture-status");
const scaleInput = document.querySelector("#texture-scale");
const scaleOutput = document.querySelector("#texture-scale-output");
const resetButton = document.querySelector("#reset-view");
const saveButton = document.querySelector("#save-png");
const loading = document.querySelector("#teapot-loading");
const hint = document.querySelector("#teapot-hint");

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

// Three.js tessellates the classic 32 cubic Bézier patches without welding their vertices.
const geometry = new TeapotGeometry(2, 18, true, true, true, false, true);
const teapot = new THREE.Mesh(geometry, material);
teapot.rotation.y = -0.12;
scene.add(teapot);

scene.add(new THREE.HemisphereLight(0xffffff, 0x8b8276, 2.2));
const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
keyLight.position.set(5, 7, 6);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xb6cdfd, 1.35);
rimLight.position.set(-6, 2, -5);
scene.add(rimLight);

let currentTexture = null;

function configureTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  texture.repeat.set(Number(scaleInput.value), Number(scaleInput.value));
  texture.needsUpdate = true;
}

function setView() {
  camera.position.set(7.2, 3.3, 8.2);
  controls.target.set(0, -0.05, 0);
  controls.update();
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
  material.map = currentTexture;
  material.needsUpdate = true;
  textureStatus.textContent = label;
  texturePreview.src = previewSource;
  if (previousTexture) {
    previousTexture.dispose();
  }
}

function uploadTexture(file) {
  if (!file || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    textureStatus.textContent = "Choose a JPG, PNG, or WebP image";
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  new THREE.TextureLoader().load(
    objectUrl,
    (texture) => {
      texturePreview.addEventListener("load", () => URL.revokeObjectURL(objectUrl), { once: true });
      useTexture(texture, file.name, objectUrl);
    },
    undefined,
    () => {
      URL.revokeObjectURL(objectUrl);
      textureStatus.textContent = "This image could not be opened";
    }
  );
}

function savePng() {
  renderer.render(scene, camera);
  renderer.domElement.toBlob((blob) => {
    if (!blob) {
      textureStatus.textContent = "The PNG could not be saved";
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "utah-teapot.png";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

fileInput.addEventListener("change", () => uploadTexture(fileInput.files[0]));
scaleInput.addEventListener("input", () => {
  const scale = Number(scaleInput.value);
  currentTexture.repeat.set(scale, scale);
  scaleOutput.value = `${Number.isInteger(scale) ? scale : scale.toFixed(1)}×`;
});
resetButton.addEventListener("click", setView);
saveButton.addEventListener("click", savePng);
stage.addEventListener("pointerdown", () => hint.classList.add("is-hidden"), { once: true });

new ResizeObserver(resize).observe(stage);
new MutationObserver(updateTheme).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"]
});

setView();
updateTheme();
resize();

new THREE.TextureLoader().load(
  "/website_files/pictures/goldengate/bob@goldengate_square.jpg",
  (texture) => {
    useTexture(texture, "bob@goldengate_square.jpg", "/website_files/pictures/goldengate/bob@goldengate_square.jpg");
    loading.classList.add("is-hidden");
    loading.addEventListener("transitionend", () => loading.remove(), { once: true });
  },
  undefined,
  () => {
    loading.textContent = "The default texture could not be opened";
  }
);

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
