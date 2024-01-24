<template>
  <div class="primary-frame">
    <div class="primary-body">
      <select class="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
        v-model="selectWard">
        <option value="null" selected>병동 선택</option>
        <option v-for="ward in wardList" :value="ward" :key="ward">{{ ward }}</option>
      </select>

      <div style=" display: flex;">
        <div style=" height: 300px; ">
          <section class="container mx-auto p-6 font-mono">
            <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div class="w-full overflow-x-auto">
                <table class=" w-full">
                  <thead>
                    <tr
                      class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th class="px-4 py-3 text-center min-w-32">병실 명 </th>
                      <th class="px-4 py-3 text-center min-w-32">침상 수 </th>
                      <th class="px-4 py-3 text-center min-w-32">시작 위치</th>
                      <th class="px-4 py-3 text-center min-w-32">마지막 위치</th>
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
                        <input class="px-2 py-1 font-semibold leading-tight rounded-sm"
                          :value="currData[list.room_name]?.startPoint"
                          @input="updateStartPoint(list.room_bedNum, list.room_name, $event.target.value)"
                          :class="{ 'bg-green-100 text-green-700': currData[list.room_name]?.endPoint !== null, 'bg-red-100 text-red-700': currData[list.room_name]?.endPoint == null }">
                      </td>
                      <td class="px-4 py-3 border text-sm">{{ currData[list.room_name]?.endPoint }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        <div class="w-full">
          <div class="flex w-full">
            <div class="box-room w-32">page수 : {{ pageNumber }}P</div>
            <div class="box-room w-32">세로 최대 카드 수 : {{ xAxis }}</div>
            <div v-for="pageIndex in pageNumber" :key="pageIndex" class="box-room w-32">
              Page {{ pageIndex }} : {{ yAxis[pageIndex - 1] }}
            </div>
          </div>

          <div class="flex flex-auto w-full  flex-wrap">
            <div v-for="columnIndex in pageNumber" :key="columnIndex" class="w-6/12" :style="gridStyle(columnIndex)">
              <div v-for="(content, index) in getSubArray(columnIndex)" :key="content" :class="[`box-${content?.type}`]">
                {{ convertToRoom(content?.name, content?.type, index) }}
                <span v-if="content?.type === 'bed'">- {{ index - beforeIndex }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, reactive, computed } from 'vue';
const yAxis = ref([3, 3])
const xAxis = ref(12)
const pageNumber = ref(2)

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
// const gridStyle = computed(() => ({
//   display: 'grid',
//   gridAutoFlow: 'column',// 열 방향으로 그리드 아이템 나열
//   gridTemplateRows: `repeat(${xAxis.value}, 1fr)`,
//   gridTemplateColumns: `repeat(${yAxis.value}, 1fr)`
// }));

function gridStyle(index) {
  const rowstyle = yAxis.value[index - 1] || 3
  const style = {
    display: 'grid',
    gridAutoFlow: 'column',// 열 방향으로 그리드 아이템 나열
    gridTemplateRows: `repeat(${xAxis.value}, 1fr)`,
    gridTemplateColumns: `repeat(${rowstyle}, 1fr)`,
    border: `5px solid #1fF211`,
    padding: '4px',
    borderRadius: "15px"
  }
  return style
}
function getCreatedPageData() {
  const newData = [];
  let count = 0
  for (let i = 0; i < pageNumber.value; i++) {
    const yLength = yAxis.value[i];
    const page = { size: yLength, col: [] };
    for (let range = 0; range < yLength; range++) {
      const col = [];
      for (let temp = 0; temp < xAxis.value; temp++) {
        const currPage = count++
        col.push(currDataArray[currPage] || '');
      }
      page.col.push(col);
    }
    newData.push(page);
  }
  return newData;
}

let currDataArray = reactive([])
function getSubArray(currPage) {
  const curryAxis = yAxis.value[currPage - 1] * xAxis.value || 3 * xAxis.value
  if (currPage > 0) { return currDataArray.slice((currPage - 1) * curryAxis, currPage * curryAxis); }
  return currDataArray.slice(currPage * curryAxis);
}

const currData = reactive({})
function getContents(contents) {
  let size = 0
  let currDataIndex = 0
  for (const content of contents) {
    for (const item in content.col) {
      let count = 0 //
      for (const data of content.col[item]) {
        ++count
        if (data.type == 'room') {
          if (!currData[data.name]) {
            currData[data.name] = {
              startPoint: numberToAlphabet(parseInt(item) + size) + count,
              start: currDataIndex,
              end: 0,
              endPoint: null
            }
            currDataArray[currDataIndex] = { type: 'room', name: data.name }
            if (!currData?.table) {
              currData.table = {};
            }
            if (!currData.table[item]) {
              currData.table[item] = [data.name];
            } else {
              currData.table[item].push(data.name); ``
            }
          }
        }
        if (data.type == 'bed') {
          currData[data.name].endPoint = numberToAlphabet(parseInt(item) + size) + count
          currData[data.name].end = currDataIndex
          currDataArray[currDataIndex] = { type: 'bed', name: data.name }
        }
        currDataIndex++
      }
    }
    size += content.size // 다음 table 시 size 설정용
  }
}


function numberToAlphabet(number) {
  return String.fromCodePoint(parseInt(number) + 65)
}

function settingContents() {
  for (const list of itemList.value.data) {
    if (!currData[list.room_name] && list.room_name) {
      currData[list.room_name] = {
        startPoint: '',
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
    "room_name": "19", "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "2", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
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
 *                            (예: ['A3', 5, 7]) 또는 false (입력 오류 시)
 *                            
 * @example
 * // 사용 예제
 * var result = addNumberToCell(2, 'A1');
 * console.log(result); // ['A3', 1, 3]
 */
function addNumberToCell(roomBedNum, value) {
  const baseRegex = /^([a-zA-Z]+)([0-9]+)$/;

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
  const currDataNumber = (upperAlpha.charCodeAt(0) - 'A'.charCodeAt(0)) * xAxis.value + Number(baseNum);

  // 결과 숫자 계산
  const resultNum = Number(baseNum) + Number(roomBedNum);

  // 결과 숫자가 범위를 초과하면 false 반환
  if (resultNum > xAxis.value) {
    return false;
  }

  // 결과값과 범위의 시작과 끝을 배열로 반환
  return [`${upperAlpha}${resultNum}`, currDataNumber, currDataNumber + Number(roomBedNum)];
}


/**
 * 
 * @param {*} roomBedNum 침상 수
 * @param {*} roomName 병실 이름
 * @param {*} value 입력값
 */
function updateStartPoint(roomBedNum, roomName, value) {
  console.log('value :>> ', roomBedNum, roomName, value);
  deleteBedInList(roomName)
  // console.log('  :>> ', addBedInList(10, 12, 24,));

  const convertRoomNumber = addNumberToCell(roomBedNum, value);
  if (!convertRoomNumber) {
    console.error('Error: Invalid input');
    currData[roomName].startPoint = value;
    currData[roomName].endPoint = null;
    return '';
  }
  if (!isEmptyBed(convertRoomNumber[1], convertRoomNumber[2])) {
    console.error('Error: add Error');
    currData[roomName].startPoint = value;
    currData[roomName].endPoint = null;
    return '';
  }
  if (!addBedInList(roomName, convertRoomNumber[1], convertRoomNumber[2])) {
    console.error('Error: add Error');
    currData[roomName].startPoint = value;
    currData[roomName].endPoint = null;
    return '';
  }
  currData[roomName].startPoint = addNumberToCell(0, value)[0];
  currData[roomName].endPoint = convertRoomNumber[0];

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
  console.log('nexIntDataArray :>> ', currDataArray);
}
function addBedInList(roomBedNum, startPoint, endPoint) {
  if (isEmptyBed(startPoint - 1, endPoint)) {
    // if is empty array , push newData
    for (let i = startPoint - 1; i < endPoint; i++) {
      if (i == startPoint - 1) {
        currDataArray[i] = { type: 'room', name: roomBedNum }
      } else
        currDataArray[i] = { type: 'bed', name: roomBedNum }
    }
    console.log('nexIntDataArray :>> ', currDataArray);
    return true
  }
  return false
}
function isEmptyBed(startPoint, endPoint) {
  if (startPoint && endPoint) {
    const newArray = currDataArray.slice(startPoint, endPoint)
    for (const item of newArray) {
      console.log('newArray :>> ', newArray);
      if (item != undefined) return false
    }
  }
  return true
}

const wardList = ["61병동", "63병동", "133병동", "81병동"]
const selectWard = ref(null)

onBeforeMount(() => {
  getContents(contents)
  settingContents()
  getCreatedPageData()

})


</script>

<style >
.box-room {
  border: 2px solid #000000;
  background-color: #7F7F7F;
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
  min-width: 60px;
  margin: 3px;
  padding: 1px;
}

.box-bed {
  border: 2px solid #000000;
  background-color: #F2F2F2;
  text-align: center;
  border-radius: 5px;
  margin: 3px;
  padding: 1px;
  min-width: 60px;

}

.draggable {
  cursor: move;
}
</style>
