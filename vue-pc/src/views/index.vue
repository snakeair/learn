<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import {configStore} from '@/stores/config'
const config = configStore()

// config.count = 10;
console.log(config.count)

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
