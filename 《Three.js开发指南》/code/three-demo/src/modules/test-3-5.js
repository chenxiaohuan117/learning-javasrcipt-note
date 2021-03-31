import * as THREE from 'three'
import * as dat from 'dat.gui'
import {initStats, initRenderer, initCamera, initTrackballControls} from '../util'

// 3-5 光源：THREE.HemisphereLight(半球光光源)

/**
 * 这种光源可以为户外场景创建更加自然的光照效果。
 * 
 * 相关属性：
 * 
 * groundColor：从地面发出的光线的颜色
 * color：从天空发出的光线的颜色
 * intensity：光线照射的强度
 * */


export default function(id) {
	const stats = initStats();
	const renderer = initRenderer(id);
	const camera = initCamera();
	const trackballControls = initTrackballControls(camera, renderer);
	const clock = new THREE.Clock();
	const scene = new THREE.Scene();
	
	const textureGrass = new THREE.TextureLoader().load(require('../assets/images/grasslight-big.jpg'));
	textureGrass.wrapS = THREE.RepeatWrapping;
	textureGrass.wrapT = THREE.RepeatWrapping;
	textureGrass.repeat.set(10, 10);

	const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
	const planeMaterial = new THREE.MeshLambertMaterial({
		map: textureGrass
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
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

	const sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
	const sphereMaterial = new THREE.MeshPhongMaterial({
		color: 0x7777ff
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.x = 10;
	sphere.position.y = 5;
	sphere.position.z = 10;
	sphere.castShadow = true;
	scene.add(sphere);

	const spotLight0 = new THREE.SpotLight(0xcccccc);
	spotLight0.position.set(-40, 60, -10);
	spotLight0.lookAt(plane);
	scene.add(spotLight0);

	const target = new THREE.Object3D();
	target.position.set(new THREE.Vector3(5, 0, 0));

	const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
	hemiLight.position.set(0, 500, 0);
	scene.add(hemiLight);

	const pointColor = "#fff";
	const dirLight = new THREE.DirectionalLight(pointColor);
	dirLight.position.set(30, 10, -50);
	dirLight.castShadow = true;
	dirLight.target = plane;
	dirLight.shadow.camera.near = 0.1;
	dirLight.shadow.camera.far = 200;
	dirLight.shadow.camera.left = -50;
	dirLight.shadow.camera.right = 50;
	dirLight.shadow.camera.top = 50;
	dirLight.shadow.camera.bottom = -50;
	dirLight.shadow.mapSize.width = 2048;
	dirLight.shadow.mapSize.height = 2048;
	scene.add(dirLight);

	let step = 0;

	const controls = addControls();

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

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function addControls() {
		const controls = new function() {
			this.rotationSpeed = 0.03;
			this.bouncingSpeed = 0.03;
			this.hemisphere = true;
			this.color = 0x0000ff;
			this.groundColor = 0x00ff00;
			this.intensity = 0.6;
		};

		const gui = new dat.GUI();
		gui.add(controls, 'hemisphere').onChange(function(e) {
			if (!e) {
				hemiLight.intensity = 0;
			} else {
				hemiLight.intensity = controls.intensity;
			}
		});
		gui.addColor(controls, 'groundColor').onChange(function(e) {
			hemiLight.groundColor = new THREE.Color(e);
		});
		gui.addColor(controls, 'color').onChange(function(e) {
			hemiLight.color = new THREE.Color(e);
		});
		gui.add(controls, 'intensity', 0, 5).onChange(function(e) {
			hemiLight.intensity = e;
		});

		return controls;
	}
}
