<template>
  <div class=" px-4 py-2 ">
    <!-- <div class="flex-1"></div> -->
    <section class="container   mx-auto ">
      <div class="overflow-y-auto pr-5  max-h-[70vh]">
        <table class=" w-full overflow-x-auto border-separate border-spacing-0   ">
          <thead class="w-full rounded-lg border sticky top-0   ">
            <tr class=" text-xs  text-center text-white  bg-[#6B6B6B]">
              <th class="px-1 py-3 rounded-l-lg">병실 이름</th>
              <th class="px-1 py-3 ">병실 코드</th>
              <th class="px-1 rounded-r-lg  py-3">관리</th>
            </tr>
            <tr>
              <th class="h-3" />
            </tr>
          </thead>
          <tbody class="h-5 overflow-auto">
            <tr class="" v-for="item in wardList" :key="item">
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.ward_name }}</td>
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.ward_code }}</td>
              <td class="px-2 py-1  lg:w-64 border text-md font-semibold text-center">
                <div class="flex  justify-around">
                  <button type="button" class="py-1 px-3 text-base font-medium text-white focus:outline-none bg-[#678FFF] rounded-lg border border-[#678FFF]
        hover:bg-white hover:text-[#678FFF]  focus:z-10 focus:ring-4 focus:ring-gray-200">
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
</template>
<script setup>
import { ref, onBeforeMount, reactive, computed, watch } from 'vue';
import ExcelJS from "exceljs";
const wardList = reactive([
  {
    ward_name: '71병동',
    editBy: 'ext-linker',
    ward_code: '107010',
    updatedAt: '2024-02-15 14:12:57',
    ward_isValid: 1,
    createdAt: '2024-01-09 14:52:06'
  }
])
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
  wardList.push(tempObject)
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
