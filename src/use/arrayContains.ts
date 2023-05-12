import {ISubject} from '@/model/types'

export const useArrayContains = (objWhere: ISubject[], arrWhat: string[]) => {
  for (let i = 0; i < arrWhat.length; i++) {
    if (objWhere.map(el => el.subject).indexOf(arrWhat[i]) === -1) {
      objWhere.push({subject: arrWhat[i], score: 0, subIndex: i})
    }
  }
  return true
}