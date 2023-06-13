<template>
  <div>
    index
  </div>
</template>

<script setup>
import {phoneFn, thrFn , deFn } from '@/assets/js/util'
console.log(phoneFn(13333333333));

// import {$post} from '@/assets/js/api'

import axios from '@/hooks/axios'
const {$post, $postt, header} = axios()

let url = `/Common/getcodenew_wx`
let data = {
  mobile: 13333333333,
  check: 1,
  code: 321456
}
header.value.apikey = '00000000000'
$post(url, data).then( res => {
  console.log(res);
})



</script>

<style lang="scss" scoped>

</style>