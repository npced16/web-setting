<template>
  <settingSpaceModal v-if="settingFlag" :setting-data="settingData" @close-modal="closeSettingModal" />


  <div class="flex gap-6 px-4 py-2 justify-between">
    <!-- <div class="bounce"></div> -->
    <Listbox as="div" v-model="selectWard">
      <div class="flex">
        <ListboxLabel class="block text-sm font-medium leading-9  text-gray-900"> 병동 관리 </ListboxLabel>
        <div class="relative ml-4 ">
          <ListboxButton
            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm sm:leading-6">
            <span class="flex items-center w-32">
              <span v-if="selectWard != null" class="ml-3 block truncate">{{ selectWard }}</span>
              <span v-else class="block truncate">병동을 선택해 주세요</span>
            </span>
            <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>
          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <ListboxOption as="template" v-for="ward in wardList" :key="ward" :value="ward"
                v-slot="{ active, selected }">
                <li
                  :class="[active ? 'bg-blue-400 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                  <div class="flex items-center">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                      {{ ward }}
                    </span>
                  </div>
                  <span v-if="selected"
                    :class="[active ? 'text-white' : 'text-blue-400', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </div>
    </Listbox>
    <label
      class="cursor-pointer border text-center items-center rounded-lg border-blue-500 px-2 py-1 bg-white text-blue-500 hover:text-white hover:bg-blue-500">
      계정 일괄 등록
      <input type="file" @change="handleFileUpload" accept=".xlsx" />
    </label>
  </div>
  <div class=" px-4 py-2 ">
    <section class="container   mx-auto ">
      <div class="overflow-y-auto pr-5  max-h-[70vh]">
        <table class=" w-full overflow-x-auto border-separate border-spacing-0   ">
          <thead class="w-full rounded-lg border sticky top-0   ">
            <tr class=" text-xs  text-center text-white  bg-[#6B6B6B]">
              <th class=" px-1 py-3 rounded-l-lg ">ID</th>
              <th class="px-1 py-3">타입</th>
              <th class="px-1 py-3">이름</th>
              <th class="px-1 py-3">분류</th>
              <th class="px-1 py-3">병동</th>
              <th class="px-1 py-3">호실</th>
              <th class="px-1 rounded-r-lg  py-3">관리</th>
            </tr>
            <tr>
              <th class="h-3" />
            </tr>
          </thead>
          <tbody class="h-5 overflow-auto">
            <tr class="" v-for="item in accountList" :key="item">
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.space_id }}</td>
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.space_name }}</td>
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.['space_type(DR,CU)'] }}</td>
              <td class="px-2 py-1  border text-md font-semibold text-center">
                {{ item?.['space_unit(hospital,ward,room,bed)'] }}</td>
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.space_ward }}</td>
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.space_room }}</td>
              <td class="px-2 py-1  lg:w-64 border text-md font-semibold text-center">
                <div class="flex  justify-around">

                  <button type="button" class="py-1 px-4  text-base font-medium text-white focus:outline-none bg-[#8B8B8B] rounded-lg  border border-[#8B8B8B]
        hover:bg-white hover:text-[#8B8B8B] hover:border-[#8B8B8B] focus:z-10 focus:ring-4 focus:ring-gray-200"
                    @click="openSettingModal(item)">
                    더보기
                  </button>

                  <button type="button" class="py-1 px-3 text-base font-medium text-white focus:outline-none bg-[#678FFF] rounded-lg border border-[#678FFF]
        hover:bg-white hover:text-[#678FFF]  focus:z-10 focus:ring-4 focus:ring-gray-200"
                    @click="openSettingModal(item)">
                    수정
                  </button>
                  <button type="button" class="py-1 px-3  text-base font-medium text-white focus:outline-none bg-red-500 rounded-lg  border border-red-500
        hover:bg-white hover:text-red-500   focus:z-10 focus:ring-4 focus:ring-gray-200">
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
  <!-- <div v-if="errorMessage != null"
    class="fixed flex items-center w-1/6A bottom-1 left-5 p-4 mb-4 border border-red-500  text-gray-500 bg-red-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    role="alert">
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-200 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
      </svg>
    </div>
    <div class="ms-3 text-sm font-normal text-red-200">{{ errorMessage }}</div>
  </div> -->
</template>
<script setup>
import settingSpaceModal from '@/modal/modalitem/settingSpaceModal.vue'
import { ref, onBeforeMount, reactive, computed, watch } from 'vue';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon, UserIcon } from '@heroicons/vue/20/solid'
import ExcelJS from "exceljs";

// modal 
const settingFlag = ref(false);
let settingData = reactive({ data: 'none' });
function openSettingModal(item) {
  settingData = item
  settingFlag.value = true
}
function closeSettingModal() {
  settingFlag.value = false
}






const selectWard = ref(null)
const wardList = reactive(['61병동', '62병동'])

const accountList = reactive([])
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    loadFile(file)
  }
  event.target.value = null;
}

async function loadFile(FileName) {
  try {
    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader()
    let header = {}
    let headerKeys = []
    reader.readAsArrayBuffer(FileName)
    reader.onload = () => {
      const buffer = reader.result;
      workbook.xlsx.load(buffer).then(wb => {
        wb.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            if (rowIndex == 1) {
              for (const item of row.values) {
                if (item != undefined) {
                  header[item] = ''
                }
              }
              headerKeys = Object.keys(header)
            }
            else {
              const tempObject = {}
              for (let index = 0; index < headerKeys.length; index++) {
                tempObject[headerKeys[index]] = row.values[index + 1];
              }
              addAccount(tempObject)
              // console.log('header :>> ', tempObject, headerKeys, header);
              // console.log(row.values.length, rowIndex, row.values)
            }

          })
        })
      })
    }
  } catch (error) {
    console.error("잘못된 양식의 파일입니다.", error)
  }
}
// TODO 나중에 통신으로 데이터추가하게 변경해야함

async function addAccount(tempObject) {
  accountList.push(tempObject)

}

</script>
<style scoped>
/* 파일 입력 필드 스타일 수정 */
input[type="file"] {
  display: none;
}
</style>
