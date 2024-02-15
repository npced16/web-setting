<template>
  <div class=" px-4 py-2 ">
    <section class="container   mx-auto ">
      <div class="overflow-y-auto pr-5  max-h-[70vh]">
        <table class=" w-full overflow-x-auto border-separate border-spacing-0   ">
          <thead class="w-full rounded-lg border sticky top-0   ">
            <tr class=" text-xs  text-center text-white  bg-[#6B6B6B]">
              <th class="px-1 py-3 rounded-l-lg ">ID</th>
              <th class="px-1 py-3">이름</th>
              <th class="px-1 py-3">병동</th>
              <th class="px-1 py-3">팀</th>
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
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.['space_type(DR, CU)'] }}</td>
              <td class="px-2 py-1  border text-md font-semibold text-center">
                {{ item?.['space_unit(hospital, ward, room,bed)'] }}</td>
              <td class="px-2 py-1  lg:w-64 border text-md font-semibold text-center">
                <div class="flex  justify-around">
                  <button type="button" class="py-1 px-3 text-base font-medium text-white focus:outline-none bg-[#678FFF] rounded-lg border border-[#678FFF]
        hover:bg-white hover:text-[#678FFF]  focus:z-10 focus:ring-4 focus:ring-gray-200 ">
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
  <!-- {{ accountList }} -->
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
import { ref, onBeforeMount, reactive, computed, watch } from 'vue';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon, UserIcon } from '@heroicons/vue/20/solid'
import ExcelJS from "exceljs";
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
async function addAccount(tempObject) {
  accountList.push(tempObject)
  // TODO 나중에 통신으로 데이터추가하게 변경해야함

}



</script>
<style scoped>
/* 파일 입력 필드 스타일 수정 */
input[type="file"] {
  display: none;
  /* 원래 버튼 감추기 */
}
</style>
