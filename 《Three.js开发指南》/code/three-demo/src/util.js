//用于检测动画运行时的帧数
import Stats from './libs/Stats'
//控制器库，可以利用鼠标任意移动摄像机，以便从不同角度观察场景
import TrackballControls from 'three-trackballcontrols'

export function initStats(type) {
	// 0: fps, 1: ms, 2: mb, 3+: custom
	const panelType = (typeof type !== 'undefined' && type && !isNaN(type)) ? parseInt(type) : 0;
	const stats = new Stats();
	stats.showPanel(panelType); 
	document.body.appendChild(stats.dom);
	return stats;
}

export function initTrackballControls(camera, renderer) {
    const trackballControls = new TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];
    return trackballControls;
}