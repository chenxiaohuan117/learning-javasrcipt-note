import * as THREE from 'three'

// 1-2 添加材质、光源和阴影效果

/**
 * 1）材质：基本材质MeshBasicMaterial不会对光源有任何反应，只会使用指定的颜色来渲染物体；
 * 		   材质MeshLambertMaterial、MeshPhysicalMaterial、MeshStandardMaterial在渲染时会对光源产生反应。
 * 2）光源：并不是所有的光源都能够产生阴影,但是通过THREE.SpotLight定义的光源是能够产生阴影的。
 * 3）阴影：首先设置渲染器的shadowMap.enabled属性为true；
 * 		   然后指定哪些物体投射阴影，哪些物体接受阴影；
 *         最后设置光源的castShadow属性为true。
 **/

export default function(id) {
	// 定义场景
	const scene = new THREE.Scene();
	// 定义摄像机
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	// 定义渲染器
	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color('#f5f5f5'));
	renderer.setSize(window.innerWidth, window.innerHeight);
	// 渲染阴影效果
	renderer.shadowMap.enabled = true;
	// 创建一个立方体
	createCube(scene);
	// 创建一个球体
	createSphere(scene);
	// 创建一个平面
	createPlane(scene);
	// 定位摄像机
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	// 使用lookAt方法使摄像机指向场景的中心，默认状态下摄像机指向(0, 0, 0)位置
	camera.lookAt(scene.position);
	//定义光源
	const spotLight = new THREE.SpotLight('#fffcc4');
	// 从设置的光源位置照射场景
	spotLight.position.set(-40, 40, -15);
	// 启动阴影功能
	spotLight.castShadow = true;
	// 控制阴影的精细程度
	spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
	spotLight.shadow.camera.far = 130;
	spotLight.shadow.camera.near = 40;
	scene.add(spotLight);
	// 定义环境光源
	const ambienLight = new THREE.AmbientLight('#500');
	scene.add(ambienLight);
	//将渲染的结果添加到html元素中
	document.getElementById(id).appendChild(renderer.domElement);
	//最后告诉渲染器使用指定的摄像机来渲染场景
	renderer.render(scene, camera);
}

// 创建一个立方体
function createCube(scene) {
	const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	const cubeMaterial = new THREE.MeshLambertMaterial({
		color: '#f00'
	});
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;// 投射阴影
	cube.position.x = -4;
	cube.position.y = 2;
	cube.position.z = 0;
	scene.add(cube);
}

// 创建一个球体
function createSphere(scene) {
	const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	const sphereMaterial = new THREE.MeshLambertMaterial({
		color: '#55007f'
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.x = 20;
	sphere.position.y = 4;
	sphere.position.z = 2;
	sphere.castShadow = true;// 投射阴影
	scene.add(sphere);
}

// 创建一个平面
function createPlane(scene) {
	const planeGeometry = new THREE.PlaneGeometry(60, 20);
	const planeMaterial = new THREE.MeshLambertMaterial({
		color: '#ccc'
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.set(15, 0, 0);
	plane.receiveShadow = true;// 接受阴影
	scene.add(plane);
}
