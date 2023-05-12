import Vue from 'vue'
import Vuex from 'vuex'
import {IStudent, ISubject} from '@/model/types'
import {useArrayContains} from '@/use/arrayContains'
import {useTotalScore} from '@/use/totalScore'
// если грузить не с сервера
// import mockData from '@/use/mockData.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentsList: [],
    maxTotalScore: 15,
    toastsArray: [] as {icon: string, text: string, timeOut: number }[]
  },
  
  getters: {
    studentsList(state): IStudent[] {
      return state.studentsList.sort()
    },
    
    toastsArray(state) {
      return state.toastsArray
    }
  },
  
  mutations: {
    studentsList(state, payload) {
      payload.map((el: IStudent) => {
        // на случай если дата отсутсвует в исходном объекте
        if (!el.date) el.date = '1970-01-02'
        
        // на случай если в объекте "студент" нет массива предметов
        if (!el.subjects) el.subjects = []

        // на случай если в массиве предметов нет какого либо предмета из числа по умолчанию
        useArrayContains(el.subjects, ['Русский язык', 'Математика', 'Информатика'])

        const scoreArray: number[] = el.subjects?.map((sub: ISubject) => {
          // преобразуем оценки в числа
          sub.score = Number(sub.score)
          // добавим в массив предметов идентификатор предмета
          const fistChar: string = sub.subject.charAt(0).toLowerCase()
          let subIndex = -1
          if(fistChar === 'р') subIndex = 0
          if(fistChar === 'м') subIndex = 1
          if(fistChar === 'и') subIndex = 2
          sub.subIndex = subIndex
          return sub.score
        })

        // отсортируем массив предметов чтобы он всегда был в одном порядке
        el.subjects?.sort((a, b) => a.subIndex - b.subIndex)
        
        // добавим в объект "студент" суммарный балл
        el.total = scoreArray ? useTotalScore(...scoreArray) : 0
        
        // добавим в объект "студент" процент суммарного балла
        el.percent = Math.round(el.total * 100 / state.maxTotalScore)
      })
      
      // отсортируем данные с сервера по ФИО
      payload.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
      
      // мутируем state
      state.studentsList = payload
    },
    
    toastsArray(state, payload) {
      state.toastsArray.push(payload)
      setTimeout(() => state.toastsArray.shift(), payload.timeOut)
    }
  },
  
  actions: {
    async getDataFromAPI({commit}): Promise<void> {
      try {
        const res: Response = await fetch('https://spatasksbuilder-default-rtdb.europe-west1.firebasedatabase.app/studentsList.json')
        const data = await res.json()
        // если грузить не с сервера
        // const data = await mockData
        commit('studentsList', data)
      }
      catch (e) {
        console.error(e)
      }
    }
  },
  
  modules: {}
})
