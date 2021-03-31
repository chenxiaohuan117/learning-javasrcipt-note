import * as THREE from 'three'
import * as dat from 'dat.gui'
import {LensflareElement, Lensflare} from '../../node_modules/three/examples/jsm/objects/Lensflare';
import {initStats, initRenderer, initCamera, initTrackballControls} from '../util'

// 3-7 光源：THREE.LensFlare(镜头光晕)

/**
 * 
 * @param texture： 纹理，就是一张图片，用来决定光晕的形状
 * @param size：尺寸，可以指定光晕多大。单位像素，如果指定为-1，则使用纹理本身的尺寸
 * @param distance：距离，从光源（0）到摄像机（1）的距离。使用这个参数可以将镜头光晕放置在正确的位置。
 * @param blending：混合，可以为光晕提供多种材质。镜头光晕默认的混合方式是THREE.AdditiveBlending
 * @param color：颜色，光晕的颜色
 * @param opacity：不透明度，0代表完全透明，1代表完全不透明。
 * 
 * new THREE.LensFlare(texture, size, distance, blending, color, opacity)
 * */

export default function(id) {
	const stats = initStats();
	const renderer = initRenderer(id, {
		alpha: true
	});
	const camera = initCamera();
	camera.position.x = -20;
	camera.position.y = 10;
	camera.position.z = 45;
	camera.lookAt(new THREE.Vector3(10, 0, 0));

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
	const sphereMaterial = new THREE.MeshLambertMaterial({
		color: 0x7777ff
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.x = 10;
	sphere.position.y = 5;
	sphere.position.z = 10;
	sphere.castShadow = true;
	scene.add(sphere);

	const ambiColor = "#1c1c1c";
	const ambientLight = new THREE.AmbientLight(ambiColor);
	scene.add(ambientLight);

	const spotLight0 = new THREE.SpotLight(0xcccccc);
	spotLight0.position.set(-40, 60, -10);
	spotLight0.lookAt(plane);
	scene.add(spotLight0);


	const target = new THREE.Object3D();
	target.position.set(new THREE.Vector3(5, 0, 0));


	const pointColor = "#fff";
	// const spotLight = new THREE.SpotLight( pointColor);
	const spotLight = new THREE.DirectionalLight(pointColor);
	spotLight.position.set(30, 10, -50);
	spotLight.castShadow = true;
	spotLight.shadow.camera.near = 0.1;
	spotLight.shadow.camera.far = 100;
	spotLight.shadow.camera.fov = 50;
	spotLight.target = plane;
	spotLight.distance = 0;
	spotLight.shadow.camera.near = 2;
	spotLight.shadow.camera.far = 200;
	spotLight.shadow.camera.left = -100;
	spotLight.shadow.camera.right = 100;
	spotLight.shadow.camera.top = 100;
	spotLight.shadow.camera.bottom = -100;
	spotLight.shadow.mapSize.width = 2048;
	spotLight.shadow.mapSize.height = 2048;
	scene.add(spotLight);

	let step = 0;

	const controls = new function() {
		this.rotationSpeed = 0.03;
		this.bouncingSpeed = 0.03;
		this.ambientColor = ambiColor;
		this.pointColor = pointColor;
		this.intensity = 0.1;
		this.distance = 0;
		this.exponent = 30;
		this.angle = 0.1;
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
		spotLight.color = new THREE.Color(e);
	});
	gui.add(controls, 'intensity', 0, 5).onChange(function(e) {
		spotLight.intensity = e;
	});


	const textureFlare0 = new THREE.TextureLoader().load(require('../assets/images/lensflare0.png'));
	const textureFlare3 = new THREE.TextureLoader().load(require('../assets/images/lensflare3.png'));
	const flareColor = new THREE.Color(0xffaacc);
	const lensFlare = new Lensflare();
	lensFlare.addElement(new LensflareElement(textureFlare0, 350, 0.0, flareColor));
	lensFlare.addElement(new LensflareElement(textureFlare3, 60, 0.6, flareColor));
	lensFlare.addElement(new LensflareElement(textureFlare3, 70, 0.7, flareColor));
	lensFlare.addElement(new LensflareElement(textureFlare3, 120, 0.9, flareColor));
	lensFlare.addElement(new LensflareElement(textureFlare3, 70, 1.0, flareColor));
	spotLight.add(lensFlare);

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
}
