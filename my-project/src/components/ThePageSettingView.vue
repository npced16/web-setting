<template>
  <div class="">
    <div class="flex gap-6 px-4 py-2 " style="height: 10%;">
      <div class="sm:w-2/6  lg:w-1/6 ">
        <!-- <div class="bounce"></div> -->
        <Listbox as="div" v-model="selectWard">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">병동 선택해주세요</ListboxLabel>
          <div class="relative mt-2">
            <ListboxButton
              class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span class="flex items-center">
                <span class="ml-3 block truncate">{{ selectWard }}</span>
              </span>
              <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
              leave-to-class="opacity-0">
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="ward in wardList" :key="ward" :value="ward"
                  v-slot="{ active, selected }">
                  <li
                    :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <div class="flex items-center">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                        {{ ward }}
                      </span>
                    </div>
                    <span v-if="selected"
                      :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="sm:w-4/6  lg:w-5/6 ">
        <div class="m-4">
          <table class="w-full">
            <thead>
              <tr
                class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th class="text-center w-80">page 페이지 수 </th>
                <th class="text-center w-80 ">row number </th>
                <th class="text-center " v-for="item in pageNumber">{{ item }}</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="text-gray-700">
                <td class=" border">
                  <input class="w-full font-semibold text-center " type="number" pattern="[0-9]*" v-model="pageNumber" />
                </td>
                <td class=" border text-md font-semibold text-center w-80   ">
                  <input class="font-semibold text-center" v-model="tempXData" />
                  <button class="border rounded-sl  border-blue-500 " @click="chageXaxis">적용</button>
                </td>
                <td class=" border text-xs" v-for="pageIndex in pageNumber">
                  <input class="w-full font-semibold text-center " type="number" pattern="[0-9]*"
                    v-model="yAxis[pageIndex - 1]" @input="validateInput(pageIndex - 1)" />

                  <!-- <select id="underline_select" v-model="yAxis[pageIndex - 1]"
                    class=" text-center block  w-full text-sm  ">
                    <option value="3" selected>3</option>
                    <option value="4" selected>4</option>
                  </select> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
    <div class="flex gap-4 px-4 h-4/5">
      <section class="container  sm:w-2/6  lg:w-1/6  mx-auto font-mono">
        <div class=" overflow-auto  h-full">
          <table class=" w-full overflow-x-auto rounded-lg shadow-lg ">
            <thead>
              <tr
                class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th class="px-4 py-1 text-center ">Name</th>
                <th class="px-4 py-1 text-center ">bed </th>
                <th class="px-4 py-1 text-center ">start</th>
                <th class="px-4 py-1 text-center ">End</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="text-gray-700" v-for="list in itemList.data" :key="list">
                <td class="px-4 py-3 border">
                  <!-- <div class="flex items-center text-sm"> -->
                  <!-- <div> -->
                  <div class="font-semibold text-center">{{ convertToRoomNumber(list.room_name) }}</div>
                  <!-- <p class="text-xs text-gray-600">Developer</p> -->
                  <!-- </div> -->
                  <!-- </div> -->
                </td>
                <td class="px-4 py-3 border text-md font-semibold text-center">{{ list.room_bedNum }}</td>
                <td class="px-4 py-3 border text-xs">
                  <input class="px-2 py-1 w-full font-semibold leading-tight rounded-sm"
                    :value="currDataList[list.room_name]?.startPoint"
                    @input="updatePoint(list.room_bedNum, list.room_name, $event.target.value)" @blur="erromessage = null"
                    :class="{
                      'bg-green-100 text-green-700': currDataList[list.room_name]?.startPoint !== null && currDataList[list.room_name]?.endPoint !== null,
                      'bg-red-100 text-red-700': currDataList[list.room_name]?.startPoint == null || currDataList[list.room_name]?.endPoint == null,
                    }">
                </td>
                <td class="px-4 py-3 border text-sm">
                  <input class="px-2 py-1 w-full font-semibold leading-tight rounded-sm"
                    :value="currDataList[list.room_name]?.endPoint"
                    @input="updatePoint(list.room_bedNum, list.room_name, $event.target.value, 'end')"
                    @blur="erromessage = null" :class="{
                      'bg-green-100 text-green-700': currDataList[list.room_name]?.startPoint !== null && currDataList[list.room_name]?.endPoint !== null,
                      'bg-red-100 text-red-700': currDataList[list.room_name]?.startPoint == null || currDataList[list.room_name]?.endPoint == null,
                    }">
                  <!-- {{ currDataList[list.room_name]?.endPoint }} -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div class=" sm:w-4/6  lg:w-5/6 py-4  overflow-auto">
        <div class="flex flex-auto w-full flex-wrap h-full  " style="max-height: 95%;">
          <div v-for="columnIndex in pageNumber" :key="columnIndex"
            :class="[pageNumber == 1 ? 'w-full' : 'w-3/6', pageNumber <= 2 ? 'h-full' : '']">
            <!-- <div class="flex">
              <div class="w-1/3 text-center" v-for=" index in Number(yAxis[columnIndex - 1])">
                {{ numberToAlphabet(getStartColumnForPageIndex(columnIndex) - 1 + index) }}
              </div>
            </div> -->
            <div class="rounded-lg shadow-lg mx-1  p-1 border border-gray-700  " :style="gridStyle(columnIndex)"
              :class="[pageNumber <= 2 ? 'h-full' : '']">
              <div class="flex  items-center justify-center border-black "
                v-for="(content, index) in getArrayByPageNumber(columnIndex)" :key="content"
                :class="[`box-${content?.type}`]">
                {{ convertToRoom(content?.name, content?.type, index) }}
                <span v-if="content?.type === 'bed'">- {{ index - beforeIndex }}</span>
                <span v-if="content == null" class=" text-gray-300">
                  {{ numberToAlphabet(getStartColumnForPageIndex(columnIndex) + parseInt(index / 12)) }} {{ index % xAxis
                    +
                    1 }}
                </span>

              </div>
              <div
                v-for="(content, index) in getLengthByPageNumber(columnIndex) - getArrayByPageNumber(columnIndex).length"
                class="h-full w-full text-center text-gray-300 ">
                {{ numberToAlphabet(
                  getStartColumnForPageIndex(columnIndex) + parseInt((getArrayByPageNumber(columnIndex).length + index)
                    / 12)) }}
                {{
                  (getArrayByPageNumber(columnIndex).length + index) % xAxis + 1 }}
                <!-- {{ getArrayByPageNumber(columnIndex).length + index }} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex  justify-end p-4 " style="height: 10%;">
      <button type="button"
        class="py-2.5 px-8 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-black hover:bg-gray-100 hover:text-blue-500 hover:border-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        저장
      </button>
      <button type="button"
        class="py-2.5 px-8 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-black hover:bg-gray-100 hover:text-red-500  hover:border-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        취소
      </button>
    </div>

    <div v-if="erromessage != null"
      class="fixed flex items-center w-1/6A bottom-1 left-5 p-4 mb-4 border border-red-500 bg-white text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert">
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      </div>
      <div class="ms-3 text-sm font-normal text-red-500">{{ erromessage }}</div>
    </div>

  </div>
</template>
<script setup>
import { ref, onBeforeMount, reactive, computed, watch } from 'vue';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
const yAxis = reactive([3, 3, 3, 3])
const xAxis = ref(12)
const tempXData = ref(xAxis.value)
const pageNumber = ref(Number(4))
const erromessage = ref(null)
function chageXaxis() {
  xAxis.value = tempXData.value
  for (const item in currDataList) {
    deleteBedInList(item)
    currDataList[item].endPoint = null
    currDataList[item].startPoint = null
  }
}

const contents =
  [
    {
      "size": 3,
      "col":
        [
          [{ "type": "room", "name": "2" }, { "type": "bed", "name": "2" }, { "type": "bed", "name": "2" }, "", "",
            "", { "type": "room", "name": "3" }, { "type": "bed", "name": "3" }, { "type": "bed", "name": "3" }, { "type": "bed", "name": "3" },
          { "type": "bed", "name": "3" }, { "type": "bed", "name": "3" }
          ],
          [
            { "type": "room", "name": "5" }, { "type": "bed", "name": "5" }, { "type": "bed", "name": "5" }, { "type": "bed", "name": "5" }, { "type": "bed", "name": "5" },
            { "type": "bed", "name": "5" }, { "type": "room", "name": "6" }, { "type": "bed", "name": "6" }, { "type": "bed", "name": "6" }, "",
            "", ""
          ],
          [
            { "type": "room", "name": "7" }, { "type": "bed", "name": "7" }, "", "", "",
            "", { "type": "room", "name": "10" }, { "type": "bed", "name": "10" }, { "type": "bed", "name": "10" }, "",
            "", ""
          ]
        ]
    },
    {
      "size": 3, "col": [[{ "type": "room", "name": "12" }, { "type": "bed", "name": "12" }, "", "", "", "", { "type": "room", "name": "13" }, { "type": "bed", "name": "13" }, "", "", "", ""], [{ "type": "room", "name": "15" }, { "type": "bed", "name": "15" },
      { "type": "bed", "name": "15" }, { "type": "bed", "name": "15" }, { "type": "bed", "name": "15" }, { "type": "bed", "name": "15" }, { "type": "room", "name": "16" }, { "type": "bed", "name": "16" }, { "type": "bed", "name": "16" }, { "type": "bed", "name": "16" }, "", ""], [{ "type": "room", "name": "17" }, { "type": "bed", "name": "17" }, { "type": "bed", "name": "17" }, { "type": "bed", "name": "17" }, { "type": "bed", "name": "17" }, { "type": "bed", "name": "17" }, "", "", "", "", "", ""]]
    }
  ]
function validateInput(index) {
  const inputValue = yAxis[index];
  if (inputValue < 1) {
    yAxis[index] = 1;
  } else if (inputValue > 10) {
    yAxis[index] = 10;
  }
};
function gridStyle(index) {
  const rowstyle = yAxis[index - 1] || 3
  const style = {
    display: 'grid',
    gridAutoFlow: 'column',// 열 방향으로 그리드 아이템 나열
    gridTemplateRows: `repeat(${xAxis.value}, 1fr)`,
    gridTemplateColumns: `repeat(${rowstyle}, 1fr)`,
    padding: '4px',
    borderRadius: "15px"
  }
  return style
}


let currDataArray = reactive([])
/**
 * page번호에 따른 배열 반환
 * @param {Number} pageIndex page숫자
 * 
 * @returns  {(Array)}  페이지에 해당하는 데이터 배열
 */
function getArrayByPageNumber(pageIndex) {

  return currDataArray.slice(getStartColumnForPageIndex(pageIndex) * xAxis.value, getStartColumnForPageIndex(pageIndex + 1) * xAxis.value);
}


function getLengthByPageNumber(pageIndex) {
  return ((getStartColumnForPageIndex(pageIndex + 1) * xAxis.value) - (getStartColumnForPageIndex(pageIndex) * xAxis.value))
}
/**
 * index 에 따라 현재 page의 시작 열을 반환
 * @param {*} pageIndex 
 * 
 * @returns {Number} - Page가 시작되는 열
 */
function getStartColumnForPageIndex(pageIndex) {
  let sumPage = 0
  for (let i = 1; i < Number(pageIndex); i++) {
    sumPage += Number(yAxis[i - 1] || 3)
  }
  return sumPage
}

const currDataList = reactive({})

function getContents(contents) {
  let size = 0
  let currDataIndex = 0
  for (const content of contents) {
    for (const item in content.col) {
      let count = 0 //
      for (const data of content.col[item]) {
        ++count
        if (data.type == 'room') {
          if (!currDataList[data.name]) {
            currDataList[data.name] = {
              startPoint: numberToAlphabet(parseInt(item) + size) + count,
              start: currDataIndex,
              end: 0,
              endPoint: null
            }
            currDataArray[currDataIndex] = { type: 'room', name: data.name }
            if (!currDataList?.table) {
              currDataList.table = {};
            }
            if (!currDataList.table[item]) {
              currDataList.table[item] = [data.name];
            } else {
              currDataList.table[item].push(data.name); ``
            }
          }
        }
        if (data.type == 'bed') {
          currDataList[data.name].endPoint = numberToAlphabet(parseInt(item) + size) + count
          currDataList[data.name].end = currDataIndex
          currDataArray[currDataIndex] = { type: 'bed', name: data.name }
        }
        currDataIndex++
      }
    }
    size += content.size // 다음 table 시 size 설정용
  }
}


function numberToAlphabet(number) {
  if (parseInt(number) >= 26) {
    let fristString = String.fromCodePoint(parseInt((number) / 26 - 1) + 65)
    let last = String.fromCodePoint(parseInt(number) % 26 + 65)
    return fristString + last
  }
  return String.fromCodePoint(parseInt(number) + 65)
}

function settingContents() {
  for (const list of itemList.value.data) {
    if (!currDataList[list.room_name] && list.room_name) {
      currDataList[list.room_name] = {
        startPoint: null,
        endPoint: null
      }
    }
  }
}
/**
 *  병실의 목록 가져오기
 */
const itemList = ref({
  "data": [{
    "_id": "65a48e674a64efd1ca01c37d",
    "room_name": "3", "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "5", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  }, {
    "room_name": "19", "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "11", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  },
  {
    "_id": "65a48e674a64efd1ca01c37f", "room_name": "6", "ward_name": "63병동",
    "editBy": "ext-linker", "room_bedNum": "2", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  },
  {
    "_id": "65a48e674a64efd1ca01c380", "room_name": "5", "ward_name": "63병동",
    "editBy": "ext-linker", "room_bedNum": "5",
    "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  }, {
    "_id": "65a48e674a64efd1ca01c386", "room_name": "7", "ward_name": "63병동",
    "editBy": "ext-linker", "room_bedNum": "1", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  },
  {
    "_id": "65a48e674a64efd1ca01c388", "room_name": "10",
    "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "2", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  },
  {
    "_id": "65a48e674a64efd1ca01c389",
    "room_name": "12", "ward_name": "63병동",
    "editBy": "ext-linker", "room_bedNum": "1", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  }, {
    "_id": "65a48e674a64efd1ca01c38b", "room_name": "15"
    , "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "5", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  }, {
    "_id": "65a48e674a64efd1ca01c38c", "room_name": "13",
    "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "1", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  }, {
    "_id": "65a48e674a64efd1ca01c38e", "room_name": "16",
    "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "3", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  }, {
    "_id": "65a48e674a64efd1ca01c391", "room_name": "17",
    "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "5", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  }, {
    "_id": "65a54a4b4a64efd1ca0384dc", "room_name": "2",
    "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "2", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-16 00:07:55"
  }]
})
itemList.value.data.sort((a, b) => {
  const bedNumA = parseInt(a.room_name);
  const bedNumB = parseInt(b.room_name);
  return bedNumA - bedNumB;
});

let beforeIndex;
function convertToRoom(roomNumber, type, index) {
  if (type == 'room') {
    beforeIndex = index;
  }
  return convertToRoomNumber(roomNumber)
}
function convertToRoomNumber(roomNumber) {
  if (roomNumber) return `${String(roomNumber).padStart(2, '0')}호`;
}
/**
 * 문자열을 받아 계산하여 새로운 값을 반환하는 함수입니다.
 *
 * @param {number} roomBedNum - 침상 수
 * @param {string} value - 입력값 (예: 'A1', 'B2')
 *
 * @returns {(Array|boolean)} - 계산된 데이터값과 범위의 시작 및 끝을 포함하는 배열
 *                            (예: ['A3', 5, 7,true]) 또는 false (입력 오류 시)
 */
function addNumberToCell(roomBedNum, value, pointName) {
  const baseRegex = /^([a-zA-Z]{1,2})([0-9]+)$/;
  // 입력값이 없거나 정규식과 매치되지 않으면 false 반환
  if (!value || value.match(baseRegex) === null) {
    return false;
  }

  const [, baseAlpha, baseNum] = value.match(baseRegex);
  if (baseNum == 0) {
    return false;
  }
  const upperAlpha = baseAlpha.toUpperCase();
  // 현재 데이터 숫자 계산
  let currDataNumber
  let resultNum = Number(baseNum) + Number(roomBedNum);

  if (upperAlpha.charCodeAt(1)) {
    currDataNumber = ((upperAlpha.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * 26 * xAxis.value) +
      ((upperAlpha.charCodeAt(1) - 'A'.charCodeAt(0)) * xAxis.value + Number(baseNum));
  } else {
    currDataNumber = (upperAlpha.charCodeAt(0) - 'A'.charCodeAt(0)) * xAxis.value + Number(baseNum);
  }
  // 결과 숫자 계산

  if (pointName) {
    resultNum = Number(baseNum) - Number(roomBedNum);

    return {
      startString: `${upperAlpha}${resultNum}`,
      endString: `${upperAlpha}${baseNum}`,
      start: currDataNumber - Number(roomBedNum),
      end: currDataNumber,
      overFlow: baseNum > xAxis.value || resultNum < 1,
    };
  }
  // 결과값과 범위의 시작과 끝을 배열로 반환
  return {
    startString: `${upperAlpha}${baseNum}`,
    endString: `${upperAlpha}${resultNum}`,
    start: currDataNumber,
    end: currDataNumber + Number(roomBedNum),
    overFlow: resultNum > xAxis.value,
  };

  // [`${upperAlpha}${resultNum}`, currDataNumber, currDataNumber + Number(roomBedNum), resultNum > xAxis.value, `${upperAlpha}${baseNum}`];
}


/**
 * 
 * @param {*} roomBedNum 침상 수
 * @param {*} roomName 병실 이름
 * @param {*} value 입력값
 * @param {*} pointName Null || 'end' -어떤 포인트에 대한 작업인지를 알려는 것   
 */
function updatePoint(roomBedNum, roomName, value, pointName) {
  deleteBedInList(roomName)
  const convertRoomNumber = addNumberToCell(roomBedNum, value, pointName);
  if (!isEmptyBed(convertRoomNumber.start, convertRoomNumber.end)) {
    erromessage.value = '다른 값이 이미 들어가 있습니다.'
    return resetPoints(roomName, value, pointName)
  }
  if (!convertRoomNumber) {
    erromessage.value = '시작점 입력이 잘못되었습니다.'
    return resetPoints(roomName, value, pointName)
  }
  if (convertRoomNumber.overFlow) {
    erromessage.value = '침상 수가 범위를 벗어납니다.'
    return resetPoints(roomName, value, pointName)
  }
  let beforeStartIndex = null
  let beforeEndIndex = null
  let currCurrIndex = 0
  for (let i = 0; currCurrIndex < convertRoomNumber.start; i++) {
    beforeStartIndex = beforeEndIndex
    beforeEndIndex = currCurrIndex
    currCurrIndex = getStartColumnForPageIndex(i) * xAxis.value
  }
  if (isEmptyBed(beforeStartIndex, beforeEndIndex)) {
    erromessage.value = '이전 페이지가 비어있음';
    return resetPoints(roomName, value, pointName)
  }
  console.log('object :>> ', convertRoomNumber);
  addBedInList(roomName, convertRoomNumber.start, convertRoomNumber.end)
  erromessage.value = null


  currDataList[roomName].startPoint = convertRoomNumber.startString;
  currDataList[roomName].endPoint = convertRoomNumber.endString;


}


function resetPoints(roomName, value, flag) {
  if (flag) {
    currDataList[roomName].startPoint = null;
    currDataList[roomName].endPoint = value;
  } else {
    currDataList[roomName].startPoint = value;
    currDataList[roomName].endPoint = null;
  }

}
/**
 * 주어진 RoomName 에 따라 데이터를 지움
 * @param {*} roomName 병실 이름 
 */
function deleteBedInList(roomName) {
  for (const item in currDataArray) {
    if (parseInt(currDataArray[item]?.name) == roomName) {
      delete currDataArray[item]
    }
  }
}
function addBedInList(roomBedNum, startPoint, endPoint) {
  for (let i = startPoint - 1; i < endPoint; i++) {
    if (i == startPoint - 1) {
      currDataArray[i] = { type: 'room', name: roomBedNum }
    } else
      currDataArray[i] = { type: 'bed', name: roomBedNum }
  }
}
function isEmptyBed(startPoint, endPoint) {
  if (startPoint && endPoint) {
    const newArray = currDataArray.slice(startPoint, endPoint)
    for (const item of newArray) {
      if (item != undefined) return false
    }
  } else return false
  return true
}

const wardList = ["61병동", "63병동", "133병동", "81병동"]
const selectWard = ref(wardList[0])


watch((pageNumber), () => {
  while (pageNumber.value > yAxis.length) {
    yAxis.push(3)
  }
})

onBeforeMount(() => {
  getContents(contents)
  settingContents()
  // getCreatedPageData()
})


</script>

<style >
.box-room {
  border: 1px solid #000000;
  background-color: #7F7F7F;
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
  margin: 0px 3px;
  font-size: .9rem
}

.box-bed {
  background-color: #F2F2F2;
  text-align: center;
  margin: 0px 3px;
  font-size: .9rem
}

.box-undefined {
  border-radius: 5px;
  min-height: 20px;
  /* border: 1px solid #000000; */

}
</style>
