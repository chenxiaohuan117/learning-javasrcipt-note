import * as THREE from 'three'
// 可以创建出能够改变代码变量的界面组件
import * as dat from 'dat.gui'
import {initStats, initTrackballControls} from '../util'

// 1-3 让场景动起来

/**
 * 在HTML5和相关的JS API出现之前，是通过setInterval(function, interval)方法实现的。
 * 这个方法的缺点在于不管浏览器当前正在发生什么，它都会每隔interval毫秒执行一次；
 * 而且它没有和屏幕的刷新同步，导致较高的CPU使用率和性能不良。
 * 现代浏览器通过requestAnimationFrame()函数为稳定而连续的渲染场景提供了良好的解决方案。
 * 通过这个函数，可以向浏览器提供一个回调函数，无须定义回调间隔，浏览器将自行决定最佳回调时机。
 * */

export default function(id) {
	// 监听浏览器窗口大小
	window.addEventListener('resize', onResize, false);
	const stats = initStats();
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color('#f5f5f5'));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	// 创建一个平面
	const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
	const planeMaterial = new THREE.MeshLambertMaterial({
		color: '#ffff7f'
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;
	scene.add(plane);
	// 创建一个立方体
	const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	const cubeMaterial = new THREE.MeshLambertMaterial({
		color: '#f00'
	});
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;
	scene.add(cube);
	// 创建一个球体
	const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	const sphereMaterial = new THREE.MeshLambertMaterial({
		color: '#55007f'
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.x = 20;
	sphere.position.y = 0;
	sphere.position.z = 2;
	sphere.castShadow = true;
	scene.add(sphere);
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
	// 定义环境光源
	const ambienLight = new THREE.AmbientLight('#fffdaf');
	scene.add(ambienLight);
	// 定义光源
	const spotLight = new THREE.SpotLight('#fff');
	spotLight.position.set(-10, 20, -5);
	spotLight.castShadow = true;
	scene.add(spotLight);
	document.getElementById(id).appendChild(renderer.domElement);
	let step = 0;
	//保存通过dat.GUI改变的属性
	const controls = new function() {
		this.rotationSpeed = 0.02;
		this.bouncingSpeed = 0.03;
	};
	const gui = new dat.GUI();
	// 将设置属性的对象传递给dat.GUI对象,并设置属性的取值范围
	gui.add(controls, 'rotationSpeed', 0, 0.5);
	gui.add(controls, 'bouncingSpeed', 0, 0.5);
	const trackballControls = initTrackballControls(camera, renderer);
	const clock = new THREE.Clock();
	render();

	function render() {
		trackballControls.update(clock.getDelta());
		stats.update();
		// 设置立方体围绕轴进行旋转
		cube.rotation.x += controls.rotationSpeed;
		cube.rotation.y += controls.rotationSpeed;
		cube.rotation.z += controls.rotationSpeed;
		// 设置小球弹跳
		step += controls.bouncingSpeed;
		sphere.position.x = 20 + (10 * (Math.cos(step)));
		sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	
	// 场景对浏览器自适应
	function onResize() {
		// 表示屏幕的长宽比
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
