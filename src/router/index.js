// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import ThePageSettingView from "@view/ThePageSettingView.vue";
import loginView from "@view/loginView.vue";
import TheRoomView from "@view/TheRoomManagementView.vue";
import TheWardManagementView from "@view/TheWardManagementView.vue";
import TheAccountManagementView from "@view/TheAccountManagementView.vue";
import TheSpaceManagementView from "@view/TheSpaceManagementView.vue";
const routes = [
	{
		path: "/",
		name: "home",
		children: [
			{
				path: "/settingPage",
				name: "settingPage",
				component: ThePageSettingView,
			},
			{
				path: "/settingWard",
				name: "settingWard",
				component: TheWardManagementView,
			},
			{
				path: "/settingAccount",
				name: "settingAccount",
				component: TheAccountManagementView,
			},
			{
				path: "/settingSpace",
				name: "settingSpace",
				component: TheSpaceManagementView,
			},
			{
				path: "/settingRoom",
				name: "settingRoom",
				component: TheRoomView,
			},
		],
	},
	{
		path: "/login",
		name: "login",
		component: loginView,
		// component: () => require("../components//view/LoginView.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
