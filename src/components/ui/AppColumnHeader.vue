<template>
  <div :class="[
    isArrowUp ? 'sheet-header--arrow-up' : '',
    isSorted ? '' : 'sheet-header--arrow-hidden'
    ]"
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
  },

  data() {
    return {
      isSorted: false,
      isArrowUp: false,
      direction: this.$route.query.direction,
      criterion: this.$route.query.criterion
    }
  },

  mounted() {
    if (this.header === this.criterion) {
      this.isSorted = true
      this.isArrowUp = this.direction === 'up'
    }
  }

})
</script>
