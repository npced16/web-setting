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
		path: "/login",
		name: "login",
		component: loginView,
		// component: () => require("../components//view/LoginView.vue"),
	},
	{
		path: "/settingPage",
		name: "settingPage",
		component: ThePageSettingView,
		props: (route) => ({ ...route.params, id: "" }), // 기존 경로 유지하면서 props 전달
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
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
