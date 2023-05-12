<template>
  <div>
    <the-header/>

    <div class="container">
      <h2 class="main-title">Список заявлений</h2>

      <app-search
        placeholder="Поиск"
        v-model="searchText"
        @resetSearch="resetSearch"
      />

      <div class="filter-wrapper">

        <app-select
          v-if="isWindowsWidthMobile"
          placeholder="Сортировать по"
          :selectData="selectValues"
          @select-choose="selectChoose"
        />

        <div></div>

        <app-sort-button
          direction="down"
          :is-active="sortDirection === 'down'"
          @click.native="sortTableByButton('down')"
        ></app-sort-button>

        <div></div>

        <app-sort-button
          direction="up"
          :is-active="sortDirection === 'up'"
          @click.native="sortTableByButton('up')"
        ></app-sort-button>
      </div>

      <main class="sheet">

        <the-loader v-if="loader"/>

        <div v-if="!isWindowsWidthMobile" class="sheet-row sheet__sheet-header sheet-header">
          <app-column-header
            v-for="(header, idx) in Object.keys(ETableHeaders)"
            :direction="typeof sortDirection === 'string' ? sortDirection : ''"
            :criterion="typeof sortCriterion === 'string' ? sortCriterion : ''"
            :key="idx"
            :header="header.toLowerCase()"
            :title="ETableHeaders[header]"
            @click.native="sortTable(header.toLowerCase())"
          ></app-column-header>
        </div>

        <the-table
          v-for="student in studentsList"
          :key="student.id"
          :student="student"
          :is360="isWindowsWidthMobile"
        ></the-table>

      </main>

    </div>

    <TheNotification
      v-if="showNotif"
      @remove-notif="showNotif = false"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import AppSearch from '@/components/ui/AppSearch.vue'
import TheTable from '@/components/TheTable.vue'
import AppSortButton from '@/components/ui/AppSortButton.vue'
import TheLoader from '@/components/TheLoader.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppColumnHeader from '@/components/ui/AppColumnHeader.vue'
import TheNotification from '@/components/ui/TheNotification.vue'
import {ETableHeaders, IStudent} from '@/model/types'

export default defineComponent({
  name: 'MainPage',

  data() {
    return {
      loader: false,
      ETableHeaders,
      showNotif: false,
      isWindowsWidthMobile: window.innerWidth <= 365,
      selectValues: Object.entries(ETableHeaders).map(([key, value]) => ({id: key.toLowerCase(), text: value})),
      searchText: this.$route.query.s,
      query: {s: this.$route.query.s, direction: this.$route.query.direction, criterion: this.$route.query.criterion},
      sortDirection: this.$route.query.direction,
      sortCriterion: this.$route.query.criterion
    }
  },

  methods: {
    setSortOptions(direction: string, criterion?: string) {
      this.sortDirection = direction
      if (criterion) {
        this.sortCriterion = criterion
        this.query.criterion = criterion
      }
      this.query.direction = direction
      const query = this.query
      this.$router.replace({query}).catch(() => {})
    },

    sortTable(header: string) {
      const direction = this.sortDirection === 'up' ? 'down' : 'up'
      this.setSortOptions(direction, header)
    },

    selectChoose(value: string) {
      const direction = typeof this.$route.query.direction === 'string' ? this.$route.query.direction : 'up'
      this.setSortOptions(direction, value)
    },

    sortTableByButton(direction: string) {
      if (!this.$route.query.criterion) {
        this.$store.commit('toastsArray', {
          icon: 'warning',
          text: 'Необходимо выбрать критерий сортировки!',
          timeOut: 2000
        })
        this.showNotif = true
        return
      }
      this.setSortOptions(direction)
    },

    onResize() {
      this.isWindowsWidthMobile = window.innerWidth <= 365
    },

    resetSearch() {
      this.searchText = ''
    }
  },

  async mounted() {
    this.$nextTick(() => window.addEventListener('resize', this.onResize))
    this.loader = true
    await this.$store.dispatch('getDataFromAPI')
    if (!this.$route.query.criterion) {
      this.setSortOptions('up', 'name')
    }
    this.loader = false
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  computed: {
    studentsList(): IStudent[] {
      return this
        .$store
        .getters
        .studentsList
        .sort((a: IStudent, b: IStudent) => {
          if (typeof this.sortCriterion !== 'string') return
          if (this.sortCriterion === 'name') {
            if (a[this.sortCriterion] > b[this.sortCriterion]) return this.sortDirection === 'up' ? 1 : -1
            if (a[this.sortCriterion] < b[this.sortCriterion]) return this.sortDirection === 'up' ? -1 : 1
            return 0
          }
          if (this.sortCriterion === 'total' || this.sortCriterion === 'percent') {
            return this.sortDirection === 'up'
              ? a[this.sortCriterion] - b[this.sortCriterion]
              : b[this.sortCriterion] - a[this.sortCriterion]
          }
          if (this.sortCriterion === 'date') {
            return this.sortDirection === 'up'
              ? new Date(a[this.sortCriterion]).getTime() - new Date(b[this.sortCriterion]).getTime()
              : new Date(b[this.sortCriterion]).getTime() - new Date(a[this.sortCriterion]).getTime()
          }
          else {
            const subjects = ['russcore', 'mathscore', 'informscore']
            const idx = subjects.indexOf(this.sortCriterion)
            const scoresA = a.subjects.map(score => score.score)[idx]
            const scoresB = b.subjects.map(score => score.score)[idx]
            return this.sortDirection === 'up' ? scoresA - scoresB : scoresB - scoresA
          }
        })
        .filter((student: IStudent) => {
          return this.searchText && typeof this.searchText === 'string'
            // -> результат, сужающий поиск (поиск "живой")
            ? student.name.toLowerCase().includes(this.searchText) : true
          // -> результат, расширяющий поиск по отдельным словам
          // ? student.name.toLowerCase().split(' ').some(word => this.searchText.includes(word)) : true
        })
    },
  },

  watch: {
    searchText: function(newVal) {
      this.query.s = newVal.toLowerCase().trim()
      const query = this.query
      this.$router.replace({query}).catch(() => {})
    }
  },

  components: {
    TheHeader,
    AppSearch,
    TheTable,
    AppSortButton,
    TheLoader,
    AppSelect,
    AppColumnHeader,
    TheNotification
  }
})
</script>
