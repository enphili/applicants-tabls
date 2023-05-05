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

      <main class="sheet">

        <the-loader v-if="loader"/>

        <div class="sheet-row sheet__sheet-header sheet-header">
          <div>ФИО
            <div class="sheet-header--arrow-down">
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
                <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div>Дата подачи заявления
            <div class="sheet-header--arrow-up">
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
                <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div>Балл по русскому
            <div class="sheet-header--arrow-hidden">
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
                <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div>Балл по математике
            <div class="sheet-header--arrow-down">
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
                <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div>Балл по информатике
            <div class="sheet-header--arrow-down">
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
                <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div>Суммарный балл
            <div class="sheet-header--arrow-down">
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
                <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div>Процент
            <div class="sheet-header--arrow-down">
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
                <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <the-table
          v-for="student in studentsList"
          :key="student.id"
          :student="student"
          :is360="isWindowsWidthMobile"
        ></the-table>

      </main>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import AppSearch from '@/components/ui/AppSearch.vue'
import TheTable from '@/components/TheTable.vue'
import AppSortButton from '@/components/ui/AppSortButton.vue'
import TheLoader from '@/components/TheLoader.vue'

export default defineComponent({
  name: 'MainPage',

  data() {
    return {
      isActiveDown: false,
      isActiveUp: false,
      loader: false,
      isWindowsWidthMobile: false
    }
  },

  methods: {
    sortDown(): void {
      this.isActiveDown = true
      this.isActiveUp = false
    },

    sortUp(): void {
      this.isActiveUp = true
      this.isActiveDown = false
    },

    onResize() {
      if (window.innerWidth <= 365) this.isWindowsWidthMobile = true
    }
  },

  async mounted() {
    this.$nextTick(() => window.addEventListener('resize', this.onResize))
    this.loader = true
    await this.$store.dispatch('getDataFromAPI')
    this.loader = false
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  computed: {
    studentsList() {
      return this.$store.getters.studentsList
    }
  },

  components: {
    TheHeader,
    AppSearch,
    TheTable,
    AppSortButton,
    TheLoader
  }
})
</script>
