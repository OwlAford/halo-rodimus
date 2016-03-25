'use strict'

export default function(router) {
	router.map({
		'/home': {
			name : 'home',
			component: require('../mods/home.vue')
		},
		'/plugin': {
			name : 'plugin',
			component: require('../mods/plugin.vue')
		},
		'/doc': {
			name : 'doc',
			component: require('../mods/doc.vue')
		},
		// example文件夹内为组件演示
		'/toast': {
		    name : 'toast',
		    component: require('../mods/example/toast.vue')
		},
		'/dialog/:type': {
		    name : 'alert',
		    component: require('../mods/example/dialog.vue')
		},
		'/chart': {
		    name : 'chart',
		    component: require('../mods/example/chart.vue')
		},
		'/scroller': {
		    name : 'scroller',
		    component: require('../mods/example/scroller.vue')
		},
		'/swiper': {
		    name : 'swiper',
		    component: require('../mods/example/swiper.vue')
		},
		'/progress': {
		    name : 'progress',
		    component: require('../mods/example/progress.vue')
		},
		'/storage': {
		    name : 'storage',
		    component: require('../mods/example/storage.vue')
		},
		'/scrollload': {
		    name : 'scrollload',
		    component: require('../mods/example/scrollload.vue')
		},
		'/elastic': {
		    name : 'elastic',
		    component: require('../mods/example/elastic.vue')
		}
	})
}