<template>
  <div>
    <the-header/>

    <div class="container">
      <h2 class="main-title">Список заявлений</h2>

      <app-search/>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import AppSearch from '@/components/ui/AppSearch.vue'

export default Vue.extend({
  name: 'MainPage',
  components: {
    TheHeader, AppSearch,
  },
})
</script>
