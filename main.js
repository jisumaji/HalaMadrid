import "./style.css";
import * as THREE from "./node_modules/three/src/Three";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();

//sets background
scene.background = new THREE.TextureLoader().load("./assets/rma.webp");

//sets camera perspective
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//initial size of cube
const geometry = new THREE.BoxGeometry(2, 2, 2);

//making the cube with 6 faces
const texLoader = new THREE.TextureLoader();
var material = [
  new THREE.MeshBasicMaterial({ map: texLoader.load("./assets/ron.jpg") }),
  new THREE.MeshBasicMaterial({ map: texLoader.load("./assets/ben.jfif") }),
  new THREE.MeshBasicMaterial({ map: texLoader.load("./assets/mod.jpg") }),
  new THREE.MeshBasicMaterial({ map: texLoader.load("./assets/ramos.jpg") }),
  new THREE.MeshBasicMaterial({ map: texLoader.load("./assets/casillas.jpg") }),
  new THREE.MeshBasicMaterial({ map: texLoader.load("./assets/zidane.jpg") }),
];
const cube = new THREE.Mesh(geometry, material);

//adding cube to scene
scene.add(cube);

// // wireframe - adds border to every edge
// var geo = new THREE.EdgesGeometry(cube.geometry);
// var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 4 });
// var wireframe = new THREE.LineSegments(geo, mat);
// wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
// cube.add(wireframe);

//adds dat.gui controls
const gui = new GUI({ width: 369 });
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 10);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 10);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 10);
cubeFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();

//initial camera postition
camera.position.z = 3;

//recursive animate function to show animation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.005;
}

//audio
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('assets/last.m4a', function (buffer) {
  sound.autoplay=true;//i added this
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  // sound.play();
});

// var buttons = document.getElementsByTagName("button");
// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener("click", onButtonClick, false);
// };

// function onButtonClick(event) {
//   sound.play();
// }

//calling function to show on browser
animate();