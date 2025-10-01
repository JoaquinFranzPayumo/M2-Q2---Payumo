// === Scene Setup ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Texture Loader ===
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('./textures/wood.jpg');
const metalTexture = textureLoader.load('./textures/metal.jpg');
const marbleTexture = textureLoader.load('./textures/marble.jpg');

// === Materials ===
const woodMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
const metalMaterial = new THREE.MeshPhongMaterial({ map: metalTexture, shininess: 100 });
const marbleMaterial = new THREE.MeshLambertMaterial({ map: marbleTexture });

// === Room ===
const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), woodMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), marbleMaterial);
backWall.position.set(0, 5, -10);
scene.add(backWall);

const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), marbleMaterial);
sideWall.rotation.y = Math.PI / 2;
sideWall.position.set(-10, 5, 0);
scene.add(sideWall);

// === Table ===
const tableTop = new THREE.Mesh(new THREE.BoxGeometry(5, 0.3, 3), woodMaterial);
tableTop.position.set(0, 2, 0);
scene.add(tableTop);

const makeLeg = (x, z) => {
  const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2), metalMaterial);
  leg.position.set(x, 1, z);
  scene.add(leg);
};
makeLeg(-2, -1.3); makeLeg(2, -1.3); makeLeg(-2, 1.3); makeLeg(2, 1.3);

// === Cup ===
const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32), marbleMaterial);
cup.position.set(0, 2.8, 0);
scene.add(cup);

// === Counter / Bar ===
const counter = new THREE.Mesh(new THREE.BoxGeometry(8, 2.5, 2), woodMaterial);
counter.position.set(-6, 1.25, 5);
scene.add(counter);

// === Stools ===
for (let i = -2; i <= 2; i += 2) {
  const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.2, 32), marbleMaterial);
  seat.position.set(-6, 2.6, 5 + i);
  scene.add(seat);

  const stoolLegs = [
    new THREE.Vector3(-6.4, 1.3, 5 + i - 0.4),
    new THREE.Vector3(-5.6, 1.3, 5 + i - 0.4),
    new THREE.Vector3(-6.4, 1.3, 5 + i + 0.4),
    new THREE.Vector3(-5.6, 1.3, 5 + i + 0.4)
  ];
  stoolLegs.forEach(pos => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.6), metalMaterial);
    leg.position.copy(pos);
    scene.add(leg);
  });
}

// === Shelf with Jars ===
const shelf = new THREE.Mesh(new THREE.BoxGeometry(6, 0.3, 1), woodMaterial);
shelf.position.set(-5, 4, -5);
scene.add(shelf);

for (let j = -2; j <= 2; j++) {
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16), metalMaterial);
  jar.position.set(-5, 4.5, -5 + j * 0.4);
  scene.add(jar);
}

// === Hanging Lamp ===
const lampShade = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), metalMaterial);
lampShade.position.set(0, 9, 0);
lampShade.rotation.x = Math.PI;
scene.add(lampShade);

const bulbMaterial = new THREE.MeshStandardMaterial({ color: 0xffffaa, emissive: 0xffff55 });
const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), bulbMaterial);
bulb.position.set(0, 8, 0);
scene.add(bulb);

const bulbLight = new THREE.PointLight(0xffeeaa, 1.2, 10);
bulbLight.position.set(0, 8, 0);
scene.add(bulbLight);

// === Lighting ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffaa55, 1, 20);
pointLight.position.set(0, 8, 0);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// === Camera ===
camera.position.set(10, 6, 12);
camera.lookAt(0, 2, 0);

// === Resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// === Animate ===
function animate() {
  requestAnimationFrame(animate);
  cup.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
