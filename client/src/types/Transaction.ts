export type Account = {
  id: number
  name: string
}

export type RegisterAccount = {
  name: string
}

export type Category = {
  id: number
  name: string
}

export type Transaction = {
  id: number
  category: Category
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

export type TransactionsFilter = {
  year?: number
  month?: number
  categoryId?: number
}
