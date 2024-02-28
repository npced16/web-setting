import { defineStore } from "pinia";
import { ref } from "vue";
// import { ref } from "vue";
export const useClientStore = defineStore("client", () => {
	const server = ref("http://dev.finenurse.co.kr");
	// const server = ref("http://172.30.188.30");
	const version = ref("v1");
	// 접속한 병원 카
	// const key = "ku-guro";
	const key = "ku-guro";
	// Default values or values from localStorage
	function loadStateLocalStorage() {
		const storedState = JSON.parse(localStorage.getItem("clientStore"));
		if (storedState) {
			server.value = storedState.server || server.value;
			version.value = storedState.version || version.value;
		}
	}
	loadStateLocalStorage();
	// http://dev.finenurse.co.kr/api/finenurse/web/v1/setting/client?

	function getClinetSettingUrl() {
		return `${server.value}/api/finenurse/web/${version.value}/setting/client`;
	}

	function getClinetItemSettingUrl() {
		return `${server.value}/api/finenurse/web/${version.value}/setting`;
	}

	function getfinenurseUrl() {
		return `${server.value}/api/finenurse/${version.value}`;
	}

	function saveStateToLocalStorage() {
		const state = {
			server: server.value,
			version: version.value,
		};
		localStorage.setItem("clientStore", JSON.stringify(state));
	}

	return {
		//state
		server,
		version,
		key,

		//getter
		getClinetSettingUrl,
		getfinenurseUrl,
		getClinetItemSettingUrl,

		//action
		saveStateToLocalStorage,
	};
});
