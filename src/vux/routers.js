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
		// example文件夹内为组件演示
		'/toast': {
		    name : 'toast',
		    component: require('../mods/example/toast.vue')
		},
		'/dialog/:type': {
		    name : 'alert',
		    component: require('../mods/example/dialog.vue')
		}
	})
}