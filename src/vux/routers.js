'use strict'

export default function(router) {
	router.map({
		'/home': {
			name : 'home',
			component: require('../mods/home.vue')
		},
		'/plugin/:name': {
			name : 'plugin',
			component: require('../mods/plugin.vue')
		}
	})
}