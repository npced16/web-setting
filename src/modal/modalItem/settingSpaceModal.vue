<template>
	<span class="text-black text-2xl"> 병동 수정하기 </span>

	<div class="overflow-x-auto text-md ">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-100">
				<tr>
					<th v-for="(value) in labels" :key="value" class="px-4 py-4  border-2  text-lg font-semibold">
						{{ value }}
					</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				<tr>
					<td class="px-2 py-1  border text-md  text-center bg-slate-100 text-gray-500">{{ spaceData?.space_id }}</td>
					<td class="px-2 py-1  border text-md  text-center bg-slate-100 text-gray-500">{{ spaceData?.space_name }}</td>
					<td class="px-2 py-1  border text-md  text-center bg-slate-100 text-gray-500">{{ spaceData?.space_unit }}</td>
					<td class="px-2 py-1  border text-md  text-center bg-slate-100 text-gray-500">{{ spaceData?.space_type }}</td>
					<td class="px-2 py-1  border text-md  text-center bg-slate-100 text-gray-500">{{ spaceData?.space_ward }}</td>
					<td class="px-2 py-1  border text-md font-semibold text-center text-[#678fff] p-0">
						<input type="text" :id="'space_room'" v-model="spaceData.space_room"
							class="w-full h-full p-2 border border-white   focus:outline-none text-center  focus:ring-indigo-500 focus:border-indigo-500">
						<!-- :placeholder="key === 'space_unit(hospital,ward,room,bed)' ? '(hospital, ward, room, bed)' -->
						<!-- : key === 'space_type(DR,CU)' ? '(DR,CU)' : ''" -->
						<!-- {{ spaceData?.space_room }} -->
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="flex justify-end mt-4 gap-4">
		<button @click="closeModal"
			class="py-1 px-4  text-base font-medium text-white focus:outline-none bg-[#8B8B8B] rounded-lg  border border-[#8B8B8B]
        hover:bg-white hover:text-[#8B8B8B] hover:border-[#8B8B8B] focus:z-10 focus:ring-4 focus:ring-gray-200">닫기</button>
		<button @click="saveChanges" class="py-1 px-3 text-base font-medium text-white focus:outline-none bg-[#678FFF] rounded-lg border border-[#678FFF]
        hover:bg-white hover:text-[#678FFF]  focus:z-10 focus:ring-4 focus:ring-gray-200">수정하기</button>
	</div>
</template>
<script setup>
import { ref, reactive, onBeforeMount, defineEmits, watch, computed } from 'vue';
const props = defineProps(['data']);
const emit = defineEmits(['closeModal'])
function closeModal() {
	emit('closeModal')
}

// 데이터 설정

const spaceData = reactive({ ...props.data });
const labels = {
	space_id: "아이디",
	space_name: "이름",
	space_unit: "병동 분류",
	space_type: "병동 타입",
	// space_hospital: "병원 명",
	// space_ward: "병동 명 ",
	space_room: "병동 명",
	space_bed: "호실 명",
}



function saveChanges() {

}
onBeforeMount(() => {
})
</script>
<style scoped>
.card {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #333333;
	font-size: 3rem;
	font-weight: 500;
}

label {
	font: 500 14px/20px NotoSans;
	color: #313131;
}

input.input-box {
	background: #ffffff 0% 0% no-repeat padding-box;
	border: 1px solid #c9c9c9;
	border-radius: 5px;
	font: normal 14px NotoSans;
	margin-top: 5px;
	width: 99%;
	height: 34px;
	color: #323232;
	display: block;
}

input.input-box::placeholder {
	color: #c9c9c9;
}

.blue-button {
	width: 120px;
	height: 30px;
	background: var(--main-color) 0% 0% no-repeat padding-box;
	box-shadow: 1px 1px 3px #40404029;
	border-radius: 10px;
	border: none;
	color: white;
	margin-left: 15px;
	font: 500 16px/24px NotoSans;
	cursor: pointer;

}

.blue-button:disabled {
	background: #e2e2e2 0% 0% no-repeat padding-box;
	cursor: default;

}

select {
	display: block;
	background: #ffffff 0% 0% no-repeat padding-box;
	border: 1px solid #c9c9c9;
	margin-top: 5px;
	border-radius: 5px;
	width: 100%;
	height: 38px;
	font: normal normal 500 14px NotoSans;
	color: #7c7c7c;
}

td {
	-webkit-app-region: no-drag;
}
</style>
