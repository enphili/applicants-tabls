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
          v-for="item in data"
          :key="item.id"
          :class="['select__item', {'selected': item.id === selectId}]"
          :data-id="item.id"
          @click="select(item)"
          v-model="selectValue"
        >{{ item.value }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {ISelectData} from '@/model/types'

export default defineComponent({
  name: "AppSelect",

  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Выбрать значение'
    },
    data: {
      type: Array as PropType<ISelectData[]>,
      required: true,
    }
  },

  data(): {
    selectValue: null | ISelectData,
    isOpen: boolean,
    selectId: number | string,
    selectText: string
  }
  {
    return {
      isOpen: false,
      selectValue: null,
      selectId: 0,
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

    select(item: ISelectData) {
      this.selectValue = item
      this.isOpen = false
      this.selectId = item.id
      this.selectText = item.value
      console.log('Выбрано значение:', this.selectValue.value)
    }
  }
})
</script>