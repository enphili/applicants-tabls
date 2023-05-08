<template>
  <div class="search-wrapper">
    <img alt="search icon" class="search-wrapper__glyphicon glyphicon" src="@/assets/img/search-icon.svg">
    <label for="search-input">
      <input
        id="search-input"
        type="text"
        class="search-wrapper__search-input search-input"
        :placeholder="placeholder"
        :value="searchText"
        @input="$emit('searchText', $event.target.value)"
      >
    </label>
    <img
      alt="reset search button"
      v-if="searchText"
      class="search-wrapper__close-search close-search"
      src="@/assets/img/close-btn.svg"
      @click="resetSearch"
    >
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AppSearch",

  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Ввести значение'
    },
    searchText: String
  },

  model: {
    prop: 'searchText',
    event: 'searchText'
  },

  methods: {
    resetSearch() {
      this.$emit('resetSearch')
    }
  }
})
</script>