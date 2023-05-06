<template>
  <div v-if="pageAll > 1">
    <div class="page-turn">
      <span class="all">共{{pageAll}}页</span>
      <span class="btn-frist btn-num" @click="pageFn(1)">首页</span>
      <span class="btn-prev btn-num" @click="pageFn(pageId - 1)">上一页</span>
      <em class="more" v-if="pageId > 3">...</em>
      <span class="btn-num" @click="pageFn(pageId - 1)" v-if="(pageId - 2) > 0">{{pageId - 2}}</span>
      <span class="btn-num" @click="pageFn(pageId - 2)" v-if="(pageId - 1) > 0">{{pageId - 1}}</span>
      <span class="btn-num cur" @click="pageFn(pageId)">{{pageId}}</span>
      <span class="btn-num" @click="pageFn(pageId + 1)" v-if="(pageId + 1) <= pageAll">{{pageId + 1}}</span>
      <span class="btn-num" @click="pageFn(pageId + 2)" v-if="(pageId + 2) <= pageAll">{{pageId + 2}}</span>
      <em class="more" v-if="pageId <  (pageAll - 2)">...</em>
      <span class="btn-next btn-num" @click="pageFn(pageId + 1)">下一页</span>
      <span class="inp-page">跳至<input type="number" v-model="pageInput" @keydown.enter="pageFn(pageInput)"
          class="inp-number">页</span>
      <span class="btn-sub btn-num" @click="pageFn(pageInput)">确定</span>
    </div>
  </div>
</template>

<script setup lang="ts">

let emit = defineEmits(['emitPageFn'])

const props = defineProps({
  pageAll:{
    type: Number,
    default: 1
  },
  pageId: {
    type: Number,
    default: 1
  }
})


const pageInput = ref<number>()
const pageFn = (index: number | undefined):void =>  {
  index = parseInt(`${index}`)
  if (index) {
    if (index < 1) {
      index = 1
    }
    if (index > props.pageAll) {
      index = props.pageAll
    }
    emit('emitPageFn', index)
  }
}
</script>

<style scoped lang="scss" >

.page-turn{ display: flex; justify-content: center; align-items: center; padding: 6px 0 24px; font-size: 14px;
  >.btn-num{display: inline-block;  cursor: pointer; vertical-align: middle; border:1px solid $border; box-sizing: border-box; padding: 8px 10px; margin: 0 4px; text-align: center;
    &:hover,
    &.cur{ color: $blue; border-color: $blue;}
    &.btn-sub{ width: 66px; color: $blue; }
  }
  .all{display: inline-block;  vertical-align: middle; margin-right: 6px;}
  .more{display: inline-block;  vertical-align: middle; margin:0 4px; }
  .inp-page{display: inline-block;  vertical-align: middle; margin: 0 5px;
    .inp-number{ width: 30px; height: 30px; border:1px solid $border; text-align: center; margin: 0 10px;}
  }
}
.page-turn-news{ font-size: 14px;
  .btn-turn-news{ margin-bottom: 18px;}
}

</style>

