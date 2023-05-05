export interface ISubject {
  subIndex: number,
  subject: string,
  score: number
}

export interface IStudent {
  id: number,
  name: string,
  date: string,
  subjects: ISubject[]
}

export interface ISelectData {
  id: number | string,
  value: string
}