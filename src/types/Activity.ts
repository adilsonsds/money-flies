export type Activity = {
  id: string
  title: string
  transactions: Transaction[]
}

export type Transaction = {
  id: string
  category: {
    id: string
    name: string
  }
  date: string
  amount: number
  paid: boolean
  description: string
}

export type TransactionItemResult = {
  id: string
  category: {
    id: string
    name: string
  }
  date: string
  amount: number
  paid: boolean
  description: string
  activity: {
    id: string
    title: string
  }
}
