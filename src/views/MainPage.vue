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
          :is-active="isActiveDown"
          @click.native="sortTableByButton(true)"
        ></app-sort-button>

        <div></div>

        <app-sort-button
          direction="up"
          :is-active="isActiveUp"
          @click.native="sortTableByButton(false)"
        ></app-sort-button>
      </div>

      <main class="sheet">

        <the-loader v-if="loader"/>

        <div v-if="!isWindowsWidthMobile" class="sheet-row sheet__sheet-header sheet-header">
          <app-column-header
            v-for="(header, idx) in Object.keys(ETableHeaders)"
            :key="idx"
            :header="header.toLowerCase()"
            :title="ETableHeaders[header]"
            @click.native="sortTable(header.toLowerCase(), $event)"
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
      isActiveDown: this.$route.query.direction === 'down',
      isActiveUp: this.$route.query.direction === 'up',
      loader: false,
      isWindowsWidthMobile: window.innerWidth <= 365,
      ETableHeaders,
      selectValues: Object.entries(ETableHeaders).map(([key, value]) => ({id: key.toLowerCase(), text: value})),
      searchText: this.$route.query.s,
      nameSortColumn: this.$route.query.criterion,
      isDirectionUp: this.$route.query.direction === 'up',
      query: {s: this.$route.query.s, direction: this.$route.query.direction, criterion: this.$route.query.criterion},
      showNotif: false
    }
  },

  methods: {
    sortTable(header: string, event: Event) {
      // ...
      this.nameSortColumn = header
      this.isDirectionUp = !this.isDirectionUp
      this.isActiveUp = this.isDirectionUp
      this.isActiveDown = !this.isDirectionUp
      const target = event.currentTarget as HTMLElement
      if (target) {
        for (const el of target.parentElement?.children ?? []) {
          el.classList.add('sheet-header--arrow-hidden')
        }
        target.classList.remove('sheet-header--arrow-hidden')
        this.isDirectionUp
          ? target.classList.add('sheet-header--arrow-up')
          : target.classList.remove('sheet-header--arrow-up')
      }
      this.query.direction = this.isDirectionUp ? 'up' : 'down'
      this.query.criterion = this.nameSortColumn
      const query = this.query
      this.$router.replace({query}).catch(() => {})
    },

    selectChoose(value: string) {
      this.nameSortColumn = value
      this.isActiveDown = !this.isDirectionUp
      this.query.direction = this.isDirectionUp ? 'up' : 'down'
      this.query.criterion = value
      const query = this.query
      this.$router.replace({query}).catch(() => {})
    },

    sortTableByButton(indicator: boolean) {
      if (!this.$route.query.criterion) {
        this.$store.commit('toastsArray', {
          icon: 'warning',
          text: 'Необходимо выбрать критерий сортировки!',
          timeOut: 2000
        })
        this.showNotif = true
        return
      }
      this.isActiveDown = indicator
      this.isActiveUp = !indicator
      this.isDirectionUp = !indicator
      this.query.direction = this.isDirectionUp ? 'up' : 'down'
      const query = this.query
      this.$router.replace({query}).catch(() => {})
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
          if (typeof this.nameSortColumn !== 'string') return
          if (this.nameSortColumn === 'name') {
            if (a[this.nameSortColumn] > b[this.nameSortColumn]) return this.isDirectionUp ? 1 : -1
            if (a[this.nameSortColumn] < b[this.nameSortColumn]) return this.isDirectionUp ? -1 : 1
            return 0
          }
          if (this.nameSortColumn === 'total' || this.nameSortColumn === 'percent') {
            return this.isDirectionUp
              ? a[this.nameSortColumn] - b[this.nameSortColumn]
              : b[this.nameSortColumn] - a[this.nameSortColumn]
          }
          if (this.nameSortColumn === 'date') {
            return this.isDirectionUp
              ? new Date(a[this.nameSortColumn]).getTime() - new Date(b[this.nameSortColumn]).getTime()
              : new Date(b[this.nameSortColumn]).getTime() - new Date(a[this.nameSortColumn]).getTime()
          }
          else {
            const subjects = ['russcore', 'mathscore', 'informscore']
            const idx = subjects.indexOf(this.nameSortColumn)
            const scoresA = a.subjects.map(score => score.score)[idx]
            const scoresB = b.subjects.map(score => score.score)[idx]
            return this.isDirectionUp ? scoresA - scoresB : scoresB - scoresA
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
