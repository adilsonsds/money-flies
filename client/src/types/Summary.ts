export type SummaryFilter = {
  year?: number
  month?: number
  categoryId?: number
  accountId?: number
}

export type Summary = {
  year: number
  month: number
  totalAmount: number
  category: {
    id: number
    name: string
  }
  accountFrom: {
    id: number
    name: string
  }
  accountTo: {
    id: number
    name: string
  }
}

export type SummaryPeriod = {
  year: number
  month: number
}
