<template>
  <div class="header">
    <div class="container">
      <div class="header__content">
        <header class="header__logo-wrapper logo-wrapper">
          <h1 hidden>SPA приложение для просмотра списка абитуриентов</h1>
          <div class="logo-wrapper__logo-icon logo-icon">
            <img src="@/assets/img/logo-icon.svg" alt="logotype">
          </div>
          <p class="logo-wrapper__logo-text logo-text">Система таблиц</p>
        </header>
        <div class="header__user-wrapper user-wrapper"
             @click="userLogin"
        >
          <div class="user-wrapper__user-text user-text">
            <p class="user-text__user-name user-name">{{ userName }}</p>
            <p class="user-text__user-role user-role">Сотрудник</p>
          </div>
          <div class="user-wrapper__user-photo user-photo">
            <img src="@/assets/img/userphoto.png" alt="user photo">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TheHeader",

  data() {
    return {
      userName: 'Светлана'
    }
  },

  methods: {
    userLogin() {
      console.log(this.userName)
    }
  }

})
</script>