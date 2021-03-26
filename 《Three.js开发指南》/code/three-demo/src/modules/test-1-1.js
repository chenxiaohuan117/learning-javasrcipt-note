import * as THREE from 'three'

// 1-1 渲染并查看三维对象

/**
 * 1）场景：一个容器，主要用于保存、跟踪所要渲染的物体和使用的光源
 * 2）摄像机：决定了能够在场景看到什么
 * 3）渲染器：会基于摄像机的角度来计算场景在浏览器中会渲染成什么样子，最后WebGLRenderer将会使用电脑显卡来渲染场景
 **/

export default function(id) {
	// 定义场景
	const scene = new THREE.Scene();
	// 定义摄像机
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	// 定义渲染器
	const renderer = new THREE.WebGLRenderer();
	// 设置场景的背景颜色
	renderer.setClearColor(new THREE.Color('#f5f5f5'));
	// 设置场景的大小
	renderer.setSize(window.innerWidth, window.innerHeight);
	// 创建坐标轴对象，设置轴线的粗细值为20
	const axes = new THREE.AxesHelper(20);
	// 将轴添加到场景中
	scene.add(axes);
	// 定义一个平面
	// 定义平面的大小，宽度设置为60，将高度设置为20
	const planeGeometry = new THREE.PlaneGeometry(60, 20);
	// 设置平面的外观，通过创建材质对象来设置平面的外观
	const planeMaterial = new THREE.MeshBasicMaterial({
		color: '#c2c8ff'
	});
	//将大小和外观组合进Mesh对象并赋值给平面变量
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	//先将平面围绕x轴旋转90度
	plane.rotation.x = -0.5 * Math.PI;
	//然后使用position属性来定义其在场景中的位置
	plane.position.set(15, 0, 0);
	//将平面添加到场景中
	scene.add(plane);
	//定义一个立方体
	const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	const cubeMaterial = new THREE.MeshBasicMaterial({
		color: '#f50',
		wireframe: true //线框属性
	});
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.set(-4, 3, 0);
	scene.add(cube);
	//定义一个球体
	const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	const sphereMaterial = new THREE.MeshBasicMaterial({
		color: '#ffd675',
		wireframe: true
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.set(20, 4, 2);
	scene.add(sphere);
	//使用x、y、z的位置属性来设置摄像机的位置
	camera.position.set(-30, 40, 30);
	//使用lookAt方法使摄像机指向场景的中心，默认状态下摄像机指向(0, 0, 0)位置
	camera.lookAt(scene.position);
	//将渲染的结果添加到html元素中
	document.getElementById(id).appendChild(renderer.domElement);
	//最后告诉渲染器使用指定的摄像机来渲染场景
	renderer.render(scene, camera);
}
