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
            <tr class="" v-for="item in wardList.data" :key="item">
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.ward_name }}</td>
              <td class="px-2 py-1  border text-md font-semibold text-center">{{ item?.ward_code }}</td>
              <td class="px-2 py-1  lg:w-64 border text-md font-semibold text-center">
                <div class="flex  justify-around">
                  <button type="button" class="py-1 px-3 text-base font-medium text-white focus:outline-none bg-[#678FFF] rounded-lg border border-[#678FFF]
        hover:bg-white hover:text-[#678FFF]  focus:z-10 focus:ring-4 focus:ring-gray-200">
                    <router-link :to="getLinkTo(item.ward_name)">
                      수정 </router-link>

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
import axios from "axios"
import { useClientStore } from '@/store/client';
const clientStore = useClientStore()
const wardList = reactive({})
async function getWardList() {
  const payload = {
    key: clientStore.key
  }
  const config = {
    method: "get",
    url: clientStore.getWardUrl() + `?key=${payload.key}`
  };
  wardList.data = await axios(config).then((res) => {
    return res.data.data
  })
}
function getLinkTo(wardName) {
  return { name: 'settingPage', query: { id: wardName } };
}
onBeforeMount(() => {
  getWardList()
})


</script>
<style scoped>
/* 파일 입력 필드 스타일 수정 */
input[type="file"] {
  display: none;
  /* 원래 버튼 감추기 */
}
</style>
