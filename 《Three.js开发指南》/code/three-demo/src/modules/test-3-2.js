import * as THREE from 'three'
import * as dat from 'dat.gui'
import {initStats, initRenderer, initCamera, addDefaultCubeAndSphere, addGroundPlane} from '../util'

// 3-2 光源：THREE.SpotLight(聚光灯光源)

/**
 * THREE.SpotLight是一种具有锥形效果的光源。
 * 该光源产生的光具有方向和角度。
 * 可以把它与手电筒或灯塔产生的光进行对比。
 * 
 * 光照相关的属性：
 * 
 * angle：角度，光源发射出的光束的宽度，单位是弧度，默认值为Math.PI/3。
 * castShadow：投影，设置为true时，这个光源就会生成阴影。
 * color：颜色，光源颜色。
 * decay：衰减，光源强度随着离开光源的距离而衰减的速度；
 * 		  该值为2时更接近现实世界中的效果，默认值为1；
 *        只有当WebGLRenderer的属性physicallyCorrectLights(物理正确光源)被设置为启动时，decay属性才生效。
 * distance：距离，光源照射的距离，默认值为0。光线强度不会随着距离增加而减弱。
 * intensity：强度，光源照射的强度，默认值为1。
 * penumbra：半影区，该属性设置聚光灯的锥形照明区域在其区域边缘附近的平滑衰减速度。
 * 			 取值范围在0~1之间，默认值0.
 * position：位置，光源在场景中的位置。
 * power：功率，只有当WebGLRenderer的属性physicallyCorrectLights(物理正确光源)被设置为启动时，
 * 		  该属性指定光源的功率，以流明为单位，默认值为4*Math.PI。
 * target：目标，可以将THREE.SpotLight光源指向场景中的特定对象或位置。
 * 		   此属性需要一个THREE.Object3D对象(如THREE.Mesh)。
 * visible：是否可见，默认值true,光源打开；值为false时，光源关闭。
 * 
 * 阴影相关的属性：
 * 
 * shadow.bias：阴影偏移，用来偏置阴影的位置，默认值为0。
 * 				遇到一些奇怪的阴影效果时，将该属性设置为很小的值(例如0.01)通常可以解决问题。
 * shadow.camera.far：投影远点，到距离光源的哪一个位置可以生成阴影，默认值为5000。
 * shadow.camera.fov：投影视场，用于生成阴影的视场大小，默认值为50。
 * shadow.camera.near：投影近点，从距离光源的哪一个位置开始生成阴影，默认值为50。
 * shadow.mapSize.width：阴影映射宽度，默认值512。
 * shadow.mapSize.height：阴影映射高度，默认值512。
 * 						  决定了有多少像素用来生成阴影。
 * 						  当阴影具有锯齿状边缘或看起来不光滑时，可以增加这个值。
 * 						  在场景渲染之后无法更改。
 * shadow.radius：半径，当值大于1时，阴影的边缘将有平滑效果。
 * 				  该属性在THREE.WebGLRenderer的shadowMap.type属性为THREE.BasicShadowMap时无效。
 * */

export default function(id) {
	const stats = initStats();
	const renderer = initRenderer(id);
	const camera = initCamera();
	const scene = new THREE.Scene();

	const cubeAndSphere = addDefaultCubeAndSphere(scene);
	const cube = cubeAndSphere.cube;
	const sphere = cubeAndSphere.sphere;
	const plane = addGroundPlane(scene);

	const ambiColor = "#1c1c1c";
	const ambientLight = new THREE.AmbientLight(ambiColor);
	scene.add(ambientLight);
	
	// 光源瞄准空间中的任意一点
	const target = new THREE.Object3D();
	target.position.set(new THREE.Vector3(5, 0, 0));
	
	const spotLight0 = new THREE.SpotLight(0xcccccc);
	spotLight0.position.set(-40, 30, -10);
	spotLight0.target = target;
	spotLight0.lookAt(plane);
	scene.add(spotLight0);

	const spotLight = new THREE.SpotLight("#fff");
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 100;
	spotLight.target = plane;
	spotLight.distance = 0;
	spotLight.angle = 0.4;
	spotLight.shadow.camera.fov = 120;
	scene.add(spotLight);

	const debugCamera = new THREE.CameraHelper(spotLight.shadow.camera);

	const pp = new THREE.SpotLightHelper(spotLight);
	scene.add(pp);

	const sphereLight = new THREE.SphereGeometry(0.2);
	const sphereLightMaterial = new THREE.MeshBasicMaterial({
		color: 0xac6c25
	});
	const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
	sphereLightMesh.castShadow = true;

	sphereLightMesh.position.set(new THREE.Vector3(3, 20, 3));
	scene.add(sphereLightMesh);

	let step = 0;
	let invert = 1;
	let phase = 0;

	const controls = setupControls();

	render();

	function render() {
		stats.update();

		cube.rotation.x += controls.rotationSpeed;
		cube.rotation.y += controls.rotationSpeed;
		cube.rotation.z += controls.rotationSpeed;

		step += controls.bouncingSpeed;
		sphere.position.x = 20 + (10 * (Math.cos(step)));
		sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

		if (!controls.stopMovingLight) {
			if (phase > 2 * Math.PI) {
				invert = invert * -1;
				phase -= 2 * Math.PI;
			} else {
				phase += controls.rotationSpeed;
			}

			sphereLightMesh.position.z = +(7 * (Math.sin(phase)));
			sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
			sphereLightMesh.position.y = 15;

			if (invert < 0) {
				let pivot = 14;
				sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
			}

			spotLight.position.copy(sphereLightMesh.position);
		}

		pp.update();

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function setupControls() {
		const controls = new function() {
			this.rotationSpeed = 0.03;
			this.bouncingSpeed = 0.03;
			this.ambientColor = ambiColor;
			this.pointColor = spotLight.color.getStyle();
			this.intensity = 1;
			this.distance = 0;
			this.angle = 0.1;
			this.shadowDebug = false;
			this.castShadow = true;
			this.target = "Plane";
			this.stopMovingLight = false;
			this.penumbra = 0;
		};

		const gui = new dat.GUI();
		gui.addColor(controls, 'ambientColor').onChange(function(e) {
			ambientLight.color = new THREE.Color(e);
		});
		gui.addColor(controls, 'pointColor').onChange(function(e) {
			spotLight.color = new THREE.Color(e);
		});
		gui.add(controls, 'angle', 0, Math.PI * 2).onChange(function(e) {
			spotLight.angle = e;
		});
		gui.add(controls, 'intensity', 0, 5).onChange(function(e) {
			spotLight.intensity = e;
		});
		gui.add(controls, 'penumbra', 0, 1).onChange(function(e) {
			spotLight.penumbra = e;
		});
		gui.add(controls, 'distance', 0, 200).onChange(function(e) {
			spotLight.distance = e;
		});
		gui.add(controls, 'shadowDebug').onChange(function(e) {
			if (e) {
				scene.add(debugCamera);
			} else {
				scene.remove(debugCamera);
			}
		});
		gui.add(controls, 'castShadow').onChange(function(e) {
			spotLight.castShadow = e;
		});
		gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube', 'Other']).onChange(function(e) {
			switch (e) {
				case "Plane":
					spotLight.target = plane;
					break;
				case "Sphere":
					spotLight.target = sphere;
					break;
				case "Cube":
					spotLight.target = cube;
					break;
				case "Other":
					spotLight.target = target;
					break;	
			}
		});
		gui.add(controls, 'stopMovingLight').onChange(function(e) {
			controls.stopMovingLight = e;
		});

		return controls;
	}
}
