import { createApp } from 'vue'
import './scss/app.scss'
import App from './App.vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshPhysicalMaterial( {color: 0x4f97c4});
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const loader = new GLTFLoader();

loader.load( './src/assets/3d/Another_bedroom.glb', function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.rotation.y = -3;

}, undefined, function ( error ) {

	console.error( error );

} );


const light = new THREE.AmbientLight( 0xffffff, 1.0 );
scene.add( light );

const lightP = new THREE.PointLight( 0xffffff, 30, 10 );
lightP.position.set( 0, 4, 0 );
scene.add( lightP );

scene.background = new THREE.Color( 0xf7ba3e );

camera.position.set(-10,5,20);
camera.rotation.y = -0.5;



const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    

    controls.update();

    renderer.render(scene, camera);
}

animate();

createApp(App).mount('#app')
