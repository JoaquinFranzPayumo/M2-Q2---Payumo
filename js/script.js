// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('./textures/wood.jpg');
const metalTexture = textureLoader.load('./textures/metal.jpg');
const marbleTexture = textureLoader.load('./textures/marble.jpg');

// Materials
const woodMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
const metalMaterial = new THREE.MeshPhongMaterial({ map: metalTexture, shininess: 100 });
const marbleMaterial = new THREE.MeshLambertMaterial({ map: marbleTexture });

// Room (floor + walls)
const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), woodMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), marbleMaterial);
backWall.position.z = -10;
backWall.position.y = 5;
scene.add(backWall);

const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), marbleMaterial);
sideWall.rotation.y = Math.PI / 2;
sideWall.position.x = -10;
sideWall.position.y = 5;
scene.add(sideWall);

// Table
const tableTop = new THREE.Mesh(new THREE.BoxGeometry(5, 0.3, 3), woodMaterial);
tableTop.position.set(0, 2, 0);
scene.add(tableTop);

const tableLeg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2), metalMaterial);
tableLeg1.position.set(-2, 1, -1.3);
scene.add(tableLeg1);

const tableLeg2 = tableLeg1.clone(); tableLeg2.position.set(2, 1, -1.3); scene.add(tableLeg2);
const tableLeg3 = tableLeg1.clone(); tableLeg3.position.set(-2, 1, 1.3); scene.add(tableLeg3);
const tableLeg4 = tableLeg1.clone(); tableLeg4.position.set(2, 1, 1.3); scene.add(tableLeg4);

// Cup
const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32), marbleMaterial);
cup.position.set(0, 2.8, 0);
scene.add(cup);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffaa55, 1, 20);
pointLight.position.set(0, 8, 0);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Camera
camera.position.set(6, 5, 10);
camera.lookAt(0, 2, 0);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  cup.rotation.y += 0.01; // just to give life
  renderer.render(scene, camera);
}
animate();
