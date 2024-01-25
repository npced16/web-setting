<template>
  <div>
    <div class="flex  items-center justify-center border-black" v-for="(content, index) in getSubArray(columnIndex)"
      :key="content" :class="[`box-${content?.type}`]">
      {{ convertToRoom(content?.name, content?.type, index) }} <span v-if="content?.type === 'bed'">- {{ index -
        beforeIndex }}</span>
    </div>

  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';

const props = defineProps(['pageNumber', 'yAxis', 'xAxis', 'currDataArray']);

const getSubArray = computed(() => {
  const PN = props.pageNumber; // 이 부분은 props로 전달받은 값을 사용하도록 적절히 수정해주세요.
  const curryAxis = props.yAxis.value[PN - 1] * props.xAxis.value || 3 * props.xAxis.value;
  if (PN > 0) {
    const sumPage = getColumnOfyAxis(PN); // getColumnOfyAxis 함수가 정의되어 있다고 가정
    console.log('sumPage :>> ', sumPage);
    return props.currDataArray.slice(sumPage * props.xAxis.value, PN * curryAxis);
  }
  return [];
});
</script>

<style lang="scss" scoped>
.box-room {
  border: 2px solid #000000;
  background-color: #7F7F7F;
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
  margin: 0px 3px;
}

.box-bed {
  background-color: #F2F2F2;
  text-align: center;
  margin: 0px 3px;
}

.box-undefined {
  border-radius: 5px;
  min-height: 28px;
  /* border: 1px solid #000000; */

}
</style>