<template>
  <div>
    <the-header/>

    <div class="container">
      <h2 class="main-title">Список заявлений</h2>

      <app-search/>

      <div class="filter-wrapper">
        <div>select</div>

        <div></div>

        <app-sort-button/>

        <div></div>

        <app-sort-button/>
      </div>

      <the-table/>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import AppSearch from '@/components/ui/AppSearch.vue'
import TheTable from '@/components/TheTable.vue'
import AppSortButton from '@/components/ui/AppSortButton.vue'

export default Vue.extend({
  name: 'MainPage',
  components: {
    TheHeader,
    AppSearch,
    TheTable,
    AppSortButton,
  },
})
</script>
