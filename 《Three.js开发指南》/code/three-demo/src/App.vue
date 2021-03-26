<template>
	<div class="app">
		<div id="container"></div>
	</div>
</template>

<script>
	// import test11 from './modules/test-1-1.js'
	// import test12 from './modules/test-1-2.js'
	import test13 from './modules/test-1-3.js'
	
	export default {
		name: 'App',
		mounted(){
			// test11('container');
			// test12('container');
			test13('container');
		}
	}
</script>

<style>
	@import './common.css'
</style>
