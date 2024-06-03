const { createApp, ref } = Vue

createApp({
  setup() {
    const size = ref([1,2,3,4,5,6,7])
    return {
      size
    }
  }
}).mount('#app')