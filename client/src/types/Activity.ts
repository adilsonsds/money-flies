export type Activity = {
  id: number
  title: string
  totalAmount: number
  date: string
}

export type ActivityCreated = {
  title: string
  date: string
}

export type Transaction = {
  id: number
  category: {
    id: number
    name: string
  }
  payer: {
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

export type TransactionCreated = {
  categoryId: number
  date: string
  amount: number
  paid: boolean
  description: string
  payerId: number
}

export type TransactionEdited = TransactionCreated & {
  id: number
}
