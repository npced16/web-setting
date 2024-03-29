import { defineStore } from "pinia";
import { ref } from "vue";
// import { ref } from "vue";
export const useClientStore = defineStore("client", () => {
	const server = "http://dev.finenurse.co.kr";
	// const server = ref("http://172.30.188.30");
	const version = "v1";
	// const key = "ku-guro";
	const key = "ku-guro";

	// URL 대입 용도
	const finenurseUrl = () => server + "/api/finenurse/" + version;
	const finenurseWebUrl = () => server + "/api/finenurse/web/" + version;

	// 실제 URL
	const getWardUrl = () => finenurseUrl() + "/ward";
	const getRoomUrl = () => finenurseUrl() + "/room";
	const getMemberUrl = () => finenurseUrl() + "/member";
	const getClinetItemUrl = () => finenurseWebUrl() + "/setting";
	const getClinetSettingUrl = () => finenurseWebUrl() + "/setting/client";

	// function loadStateLocalStorage() {
	// 	const storedState = JSON.parse(localStorage.getItem("clientStore"));
	// 	if (storedState) {
	// 		server = storedState.server || server;
	// 		version = storedState.version || version;
	// 	}
	// }
	// loadStateLocalStorage();
	// function saveStateToLocalStorage() {
	// 	const state = {
	// 		server: server,
	// 		version: version,
	// 	};
	// 	localStorage.setItem("clientStore", JSON.stringify(state));
	// }

	return {
		//state
		server,
		version,
		key,

		//getter
		getClinetSettingUrl,
		getWardUrl,
		getMemberUrl,
		getClinetItemUrl,
		getRoomUrl,

		//action
		// saveStateToLocalStorage,
	};
});
