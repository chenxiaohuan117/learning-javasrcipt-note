import * as THREE from 'three'
import * as dat from 'dat.gui'
import {initStats, initRenderer, initCamera, initTrackballControls} from '../util'

// 3-4 光源：THREE.DirectionalLight(平行光)

/**
 * 
 * THREE.DirectionalLight可以看作是距离很远的光，它发出的所有光线都是相互平行的。
 * 平行光的一个范例就是太阳光，太阳很遥远，以至于到达地球时所有的光线（几乎）都是相互平行的。
 * 被平行光照亮的整个区域接收到的光强是一样的。
 * THREE.DirectionalLight对象和THREE.SpotLight对象有许多属性相同。
 * 例如：position、target、intensity、castShadow、shadow.camera.near、
 * shadow.camera.far、shadow.mapSize.width、shadow.mapSize.height和shadow.bias。
 * THREE.DirectionalLight的特有属性：
 * shadow.camera.left、shadow.camera.right、shadow.camera.top、shadow.camera.bottom
 * */

export default function(id) {
	const stats = initStats();
	const renderer = initRenderer(id);
	const camera = initCamera();
	camera.position.set(-80, 80, 80);
	const trackballControls = initTrackballControls(camera, renderer);
	const clock = new THREE.Clock();
	const scene = new THREE.Scene();

	const planeGeometry = new THREE.PlaneGeometry(600, 200, 20, 20);
	const planeMaterial = new THREE.MeshLambertMaterial({
		color: 0xffffff
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = -5;
	plane.position.z = 0;
	scene.add(plane);

	const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	const cubeMaterial = new THREE.MeshLambertMaterial({
		color: 0xff3333
	});
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;
	scene.add(cube);

	const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	const sphereMaterial = new THREE.MeshLambertMaterial({
		color: 0x7777ff
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.x = 20;
	sphere.position.y = 0;
	sphere.position.z = 2;
	sphere.castShadow = true;
	scene.add(sphere);

	const ambiColor = "#1c1c1c";
	const ambientLight = new THREE.AmbientLight(ambiColor);
	scene.add(ambientLight);

	const target = new THREE.Object3D();
	target.position.set(new THREE.Vector3(5, 0, 0));

	const pointColor = "#ff5808";
	const directionalLight = new THREE.DirectionalLight(pointColor);
	directionalLight.position.set(-40, 60, -10);
	directionalLight.castShadow = true;
	directionalLight.shadow.camera.near = 2;
	directionalLight.shadow.camera.far = 80;
	directionalLight.shadow.camera.left = -30;
	directionalLight.shadow.camera.right = 30;
	directionalLight.shadow.camera.top = 30;
	directionalLight.shadow.camera.bottom = -30;
	directionalLight.intensity = 0.5;
	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;
	scene.add(directionalLight);
	
	const shadowCamera = new THREE.CameraHelper(directionalLight.shadow.camera)

	const sphereLight = new THREE.SphereGeometry(0.2);
	const sphereLightMaterial = new THREE.MeshBasicMaterial({
		color: 0xac6c25
	});
	const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
	sphereLightMesh.castShadow = true;
	sphereLightMesh.position.set(new THREE.Vector3(3, 20, 3));
	scene.add(sphereLightMesh);

	let step = 0;

	const controls = new function() {
		this.rotationSpeed = 0.03;
		this.bouncingSpeed = 0.03;
		this.ambientColor = ambiColor;
		this.pointColor = pointColor;
		this.intensity = 0.5;
		this.debug = false;
		this.castShadow = true;
		this.onlyShadow = false;
		this.target = "Plane";
	};

	const gui = new dat.GUI();
	gui.addColor(controls, 'ambientColor').onChange(function(e) {
		ambientLight.color = new THREE.Color(e);
	});
	gui.addColor(controls, 'pointColor').onChange(function(e) {
		directionalLight.color = new THREE.Color(e);
	});
	gui.add(controls, 'intensity', 0, 5).onChange(function(e) {
		directionalLight.intensity = e;
	});
	gui.add(controls, 'debug').onChange(function(e) {
		e ? scene.add(shadowCamera) : scene.remove(shadowCamera);
	});
	gui.add(controls, 'castShadow').onChange(function(e) {
		directionalLight.castShadow = e;
	});
	gui.add(controls, 'onlyShadow').onChange(function(e) {
		directionalLight.onlyShadow = e;
	});
	gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(function(e) {
		switch (e) {
			case "Plane":
				directionalLight.target = plane;
				break;
			case "Sphere":
				directionalLight.target = sphere;
				break;
			case "Cube":
				directionalLight.target = cube;
				break;
		}
	});

	render();

	function render() {
		stats.update();
		trackballControls.update(clock.getDelta());

		cube.rotation.x += controls.rotationSpeed;
		cube.rotation.y += controls.rotationSpeed;
		cube.rotation.z += controls.rotationSpeed;

		step += controls.bouncingSpeed;
		sphere.position.x = 20 + (10 * (Math.cos(step)));
		sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

		sphereLightMesh.position.z = -8;
		sphereLightMesh.position.y = +(27 * (Math.sin(step / 3)));
		sphereLightMesh.position.x = 10 + (26 * (Math.cos(step / 3)));

		directionalLight.position.copy(sphereLightMesh.position);

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
}
