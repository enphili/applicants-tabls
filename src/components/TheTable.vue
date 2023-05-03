<template>
  <main class="sheet">
    <div class="sheet-row sheet__sheet-header sheet-header">
      <div>ФИО
        <div class="sheet-header--arrow-down">
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
            <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div>Дата подачи заявления
        <div class="sheet-header--arrow-up">
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
            <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div>Балл по русскому
        <div class="sheet-header--arrow-hidden">
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
            <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div>Балл по математике
        <div class="sheet-header--arrow-down">
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
            <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div>Балл по информатике
        <div class="sheet-header--arrow-down">
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
            <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div>Суммарный балл
        <div class="sheet-header--arrow-down">
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
            <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div>Процент
        <div class="sheet-header--arrow-down">
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8L7 4L4.76995e-08 4L3.5 8Z" fill="#006CFE"/>
            <path d="M3.5 0L3.5 4" stroke="#006CFE" stroke-width="2"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="sheet-row sheet__sheet-content sheet-content">
      <div class="sheet-content__media-caption media-caption">ФИО</div>
      <div>Иванов Иван Иванович</div>
      <div class="sheet-content__media-caption media-caption">Дата подачи заявления</div>
      <div>03.04.2023</div>
      <div class="sheet-content__media-caption media-caption">Балл по русскому</div>
      <div class="sheet-content--score sheet-content--green">4.8</div>
      <div class="sheet-content__media-caption media-caption">Балл по математике</div>
      <div class="sheet-content--score sheet-content--orange">3.6</div>
      <div class="sheet-content__media-caption media-caption">Балл по информатике</div>
      <div class="sheet-content--score sheet-content--red">4.8</div>
      <div class="sheet-content__media-caption media-caption">Суммарный балл</div>
      <div class="sheet-content--score sheet-content--green">12.8</div>
      <div class="sheet-content__media-caption media-caption">Процент</div>
      <div class="sheet-content__progress-bar progress-bar">
        <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
          <circle r="20" cx="22" cy="22" stroke-width="1" stroke="black"/>
          <circle
            class="stroke-green"
            r="20"
            cx="22"
            cy="22"
            stroke-width="3"
            stroke-linecap="round"
            stroke-dasharray="94.2"
            stroke-dashoffset="0"
          />
          <text x="22" y="-16" text-anchor="middle">100%</text>
        </svg>
        <label for="progress-bar">50%</label>
        <progress class="progress-bar--orange" id="progress-bar" value="50" max="100">50 %</progress>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TheTable"
})
</script>