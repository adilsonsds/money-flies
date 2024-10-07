export type Activity = {
  id: number
  title: string
  transactions: Transaction[]
}

export type Transaction = {
  id: number
  category: {
    id: number
    name: string
  }
  date: string
  amount: number
  paid: boolean
  description: string
}

export type TransactionItemResult = {
  id: number
  category: {
    id: string
    name: string
  }
  date: string
  amount: number
  paid: boolean
  description: string
  activity: {
    id: number
    title: string
  }
}
