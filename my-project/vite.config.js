import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: [
			{ find: "@", replacement: path.resolve(__dirname, "src") },
			{
				find: "@components",
				replacement: path.resolve(__dirname, "src/components"),
			},
			{
				find: "@view",
				replacement: path.resolve(__dirname, "src/view"),
			},
			{
				find: "@modal",
				replacement: path.resolve(__dirname, "src/modal"),
			},
		],
	},
});
