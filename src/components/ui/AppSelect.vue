<template>
  <div :class="['select', {open: isOpen}]">
    <div class="select__backdrop" @click="close"></div>
    <div class="select__input" @click="toggleSelect">
      <div class="select__input-views">
        <span :class="{placeholder: selectValue}">{{ placeholder }}</span>
        <span>{{ selectText }}</span>
      </div>
      <img
        src="@/assets/img/arrow-down-big.svg"
        alt="arrow down"
        :class="[isOpen ? 'select-arrow-up' : 'select-arrow-down']"
      >
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        <li
          v-for="(value, index) in selectData"
          :key="value.id"
          :class="['select__item', {'selected': index === selectId}]"
          :data-id="value"
          @click="select(value, index)"
          v-model="selectValue"
        >{{ value.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {TSelectData} from '@/model/types'

export default defineComponent({
  name: 'AppSelect',

  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Выбрать значение'
    },
    selectData: {
      type: Array as PropType<TSelectData[]>,
      required: true
    },
  },

  data(): {
    isOpen: boolean,
    selectId: number,
    selectValue: string,
    selectText: string
  }
  {
    return {
      isOpen: false,
      selectId: -1,
      selectValue: '',
      selectText: ''
    }
  },

  methods: {
    toggleSelect() {
      this.isOpen = !this.isOpen
    },

    close() {
      this.isOpen = false
    },

    select(value: TSelectData, index: number) {
      this.selectValue = value.id
      this.isOpen = false
      this.selectId = index
      this.selectText = value.text
      this.$emit('select-choose', this.selectValue)
    }
  },

  mounted() {
    this.selectValue = typeof this.$route.query.criterion === 'string' ? this.$route.query.criterion : ''
    this.selectText = this.selectData.find(el => el.id === this.selectValue)?.text ?? ''
  }
})
</script>