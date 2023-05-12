<template>
  <div
    :class="classArrow"
  >{{ title }}
    <div>
      <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
        <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'AppColumnHeader',

  props: {
    title: {
      type: String,
      required: true
    },
    header: String,
    direction: String,
    criterion: String
  },

  computed: {
    classArrow(): string {
      if (this.header === this.criterion) {
        return this.direction === 'up' ? 'sheet-header--arrow-up': ''
      }
      return 'sheet-header--arrow-hidden'
    }
  }
})
</script>
