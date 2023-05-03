<template>
  <div>
    <the-header/>

    <div class="container">
      <h2 class="main-title">Список заявлений</h2>

      <app-search/>

      <div class="filter-wrapper">
        <div>select</div>

        <div></div>

        <app-sort-button
          direction="down"
          :is-active="isActiveDown"
          @click.native="sortDown"
        ></app-sort-button>

        <div></div>

        <app-sort-button
          direction="up"
          :is-active="isActiveUp"
          @click.native="sortUp"
        ></app-sort-button>
      </div>

      <the-table/>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import AppSearch from '@/components/ui/AppSearch.vue'
import TheTable from '@/components/TheTable.vue'
import AppSortButton from '@/components/ui/AppSortButton.vue'

export default defineComponent({
  name: 'MainPage',

  data() {
    return {
      isActiveDown: false,
      isActiveUp: false
    }
  },

  methods: {
    sortDown() {
      this.isActiveDown = true
      this.isActiveUp = false
    },

    sortUp() {
      this.isActiveUp = true
      this.isActiveDown = false
    }
  },

  components: {
    TheHeader,
    AppSearch,
    TheTable,
    AppSortButton,
  }
})
</script>
