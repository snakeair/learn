<template>
  <div>
    <h2>{{titleName}}</h2>
  </div>
</template>

<script lang="ts" setup >
import { defineProps } from 'vue';
import type {PropType} from 'vue';

import type {titleName} from '../types'

defineProps({
  titleName: {
    type: String as PropType<titleName>,
    default: 'this is title from props'
  }
})
</script>

<style lang="scss" scoped>

</style>