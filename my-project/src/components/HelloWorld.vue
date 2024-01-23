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
          <div style="display: flex;" v-for="list in itemList.data" :key="list">
            <div class="box-bed">{{ convertToRoomNumber(list.room_name) }}</div>
            <div class="box-bed"> {{ list.room_bedNum }}인실</div>
            <input class="box-bed" :value="currData[list.room_name]?.startPoint"
              :v-model="currData[list.room_name].startPoint"
              @input="updateStartPoint(list.room_name, list.room_bedNum, $event.target.value)" />
            <!-- {{ currData[list.room_name].startPoint }} -->

            <div class="box-room">{{ currData[list.room_name]?.endPoint }}</div>
          </div>
        </div>
        <div style="width: 100%;">
          <div style="display: flex;width: 100%;">
            <div class="box-room sm-640px">page수 : {{ pageNumber }}P</div>
            <div class="box-room w-64">세로 최대 카드 수 : {{ xAxis }}</div>
            <div class="box-room w-64">P1 : {{ yAxis }}</div>
            <div class="box-room w-64">P2 : y0</div>
          </div>
          <!-- <div v-if="TotalData != null">
            <div v-for="content in TotalData" :key="content" style="margin: 10px ;border: 3px solid ; ">
              <div :style="'grid-template-columns: repeat(' + content.size + ', 1fr);'"
                style="display: grid; height: 100%; width: 100%;">
                <div v-for="item in content.col" :key="item" style="display: grid;"
                  :style="'grid-template-rows: repeat(' + xAxis + ', 1fr);'">
                  <div v-for="box, index in item" :key="box" :class="[`box-${box.type}`]">
                    {{ convertToRoom(box.name, box.type, index) }}
                    <span v-if="box.type === 'bed'">- {{ index - beforeIndex }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div style="margin: 10px ;border: 3px solid ; ">
            <div :style="gridStyle">
              <div v-for="(content, index) in subArray" :key="content" :class="[`box-${content?.type}`]">
                {{ convertToRoom(content?.name, content?.type, index) }}
                <span v-if="content?.type === 'bed'">- {{ index - beforeIndex }}</span>
                {{ index }}
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
const yAxis = ref(3)
const xAxis = ref(12)
const pageNumber = ref(2)
const currPage = ref(0)
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
const gridStyle = computed(() => ({
  display: 'grid',
  gridAutoFlow: 'column',// 열 방향으로 그리드 아이템 나열
  gridTemplateRows: `repeat(${xAxis.value}, 1fr)`,
  gridTemplateColumns: `repeat(${yAxis.value}, 1fr)`
}));
const subArray = computed(() => getSubArray(0, 36));
let TotalData = reactive(null)
function getCreatedPageData() {
  const newData = [];
  const yLength = yAxis.value;
  let count = 0
  for (let i = 0; i < pageNumber.value; i++) {
    const page = { size: yLength, col: [] };
    for (let range = 0; range < yLength; range++) {
      const col = [];
      for (let temp = 0; temp < xAxis.value; temp++) {
        const currPage = count++
        col.push(newIntDataArray[currPage] || '');
      }
      page.col.push(col);
    }
    newData.push(page);
  }
  return newData;
}

let newIntDataArray = new Array(pageNumber.value * yAxis.value * xAxis.value)
function getSubArray(start) {
  console.log('object :>> ', newIntDataArray);

  return newIntDataArray.slice(start, 102);
}
const newContents = reactive([{
  size: 3,
  col: []
}])

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
              endPoint: ''
            }
            newIntDataArray[currDataIndex] = { type: 'room', name: data.name }
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
          newIntDataArray[currDataIndex] = { type: 'bed', name: data.name }
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
        endPoint: ''
      }
    }
  }
}
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
  }, {
    "_id": "65a48e674a64efd1ca01c388", "room_name": "10",
    "ward_name": "63병동", "editBy": "ext-linker", "room_bedNum": "2", "room_isValid": 1, "room_type": "CU", "updatedAt": "2024-01-22 14:15:06", "createdAt": "2024-01-15 10:46:15"
  }, {
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
  // room_bedNum을 숫자로 변환하여 비교
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
function addNumberToCell(bedNumber, baseCell) {
  const baseRegex = /^([a-zA-Z]+)([0-9]+)$/;
  if (!bedNumber || !baseCell || baseCell.match(baseRegex) === null) {
    return '';
  }
  const [, baseAlpha, baseNum] = baseCell.match(baseRegex);
  const resultNum = Number(baseNum) + Number(bedNumber);
  if (resultNum > xAxis.value) {
    return '';
  }
  return `${baseAlpha}${resultNum}`;
}
function updateStartPoint(roomName, roomBedNum, value) {
  const convertRoomNumber = addNumberToCell(roomBedNum, value);
  if (convertRoomNumber === '') {
    console.error('Error: Invalid input');
    currData[roomName].startPoint = value;
    currData[roomName].endPoint = null;
    return '';
  }
  currData[roomName].startPoint = value;
  currData[roomName].endPoint = convertRoomNumber;
}

const wardList = ["61병동", "63병동", "133병동", "81병동"]
const selectWard = ref(null)


onBeforeMount(() => {
  getContents(contents)
  settingContents()
  TotalData = getCreatedPageData()

})


</script>

<style >
.box-room {
  border: 2px solid #000000;
  background-color: #7F7F7F;
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
  min-width: 80px;
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
  min-width: 80px;

}

.draggable {
  cursor: move;
}
</style>
