import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import  getStarfield from './src/getStarfield.js'
import {getFresnelMat} from './src/getFresnelMat.js'

const w = window.innerWidth;
const h = window.innerHeight;
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader()

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

renderer.setSize(w, h); // setSize of renderer
document.body.appendChild(renderer.domElement); // appendChild renderer canvas

// geometry
const geo = new THREE.IcosahedronGeometry(1.0, 12);

const earthGroup = new THREE.Group();
earthGroup.rotation.z= -23.4 * Math.PI / 100
scene.add(earthGroup)

// mesh
const mat = new THREE.MeshStandardMaterial({
  map: loader.load('textures/00_earthmap1k.jpg')

});
const earth = new THREE.Mesh(geo, mat);
earthGroup.add(earth);


// lightMat
const light_mat = new THREE.MeshBasicMaterial({
  map: loader.load('textures/03_earthlights1k.jpg'),
  blending: THREE.AdditiveBlending,  // Makes the texture darken based on the background
});
const light_mesh = new THREE.Mesh(geo, light_mat);
earthGroup.add(light_mesh);

// cloudmat
const cloud_mat = new THREE.MeshStandardMaterial({
  map: loader.load('textures/04_earthcloudmap.jpg'),
  blending: THREE.AdditiveBlending,  // Makes the texture darken based on the background
  transparent: true,
  opacity: 0.8,
  alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
  // alphaTest: 0.3,
});
const cloud_mesh = new THREE.Mesh(geo, cloud_mat);
cloud_mesh.scale.setScalar(1.003)
earthGroup.add(cloud_mesh);

// glow
const fresneMat = getFresnelMat()
const glow_mesh = new THREE.Mesh(geo, fresneMat);
glow_mesh.scale.setScalar(1.01)
earthGroup.add(glow_mesh);


//stars
const stars = getStarfield({ numStars: 2000 });
scene.add(stars)

// light
const hemiLight = new THREE.DirectionalLight(0xffffff,2.0); // Blue sky color (0x0099ff), greenish ground color (0x00CC33), intensity of 1
hemiLight.position.set(-2,0.5,1.5)
scene.add(hemiLight);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.063;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.002;  // Rotate object to make it animate
  light_mesh.rotation.y += 0.002;  // Rotate object to make it animate
  cloud_mesh.rotation.y += 0.0023; 
  glow_mesh.rotation.y += 0.002;
  stars.rotation.y -= 0.002;
  renderer.render(scene, camera); // render scene camera
  controls.update()

}

animate();
