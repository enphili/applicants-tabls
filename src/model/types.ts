export interface ISubject {
  subIndex: number,
  subject: string,
  score: number
}

export interface IStudent {
  id: number,
  name: string,
  date: string,
  subjects: ISubject[],
  total: number,
  percent: number
}

export enum ETableHeaders {
  name = 'ФИО',
  date = 'Дата подачи заявления',
  rusScore = 'Балл по русскому',
  mathScore = 'Балл по математике',
  informScore = 'Балл по информатике',
  total = 'Суммарный балл',
  percent = 'Процент'
}

export type TSelectData = {
  id: string,
  text: string
}