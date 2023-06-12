<template>
  <div>
    index
  </div>
</template>

<script setup>
import {phoneFn, thrFn , deFn } from '@/assets/js/util'
console.log(phoneFn(13333333333));
import axios from '@/hooks/axios'

const {$post, $postt} = axios()

let url = `/Common/getcodenew_wx`
let data = {
  mobile: 13333333333,
  check: 1,
  code: 321456
}
$post(url, data).then( res => {
  console.log(res);
})



</script>

<style lang="scss" scoped>

</style>