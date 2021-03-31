import * as THREE from 'three'
import * as dat from 'dat.gui'
import {initStats, initRenderer, initCamera, addHouseAndTree} from '../util'

// 3-1 光源：THREE.AmbientLight(环境光源)

/**
 * 在创建THREE.AmbientLight时，颜色会应用到全局。该光源没有特别的来源方向，且不会生成阴影。
 * 通常不能将该光源作为场景中唯一的光源，因为它会将场景中的所有物体渲染为相同的颜色，而不管是什么形状。
 * 在使用其他光源（如THREE.SpotLight或THREE.DirectionalLight）的同时使用它，目的是弱化阴影或给场景添加一些额外的颜色。
 * 环境光类的构造函数有一个可选参数intensity，用于指定光的强度，默认值为1。
 * */

export default function(id) {
	const stats = initStats();
	const renderer = initRenderer(id);
	const camera = initCamera();
	const scene = new THREE.Scene();

	const ambientLight = new THREE.AmbientLight("#606008");
	scene.add(ambientLight);

	const spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
	spotLight.shadow.mapSize.set(2048, 2048);
	spotLight.position.set(-30, 40, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);

	addHouseAndTree(scene);

	setupControls();

	render();

	function render() {
		stats.update();
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function setupControls() {
		const controls = new function() {
			this.intensity = ambientLight.intensity;
			this.ambientColor = ambientLight.color.getStyle();
			this.disableSpotlight = false;
		};

		const gui = new dat.GUI();
		gui.add(controls, 'intensity', 0, 3, 0.1).onChange(function() {
			ambientLight.intensity = controls.intensity;
		});
		gui.addColor(controls, 'ambientColor').onChange(function() {
			ambientLight.color = new THREE.Color(controls.ambientColor);
		});
		gui.add(controls, 'disableSpotlight').onChange(function(e) {
			spotLight.visible = !e;
		});

		return controls;
	}
}
