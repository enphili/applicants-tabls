<template>
  <div>
    <the-header/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '@/components/TheHeader.vue'

export default Vue.extend({
  name: 'MainPage',
  components: {
    TheHeader,
  },
})
</script>
