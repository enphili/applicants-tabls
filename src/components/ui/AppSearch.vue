<template>
  <div class="search-wrapper">
    <img class="search-wrapper__glyphicon glyphicon" src="@/assets/img/search-icon.svg">
    <label for="search-input">
      <input id="search-input" type="search" class="search-wrapper__search-input search-input" placeholder="Поиск">
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AppSearch"
})
</script>