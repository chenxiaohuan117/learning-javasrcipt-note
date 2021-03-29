import * as THREE from 'three'
import * as dat from 'dat.gui'
import {initStats, initTrackballControls} from '../util'

// 2-2 摄像机

/**
 * Three.js库提供了两种不同的摄像机：正交投影摄像机和透视投影摄像机。
 * Three.js还提供了一些非常特殊的摄像机用于支持3D眼镜和VR设备。
 * 
 * 1）正交投影摄像机
 * 
 * 使用正交投影摄像机的话，所有的立方体被渲染出来的尺寸都是一样的，
 * 因为对象相对于摄像机的距离对渲染的结果是没有影响的。
 * 这种摄像机通常被用于二维游戏中。
 * 
 * 2）透视投影摄像机
 * 
 * 使用透视投影摄影机的话，立方体距离摄像机越远，它们就会被渲染得越小。
 * 
 * 3）将摄像机聚焦在指定点上
 */

export default function(id) {

	const stats = initStats();

	const scene = new THREE.Scene();

	let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.x = 120;
	camera.position.y = 60;
	camera.position.z = 180;

	const renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color('#fff'));
	renderer.setSize(window.innerWidth, window.innerHeight);

	const planeGeometry = new THREE.PlaneGeometry(180, 180);
	const planeMaterial = new THREE.MeshLambertMaterial({
		color: '#fff'
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;

	scene.add(plane);

	const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

	for (let j = 0; j < (planeGeometry.parameters.height / 5); j++) {
		for (let i = 0; i < (planeGeometry.parameters.width / 5); i++) {
			const rnd = Math.random() * 0.75 + 0.25;
			const cubeMaterial = new THREE.MeshLambertMaterial();
			cubeMaterial.color = new THREE.Color(rnd, 0, 0);
			const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);
			cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
			cube.position.y = 2;
			scene.add(cube);
		}
	}
	const lookAtGeom = new THREE.SphereGeometry(2);
	const lookAtMesh = new THREE.Mesh(lookAtGeom, new THREE.MeshLambertMaterial({color: '#0f0'}));
	scene.add(lookAtMesh);
	
	const directionalLight = new THREE.DirectionalLight('#fff', 0.7);
	directionalLight.position.set(-20, 40, 60);
	scene.add(directionalLight);

	const ambientLight = new THREE.AmbientLight('#292929');
	scene.add(ambientLight);

	document.getElementById(id).appendChild(renderer.domElement);

	let trackballControls
	const controls = new function() {
		this.cameraType = "Perspective";
		this.switchCamera = function() {
			if (camera instanceof THREE.PerspectiveCamera) {
				camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window
					.innerHeight / 16, window.innerHeight / -16, -200, 500);
				camera.position.x = 120;
				camera.position.y = 60;
				camera.position.z = 180;
				camera.lookAt(scene.position);
				trackballControls = initTrackballControls(camera, renderer);
				this.cameraType = "Orthographic";
			} else {
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
				camera.position.x = 120;
				camera.position.y = 60;
				camera.position.z = 180;
				camera.lookAt(scene.position);
				trackballControls = initTrackballControls(camera, renderer);
				this.cameraType = "Perspective";
			}
		};
	};

	const gui = new dat.GUI();
	gui.add(controls, 'switchCamera');
	gui.add(controls, 'cameraType').listen();

	// camera.lookAt(scene.position);

	trackballControls = initTrackballControls(camera, renderer);
	const clock = new THREE.Clock();

	render();

	let step = 0;

	function render() {
		trackballControls.update(clock.getDelta());
		stats.update();

		step += 0.02;
		if (camera instanceof THREE.Camera) {
			const x = 10 + (100 * (Math.sin(step)));
			camera.lookAt(new THREE.Vector3(x, 10, 0));
			lookAtMesh.position.copy(new THREE.Vector3(x, 10, 0));
		}

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
}
