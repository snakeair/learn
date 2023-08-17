<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import {persistStore} from '@/stores/persist'
const persist = persistStore()

// persist.count = 10;
console.log(persist.count)

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
