export type Account = {
  id: number
  name: string
}

type Category = {
  id: number
  name: string
}

type Activity = {
  id: number
  name: string
}

export type Transaction = {
  id: number
  category: Category
  activity?: Activity
  accountFrom: Account
  accountTo: Account
  date: string
  amount: number
  paid: boolean
  description: string
}

export type RegisterTransaction = {
  categoryId: number
  description: string
  amount: number
  paid: boolean
  date: string
  accountIdFrom: number
  accountIdTo: number
}
