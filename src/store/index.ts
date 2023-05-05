import Vue from 'vue'
import Vuex from 'vuex'
import {IStudent, ISubject} from '@/model/types'
// если грузить не с сервера
// import mockData from '@/use/mockData.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentsList: []
  },
  
  getters: {
    studentsList(state): IStudent[] {
      return state.studentsList.sort()
    }
  },
  
  mutations: {
    studentsList(state, payload) {
      payload.map((el: IStudent) => {
        // преобразуем дату в привычный нам формат
        el.date = el.date ? new Date(el.date).toLocaleDateString() : 'дата не указана'
        el.subjects?.map((sub: ISubject) => {
          // преобразуем оценки в числа
          sub.score = Number(sub.score)
          // добавим в исходный объект идентификатор предмета
          const fistChar: string = sub.subject.charAt(0).toLowerCase()
          let subIndex = -1
          if(fistChar === 'р') subIndex = 0
          if(fistChar === 'м') subIndex = 1
          if(fistChar === 'и') subIndex = 2
          sub.subIndex = subIndex
        })
        // отсортируем массив предметов чтобы он всегда был в одном порядке
        el.subjects?.sort((a, b) => a.subIndex - b.subIndex)
      })
      // отсортируем данные с сервера по ФИО
      payload.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
      state.studentsList = payload
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
