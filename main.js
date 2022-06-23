import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls;
//シーンを追加
scene = new THREE.Scene();

//カメラを追加(視野角,アスペクト比,開始距離,終了距離)
camera = new THREE.PerspectiveCamera(
  50,
  innerWidth / innerHeight,
  0.1,
  1000
);
//カメラの位置を設定
camera.position.set(0, 0, +500);

//レンダラーを追加
renderer = new THREE.WebGLRenderer({ alpha: true });
document.body.appendChild(renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

renderer.render(scene, camera);

//マウス操作を設定する
controls = new OrbitControls(camera, renderer.domElement);

//テクスチャを追加
let textures = new THREE.TextureLoader().load("./textures/earth.jpg");

//ジオメトリを作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

//マテリアルを作成 材質やカラーを設定
let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures });

//メッシュ化
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

//シーンに載せる
scene.add(ballMesh);

// 並行光源を追加する
let directionalLight = new THREE.DirectionalLight(0xffffff, 2);

//並行光源の位置を設定
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight);

//ポイント光源を追加 地球の周りで動かすためグローバル変数として宣言
pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(pointLight);

//ポイント光源の位置を設定
pointLight.position.set(-200, -200, -200);

//ポイント光源の位置を特定する
let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
scene.add(pointLightHelper);

//ポイント光源を球の周りを巡回させよう 座標を動的にする
function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  //シーンとカメラをレンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//animete関数の呼び出し
animate();
