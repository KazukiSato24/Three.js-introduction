import * as THREE from "./build/three.module.js";

let scene, camera, renderer;

//シーンを追加
scene = new THREE.Scene();

//カメラを追加(視野角,アスペクト比,開始距離,終了距離)
camera = new THREE.PerspectiveCamera(
  50,
  innerWidth / innerHeight,
  0.1,
  1000
);

//レンダラーを追加
renderer = new THREE.WebGLRenderer({ alpha: true });
document.body.appendChild(renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.render(scene, camera);
