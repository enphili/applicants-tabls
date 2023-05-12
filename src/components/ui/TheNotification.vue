<template>
  <div class="notification-container">
    <div
      class="notification"
      v-for="toast in toastsArray"
    >
      <img
        :alt="`${toast.icon} icon`"
        :src="`./${toast.icon}-icon.svg`">
      <p>{{ toast.text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TheNotification",

  computed: {
    toastsArray() {
      return this.$store.getters.toastsArray
    }
  },

  watch: {
    toastsArray: function(newVal){
      if (newVal.length === 0) {
        this.$emit('remove-notif')
      }
    }
  }

})
</script>

<style scoped lang="sass">
@import "@/assets/css/variables"
.notification-container
  position: fixed
  top: 15px
  right: 0
  left: 0
  margin: auto
  width: 300px
  max-width: calc(100% - 80px)
  z-index: 700
.notification
  @include flex-ali-cent
  justify-content: flex-start
  margin-bottom: 15px
  padding: 10px 15px
  background-color: $blue-super-light
  border-radius: 5px
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
  color: $black
  line-height: 20px
  animation: grow 0.5s ease-in forwards
  & img
    width: 30px
    height: 30px
  & p
    margin-left: 10px
  &.hide
    animation: shrink 0.3s ease-out forwards
  & strong
    font-size: 12px
    line-height: 20px
    letter-spacing: 0.5px
    text-transform: uppercase
@media only screen and (max-width: 365px)
  .notification-container
    max-width: calc(100% - 24px)
@keyframes grow
  from
    opacity: 0
    transform: scale(0.8)
  to
    opacity: 1
    transform: scale(1)
@keyframes shrink
  to
    opacity: 0
    transform: scale(0.8)
</style>