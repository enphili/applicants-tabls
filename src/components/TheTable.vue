<template>
    <div
      class="sheet-row sheet__sheet-content sheet-content"
      @click="clickHandler(student?.name)"
    >
      <div v-if="is360" class="sheet-content__media-caption media-caption">ФИО</div>
      <div>{{ student?.name }}</div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">Дата подачи заявления</div>
      <div>{{ student?.date }}</div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">Балл по русскому</div>
      <div
        :class="['sheet-content--score', `${getScoreColor(student?.subjects?.[0].score ?? 0)}`]"
      >
        {{ student.subjects?.[0]?.subIndex === 0 ? student.subjects[0]?.score : 0 }}
      </div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">Балл по математике</div>
      <div
        :class="['sheet-content--score', `${getScoreColor(student?.subjects?.[1].score ?? 0)}`]"
      >
        {{ student.subjects?.[1]?.subIndex === 1 ? student.subjects[1]?.score : 0 }}
      </div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">Балл по информатике</div>
      <div
        :class="['sheet-content--score', `${getScoreColor(student?.subjects?.[2].score ?? 0)}`]"
      >
        {{ student.subjects?.[2]?.subIndex === 2 ? student.subjects[2]?.score : 0 }}
      </div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">Суммарный балл</div>
      <div class="sheet-content--score sheet-content--green">
        {{ getTotalScore() }}
      </div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">Процент</div>
      <div class="sheet-content__progress-bar progress-bar">
        <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
          <circle r="20" cx="22" cy="22" stroke-width="1"/>
          <circle
            :class="`${ getPercentColor(true, percent) }`"
            r="20"
            cx="22"
            cy="22"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="`${ 2 * Math.PI * 20 }`"
            :stroke-dashoffset="`${ 2 * Math.PI * 20 * ((100 - percent) / 100) }`"
          />
          <text x="22" y="-16" text-anchor="middle">{{ percent }}%</text>
        </svg>
          <label for="progress-bar">{{ percent }}%</label>
          <progress
            :class="`${ getPercentColor(false, percent) }`"
            id="progress-bar"
            :value="percent" max="100"
          >{{ percent }}%</progress>
      </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {IStudent} from '@/model/types'
import {useTotalScore} from '@/use/totalScore'

export default defineComponent({
  name: "TheTable",

  props: {
    student: Object as PropType<IStudent>,
    is360: Boolean
  },

  data() {
    return {
      maxTotalScore: 15
    }
  },

  methods: {
    getScoreColor(score: number): string {
      if (score < 3) return 'sheet-content--red'
      if (score >= 3 && score < 4) return 'sheet-content--orange'
      return 'sheet-content--green'
    },

    getTotalScore(): number {
      const scoreArray = this.student?.subjects?.map(el => el.score)
      if (scoreArray) {
        return useTotalScore(...scoreArray)
      }
      return 0
    },

    // percent(): number {
    //   return Math.round(this.getTotalScore() * 100 / this.maxTotalScore)
    // },

    getPercentColor(isSvg: boolean, percent: number): string {
      if (percent <= 25) return isSvg ? 'stroke-red' : 'progress-bar--red'
      if (percent > 25 && percent <= 50) return isSvg ? 'stroke-orange' : 'progress-bar--orange'
      return isSvg ? 'stroke-green' : 'progress-bar--green'
    },

    clickHandler(studentName: string = '') {
      console.log(`do something with the student: ${studentName}`)
    }
  },

  computed: {
    percent(): number {
      return Math.round(this.getTotalScore() * 100 / this.maxTotalScore)
    }
  }
})
</script>