import * as THREE from 'three'
import * as dat from 'dat.gui'
import {initStats, initTrackballControls} from '../util'

// 2-1 场景

/**
 * 场景中常用的属性和方法：
 * 
 * add(object)方法：用于向场景中添加对象，使用该方法还可以创建对象组
 * children属性：用于返回一个场景中所有对象的列表，包括摄像机和光源
 * name属性：在创建对象时可以指定唯一的标识name
 * getObjectByName(name, recursive)方法：使用该方法可以查找特定名字的对象
 * remove(object)方法：使用该方法可以将对象从场景中移除
 * traverse(function)方法：该方法可以遍历调用者和调用者的所有后代，function参数是一个函数，被调用者和每一个后代对象调用function方法
 * fog属性：使用该属性可以为整个场景添加雾化效果
 * overrideMaterial属性：使用该属性可以强制场景中的所有物体使用相同的材质
 */

export default function(id) {
	
	const stats = initStats();
	
	const scene = new THREE.Scene();
	
	// 添加雾化效果
	// 雾化呈指数增长
	// scene.fog = new THREE.FogExp2('#fff', 0.02);
	// 雾化呈线性增长
	scene.fog = new THREE.Fog('#fff', 0.015, 100);
	// 强制场景中的所有物体使用相同的材质
	scene.overrideMaterial = new THREE.MeshLambertMaterial({
		color: '#f00'
	});
	
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color('#000'));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	
	const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
	const planeMaterial = new THREE.MeshLambertMaterial({
		color: '#fff'
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;
	scene.add(plane);
	
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
	
	const ambientLight = new THREE.AmbientLight('#3c3c3c');
	scene.add(ambientLight);
	
	const spotLight = new THREE.SpotLight('#fff', 1.2, 150, 120);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);
	
	document.getElementById(id).appendChild(renderer.domElement);
	
	const controls = new function() {
		this.rotationSpeed = 0.02;
		this.numberOfObjects = scene.children.length;
		// 移除最后添加到场景中的对象
		this.removeCube = function() {
			let allChildren = scene.children;
			let lastObject = allChildren[allChildren.length - 1];
			if (lastObject instanceof THREE.Mesh) {
				scene.remove(lastObject);
				this.numberOfObjects = scene.children.length;
			}
		};
		// 添加一个立方体
		this.addCube = function() {
			const cubeSize = Math.ceil((Math.random() * 3));
			const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
			const cubeMaterial = new THREE.MeshLambertMaterial({
				color: Math.random() * 0xffffff
			});
			const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.castShadow = true;
			cube.name = "cube-" + scene.children.length;// 为立方体指定名字
			cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
			cube.position.y = Math.round((Math.random() * 5));
			cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
			scene.add(cube);
			this.numberOfObjects = scene.children.length;
		};
		// 打印场景对象
		this.outputObjects = function() {
			console.log(scene.children);
			let nm = 'cube-' + Math.ceil((Math.random() * (scene.children.length - 1)));
			if (scene.getObjectByName(nm)) {
				console.log(scene.getObjectByName(nm));
			}
		}
	};
	
	const gui = new dat.GUI();
	gui.add(controls, 'rotationSpeed', 0, 0.5);
	gui.add(controls, 'addCube');
	gui.add(controls, 'removeCube');
	gui.add(controls, 'outputObjects');
	gui.add(controls, 'numberOfObjects').listen();
	
	const trackballControls = initTrackballControls(camera, renderer);
	const clock = new THREE.Clock();
	
	render();

	function render() {
		trackballControls.update(clock.getDelta());
		stats.update();
		scene.traverse(e => {
			if (e instanceof THREE.Mesh && e != plane) {
				e.rotation.x += controls.rotationSpeed;
				e.rotation.y += controls.rotationSpeed;
				e.rotation.z += controls.rotationSpeed;
			}
		});
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
}
