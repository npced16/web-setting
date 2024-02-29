<template>
	<span class="text-black text-2xl">연동 장비 보기 </span>
	<div class="overflow-x-auto text-md font-semibold">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-100">
				<tr>
					<th v-for="(value, key) in spaceData" :key="key"
						class="px-4 py-4  border-x  text-lg font-semibold  text-gray-700 box-borde">
						{{ labels[key] }}
					</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				<tr>
					<td class="border whitespace-nowrap">
						<input type="text" :id="key" v-model="spaceData.space_id"
							class="w-full h-full p-2 focus:outline-none text-center  focus:ring-indigo-500 focus:border-indigo-500">
					</td>
					<td v-for="(value, key) in spaceData" :key="key" class="border whitespace-nowrap">
						<input type="text" :id="key" v-model="spaceData[key]"
							class="w-full h-full p-2 focus:outline-none text-center  focus:ring-indigo-500 focus:border-indigo-500"
							:placeholder="key === 'space_unit(hospital,ward,room,bed)' ? '(hospital, ward, room, bed)'
								: key === 'space_type(DR,CU)' ? '(DR,CU)' : ''">
					</td>
					<td>{{ demodata }}</td>
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
	{{ props.data?.space_id }}
</template>
<script setup>
import { ref, reactive, onBeforeMount, defineEmits, watch, computed } from 'vue';
const props = defineProps(['data']);
const emit = defineEmits(['closeModal'])
function closeModal() {
	emit('closeModal')
}
const demodata = {
	_id: '6524f48095a337b0fb0d525f',
	space_id: 'w770001r',
	pair_type: 'envMonitoring',
	setting: {
		equipment_type: 'chois/cms',
		cms_maxTemp: 30,
		cms_minTemp: 0,
		cms_maxHumid: 80,
		cms_minHumid: 0,
		pair_name: '77병동 약품냉장고'
	},
	equipment: '6524f432a07146f0f0568137',
	pair_alarm: [
		{
			_id: '63e9fbe11d175837d936e860',
			alarm_code: 'CMS0003',
			alarm_level: '1',
			alarm_name: 'signal_loss',
			alarm_type: 'chois/cms',
			alarm_tag: 'environment',
			alarm_isValid: true,
			editBy: 'admin'
		}
	],
	pair_data: {
		serial: 'D8714DB3FC8F',
		temperature: 6.8,
		humidity: 50.69,
		battery: 100,
		timestamp: '2023-12-15T01:35:31.820Z',
		alarm: []
	},
	status: 'onprogress',
	editBy: null,
	createdAt: '2023-10-10T06:51:44.254Z'
}

// 데이터 설정
const spaceData = reactive({ ...props.data });
const labels = {
	space_id: "아이디",
	space_name: "이름",
	'space_type(DR,CU)': "타입",
	space_hospital: "병원 명",
	space_ward: "병동 명 ",
	space_room: "호실 명",
	space_bed: "침상 수",
	'space_unit(hospital,ward,room,bed)': "병동 타입"
}

function getParingData() {
	// 페어링데이터 가져오기
}

function saveChanges() {

}

onBeforeMount(() => {
	getParingData()
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
</style>
