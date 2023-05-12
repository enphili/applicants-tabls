<template>
  <div class="loader-wrap">
    <div class="loader">
      <div class="loader-line line-one"></div>
      <div class="loader-line line-two"></div>
      <div class="loader-line line-three"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'TheLoader'
})
</script>

<style scoped lang="sass">
.loader-wrap
  position: absolute
  display: flex
  align-items: flex-start
  justify-content: center
  width: 100%
  height: 50px
  background: #fff
  z-index: 100
.loader
  position: relative
  width: 50px
  height: 50px
  perspective: 780px
.loader-line
  position: absolute
  width: 100%
  height: 100%
  box-sizing: border-box
  border-radius: 50%
.line-one
  left: 0
  top: 0
  animation: line-rotate-one 1.15s linear infinite
  border-bottom: 3px solid #070bee
.line-two
  right: 0
  top: 0
  animation: line-rotate-two 1.15s linear infinite
  border-right: 3px solid #3cff01
.line-three
  right: 0
  bottom: 0
  animation: line-rotate-three 1.15s linear infinite
  border-top: 3px solid #DD2C00
@keyframes line-rotate-one
  0%
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg)
  100%
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg)
@keyframes line-rotate-two
  0%
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg)
  100%
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg)
@keyframes line-rotate-three
  0%
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg)
  100%
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg)
</style>