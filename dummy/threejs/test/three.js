const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.insertAdjacentElement("beforeend", renderer.domElement);

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({color: 0xf08080});
let cube = new THREE.Mesh(geometry, material);
cube.position.z = -5;
cube.rotation.x = Math.PI / 4;
cube.rotation.y = Math.PI / 3;
scene.add(cube);
renderer.render(scene, camera);

function animate() {
    cube.rotation.x += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();