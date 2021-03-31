import * as THREE from 'three'
import * as dat from 'dat.gui'
import {initStats, initRenderer, initCamera, initTrackballControls, addHouseAndTree} from '../util'

// 3-3 光源：THREE.PointLight(点光源)

/**
 * THREE.PointLight是一种单点发光，照射所有方向的光源。
 * THREE.PointLight在旧版Three.js不产生阴影，在新版Three.js会产生阴影。
 * 夜空中的照明弹就是一个很好的点光源的例子。
 * 
 * 相关属性：
 * 
 * color：颜色，光源颜色
 * distance：距离，光源照射的距离。默认值为0，光的强度不会随着距离增加而减少
 * intensity：强度，光源照射的强度，默认值为1
 * position：位置，光源在场景中的位置
 * visible：是否可见，默认值true，可见；值为false时，不可见
 * decay：衰减，光源强度随着离开光源的距离而衰减的速度；
 * 		  该值为2时更接近现实世界中的效果，默认值为1；
 *        只有当WebGLRenderer的属性physicallyCorrectLights(物理正确光源)被设置为启动时，decay属性才生效。
 * power：功率，只有当WebGLRenderer的属性physicallyCorrectLights(物理正确光源)被设置为启动时，
 * 		  该属性指定光源的功率，以流明为单位，默认值为4*Math.PI。
 * 		  该属性与intensity属性为简单的线性关系(power = intensity * 4π)
 * */

export default function(id) {
	const stats = initStats();
	const renderer = initRenderer(id);
	const camera = initCamera();
	const trackballControls = initTrackballControls(camera, renderer);
	const clock = new THREE.Clock();
	const scene = new THREE.Scene();

	addHouseAndTree(scene)

	const ambientLight = new THREE.AmbientLight("#0c0c0c");
	scene.add(ambientLight);
	
	const pointColor = "#cfc";
	const pointLight = new THREE.PointLight(pointColor);
	pointLight.decay = 0.1
	pointLight.castShadow = true;
	scene.add(pointLight);

	const helper = new THREE.PointLightHelper(pointLight);
	// scene.add(helper);

	const shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera);
	// scene.add(shadowHelper);

	const sphereLight = new THREE.SphereGeometry(0.2);
	const sphereLightMaterial = new THREE.MeshBasicMaterial({
		color: 0xac6c25
	});
	const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
	sphereLightMesh.position.set(new THREE.Vector3(3, 0, 5));
	scene.add(sphereLightMesh);

	let invert = 1;
	let phase = 0;

	const controls = setupControls();
	
	render();

	function render() {
		helper.update();
		
		shadowHelper.update();
		
		stats.update();
		
		pointLight.position.copy(sphereLightMesh.position);
		
		trackballControls.update(clock.getDelta());
		
		if (phase > 2 * Math.PI) {
			invert = invert * -1;
			phase -= 2 * Math.PI;
		} else {
			phase += controls.rotationSpeed;
		}
		
		sphereLightMesh.position.z = +(25 * (Math.sin(phase)));
		sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
		sphereLightMesh.position.y = 5;
		
		if (invert < 0) {
			let pivot = 14;
			sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
		}
		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function setupControls() {
		const controls = new function() {
			this.rotationSpeed = 0.01;
			this.bouncingSpeed = 0.03;
			this.ambientColor = ambientLight.color.getStyle();
			this.pointColor = pointLight.color.getStyle();
			this.intensity = 1;
			this.distance = pointLight.distance;
		};

		const gui = new dat.GUI();
		gui.addColor(controls, 'ambientColor').onChange(function(e) {
			ambientLight.color = new THREE.Color(e);
		});
		gui.addColor(controls, 'pointColor').onChange(function(e) {
			pointLight.color = new THREE.Color(e);
		});
		gui.add(controls, 'distance', 0, 100).onChange(function(e) {
			pointLight.distance = e;
		});
		gui.add(controls, 'intensity', 0, 3).onChange(function(e) {
			pointLight.intensity = e;
		});

		return controls;
	}
}
