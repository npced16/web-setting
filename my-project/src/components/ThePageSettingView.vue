<template>
  <div class="">
    <div class="flex gap-6 px-4 py-2 h-[80px] ">
      <div class="sm:w-2/6  lg:w-1/6 ">
        <!-- <div class="bounce"></div> -->
        <Listbox as="div" v-model="selectWard">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">병동 </ListboxLabel>
          <div class="relative mt-2">
            <ListboxButton
              class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm sm:leading-6">
              <span class="flex items-center">
                <span class="ml-3 block truncate">{{ selectWard }}</span>
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
        </Listbox>
      </div>
      <div class="sm:w-4/6  lg:w-5/6 ">
        <table class="w-full border  rounded-xl   shadow-md ">
          <thead>
            <tr class="text-md font-semibold tracking-wide text-left text-gray-900 ">
              <th class="text-center border-l border-b w-1/6">전체 페이지 수 </th>
              <th class="text-center border-l border-b w-2/6">세로 최대 카드 수 </th>
              <th class="text-center border-l border-b w-3/6" :colspan="pageNumber">페이지 별 가로 길이</th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="text-gray-700">
              <td class=" ">
                <input class="w-full font-semibold text-center " type="number" pattern="[0-9]*" v-model="pageNumber" />
              </td>
              <td class="border-l text-md font-semibold text-center w-2/6   ">
                <div class="flex flex-row  justify-between p-[2px]">
                  <input class="w-5/6 font-semibold text-center" v-model="tempXData" />
                  <div class="w-1/6">
                    <button class="border rounded-lg  border-blue-500 text-blue-500  bg-white  py-1 px-5 text-sm"
                      @click="chageXaxis">적용</button>
                  </div>

                </div>
              </td>
              <td class="border-l p-0" v-for="pageIndex in pageNumber">
                <div class="  flex flex-row justify-center items-center">
                  <div v-if="pageNumber < 11"
                    class="ml-1 h-4 w-4 bg-[#6B6B6B] text-xs text-white rounded-3xl text-center">
                    {{ pageIndex }}
                  </div>
                  <input class="w-full h-full font-semibold text-center" type="number" pattern="[0-9]*"
                    v-model="yAxis[pageIndex - 1]" @input="handlerDateInput(pageIndex - 1)" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex gap-4 px-4 py-2 " style="height: calc(100% - 120px )">
      <section class="container  sm:w-2/6  lg:w-1/6  mx-auto">
        <div class="overflow-y-auto  max-h-[70vh]">
          <table class=" w-full overflow-x-auto border-separate border-spacing-0   ">
            <thead class="w-full rounded-lg border sticky top-0   ">
              <tr class=" text-xs  text-center text-white  bg-[#6B6B6B]">
                <th class=" px-1 py-3 rounded-l-lg ">호실</th>
                <th class="px-1 py-3  border-x ">인원 수</th>
                <th class="px-1 py-3  rounded-r-lg  ">시작 값 - 종료값</th>
              </tr>
              <tr>
                <div class="h-3" />
              </tr>
            </thead>
            <tbody class="">
              <tr class="" v-for="(list, index) in itemList.data" :key="list">
                <td class="px-2 py-1 w-16 border "
                  :class="[index == 0 ? 'rounded-ss-lg  ' : index == itemList.data.length - 1 ? 'rounded-es-lg' : '']">
                  <div class="font-semibold text-center">{{ convertToRoomNumber(list.room_name) }}</div>
                </td>
                <td class="px-2 py-1 w-16 border text-md font-semibold text-center">{{ list.room_bedNum }}</td>
                <td class="px-2 py-1 border text-xs h-full"
                  :class="[index == 0 ? 'rounded-se-lg' : index == itemList.data.length - 1 ? 'rounded-ee-lg' : '']">
                  <div class="w-full h-full flex items-center justify-center">
                    <input class="w-full border border-1 h-8 border-gray-300 leading-tight rounded-md text-center"
                      :value="currDataList[list.room_name]?.startPoint"
                      @input="updatePoint(list.room_bedNum, list.room_name, $event.target.value)"
                      @blur="errorMessage = null" placeholder="시작값 입력">
                    <div class="text-gray-300 mx-1">-</div>
                    <input class="w-full border border-1 h-8 border-gray-300 text-center rounded-md"
                      :value="currDataList[list.room_name]?.endPoint"
                      @input="updatePoint(list.room_bedNum, list.room_name, $event.target.value, 'end')"
                      @blur="errorMessage = null" placeholder="종료값 입력">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div class=" sm:w-4/6  lg:w-5/6 overflow-auto">
        <div class="flex flex-auto w-full flex-wrap h-full   " style="max-height: 95%;">
          <div v-for="columnIndex in pageNumber" :key="columnIndex"
            :class="[pageNumber == 1 ? 'w-full' : 'w-3/6', pageNumber <= 2 ? 'h-full' : '']">
            <div class="flex">
              <div class="w-1/3 text-center" v-for=" index in Number(yAxis[columnIndex - 1])">
                {{ numberToAlphabet(getStartColumnForPageIndex(columnIndex) - 1 + index) }}
              </div>
            </div>
            <div class="rounded-lg shadow-lg mx-1  p-3 border " :style="getGridStyleOfIndex(columnIndex)"
              :class="[pageNumber <= 2 ? 'h-full' : '']">
              <div class="flex  items-center justify-center  "
                v-for="(content, index) in getArrayByPageNumber(columnIndex)" :key="content"
                :class="[`box-${content?.type}`]">
                {{ convertToRoom(content?.name, content?.type, index) }}
                <span v-if="content?.type === 'bed'">- {{ index - beforeIndex }}</span>
                <span v-if="content == null" class="box-empty  ">
                  {{ numberToAlphabet(getStartColumnForPageIndex(columnIndex) + parseInt(index / 12)) }}
                  {{ index % xAxis + 1 }}
                </span>
              </div>
              <div
                v-for="(content, index) in getLengthByPageNumber(columnIndex) - getArrayByPageNumber(columnIndex).length"
                class=" box-empty">
                {{ numberToAlphabet(
                  getStartColumnForPageIndex(columnIndex) + parseInt((getArrayByPageNumber(columnIndex).length + index)
                    / 12)) }}
                {{ (getArrayByPageNumber(columnIndex).length + index) % xAxis + 1 }}
                <!-- {{ getArrayByPageNumber(columnIndex).length + index }} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex  justify-end p-4  gap-2" style="height: 80px;">
      <button type="button" class="py-2.5 px-8  text-base font-medium text-white focus:outline-none bg-[#8B8B8B] rounded-lg  border border-[#8B8B8B]
        hover:bg-white hover:text-[#8B8B8B] hover:border-[#8B8B8B] focus:z-10 focus:ring-4 focus:ring-gray-200">
        취소
      </button>
      <button type="button" class="py-2.5 px-8 text-base font-medium text-white focus:outline-none bg-[#678FFF] rounded-lg border border-[#678FFF]
        hover:bg-white hover:text-[#678FFF] hover:border-[#678FFF] focus:z-10 focus:ring-4 focus:ring-gray-200 ">
        저장
      </button>
    </div>
    <div v-if="errorMessage != null"
      class="fixed flex items-center w-1/6A bottom-1 left-5 p-4 mb-4 border border-red-500  text-gray-500 bg-red-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert">
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-200 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      </div>
      <div class="ms-3 text-sm font-normal text-red-200">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, reactive, computed, watch } from 'vue';

import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
const yAxis = reactive([3, 3, 3, 3])
const xAxis = ref(12)
const tempXData = ref(xAxis.value)
const pageNumber = ref(Number(4))
const errorMessage = ref(null)
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

function handlerDateInput(index) {
  const inputValue = yAxis[index];
  if (inputValue < 1) {
    yAxis[index] = 1;
  } else if (inputValue > 10) {
    yAxis[index] = 10;
  }
};

function getGridStyleOfIndex(index) {
  const rowstyle = yAxis[index - 1] || 3
  const style = {
    display: 'grid',
    gridAutoFlow: 'column',// 열 방향으로 그리드 아이템 나열
    gridTemplateRows: `repeat(${xAxis.value}, 1fr)`,
    gridTemplateColumns: `repeat(${rowstyle}, 1fr)`,
    gap: '1px',
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
  if (!contents) return
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
 * @returns {(<Map>|boolean)} - 계산된 Map 혹은 false
 *                          
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
  let valueNumber
  let endNumber = Number(baseNum) + Number(roomBedNum);

  if (upperAlpha.charCodeAt(1)) {
    valueNumber = ((upperAlpha.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * 26 * xAxis.value) +
      ((upperAlpha.charCodeAt(1) - 'A'.charCodeAt(0)) * xAxis.value + Number(baseNum));
  } else {
    valueNumber = (upperAlpha.charCodeAt(0) - 'A'.charCodeAt(0)) * xAxis.value + Number(baseNum);
  }
  // 결과 숫자 계산

  if (pointName) {
    endNumber = Number(baseNum) - Number(roomBedNum);

    return {
      startString: `${upperAlpha}${endNumber}`,
      endString: `${upperAlpha}${baseNum}`,
      start: valueNumber - Number(roomBedNum),
      end: valueNumber,
      overFlow: baseNum > xAxis.value || endNumber < 1,
    };
  }
  // 결과값과 범위의 시작과 끝을 배열로 반환
  return {
    startString: `${upperAlpha}${baseNum}`,
    endString: `${upperAlpha}${endNumber}`,
    start: valueNumber,
    end: valueNumber + Number(roomBedNum),
    overFlow: endNumber > xAxis.value,
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
    errorMessage.value = '다른 값이 이미 들어가 있습니다.'
    return resetPoints(roomName, value, pointName)
  }
  if (convertRoomNumber == false) {
    errorMessage.value = '입력 값 이 잘못되었습니다.'
    return resetPoints(roomName, value, pointName)
  }
  if (convertRoomNumber.overFlow) {
    errorMessage.value = '침상 수가 범위를 벗어납니다.'
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
    errorMessage.value = '이전 페이지가 비어있음';
    return resetPoints(roomName, value, pointName)
  }
  addBedInList(roomName, convertRoomNumber.start, convertRoomNumber.end)
  errorMessage.value = null
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
const selectWard = ref('병동 선택')

watch((pageNumber), () => {
  while (pageNumber.value > yAxis.length) {
    yAxis.push(3)
  }
  // todo 만약 페이지 수 넘는 데이터가 있다? 그러면 지우기 
})

onBeforeMount(() => {
  getContents(contents)
  settingContents()
  // getCreatedPageData()
})


</script>

<style >
.box-room {
  /* border: 1px solid #000000; */
  background-color: #6B6B6B;
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
  margin: 0px 3px;
  font-size: .9rem
}

.box-bed {
  background-color: #FFFFFF;
  text-align: center;
  box-shadow: 0px 0px 3px #242424A6;
  border-radius: 5px;
  margin: 1px 3px;
  font-size: .9rem
}

.box-empty {
  background: #F0F0F0 0% 0% no-repeat padding-box;
  text-align: center;
  font-size: .9rem;
  height: 100%;
  width: 100%;
  color: #7C7C7C;
  border-radius: 5px;
}


table {
  border-collapse: separate;
  border-spacing: 0 0px;
}
</style>
