<template>
    <div
      class="sheet-row sheet__sheet-content sheet-content"
      @click="clickHandler(student?.name)"
    >
      <div v-if="is360" class="sheet-content__media-caption media-caption">{{ tableHeaders.name }}</div>
      <div>{{ student.name }}</div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">{{ tableHeaders.date }}</div>
      <div>{{
          new Date(student.date).getTime() !== new Date('1970-01-02').getTime()
          ? new Date(student.date).toLocaleDateString()
          : 'дата не указана'
           }}</div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">{{ tableHeaders.rusScore }}</div>
      <div
        :class="['sheet-content--score', `${getScoreColor(student?.subjects?.[0].score ?? 0)}`]"
      >
        {{
          student.subjects[0].subIndex === 0
            ? student.subjects[0]?.score
              ? student.subjects[0]?.score
              : ''
            : ''
        }}
      </div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">{{ tableHeaders.mathScore }}</div>
      <div
        :class="['sheet-content--score', `${getScoreColor(student?.subjects?.[1].score ?? 0)}`]"
      >
        {{
          student.subjects[1].subIndex === 1
            ? student.subjects[1]?.score
              ? student.subjects[1]?.score
              : ''
            : ''
        }}
      </div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">{{ tableHeaders.informScore }}</div>
      <div
        :class="['sheet-content--score', `${getScoreColor(student?.subjects?.[2].score ?? 0)}`]"
      >
        {{
          student.subjects[2].subIndex === 2
        ? student.subjects[2]?.score
          ? student.subjects[2]?.score
          : ''
        : ''
        }}
      </div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">{{ tableHeaders.total }}</div>
      <div class="sheet-content--score sheet-content--green">
        {{ student.total }}
      </div>

      <div v-if="is360" class="sheet-content__media-caption media-caption">{{ tableHeaders.percent }}</div>
      <div class="sheet-content__progress-bar progress-bar">
        <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
          <circle r="20" cx="22" cy="22" stroke-width="1"/>
          <circle
            :class="`${ getPercentColor(true, student?.percent) }`"
            r="20"
            cx="22"
            cy="22"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="`${ 2 * Math.PI * 20 }`"
            :stroke-dashoffset="`${ 2 * Math.PI * 20 * ((100 - student?.percent) / 100) }`"
          />
          <text x="22" y="-16" text-anchor="middle">{{ student?.percent }}%</text>
        </svg>
          <label for="progress-bar">{{ student?.percent }}%</label>
          <progress
            :class="`${ getPercentColor(false, student?.percent) }`"
            id="progress-bar"
            :value="student?.percent" max="100"
          >{{ student?.percent }}%</progress>
      </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {IStudent, ETableHeaders} from '@/model/types'

export default defineComponent({
  name: 'TheTable',

  props: {
    student: Object as PropType<IStudent>,
    is360: Boolean,
  },

  data() {
    return {
      tableHeaders: ETableHeaders
    }
  },

  methods: {
    getScoreColor(score: number): string {
      if (score < 3) return 'sheet-content--red'
      if (score >= 3 && score < 4) return 'sheet-content--orange'
      return 'sheet-content--green'
    },

    getPercentColor(isSvg: boolean, percent: number | undefined): string {
      if (!percent) return ''
      if (percent <= 25) return isSvg ? 'stroke-red' : 'progress-bar--red'
      if (percent > 25 && percent <= 50) return isSvg ? 'stroke-orange' : 'progress-bar--orange'
      return isSvg ? 'stroke-green' : 'progress-bar--green'
    },

    clickHandler(studentName: string = '') {
      console.log(`do something with the student: ${studentName}`)
    }
  }
})
</script>