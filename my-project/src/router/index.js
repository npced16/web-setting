// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import ThePageSettingView from "@/components/ThePageSettingView.vue";
import loginView from "@/components/loginView.vue";
import TheAccountManagementView from "@/components/TheAccountManagementView.vue";
const routes = [
	{
		path: "/home",
		name: "home",
		children: [
			{
				path: "/settingWard",
				name: "settingWard",
				component: ThePageSettingView,
			},
			{
				path: "/settingAccount",
				name: "settingAccount",
				component: TheAccountManagementView,
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
