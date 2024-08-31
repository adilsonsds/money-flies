export type Activity = {
  id: string
  title: string
  transactions: Transaction[]
}

export type Transaction = {
  id: string
  category: string
  date: string
  amount: number
  paid: boolean
  description: string
}
