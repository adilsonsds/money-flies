export type SummaryFilter = {
  year?: number
  month?: number
  categoryId?: number
  payerId?: number
}

export type SummaryPeriod = {
  start: Date
  end: Date
}

export type PayerSummary = {
  id: number
  name: string
  total: number
  summaries: Summary[]
}

export type Summary = {
  year: number
  month: number
  total: number
  category: {
    id: number
    name: string
  }
}

export type SummaryResultItem = {
  id: string
  date: string
  amount: number
  description: string
  paid: boolean
  category: {
    id: number
    name: string
  }
  activity: {
    id: string
    title: string
  }
  payer: {
    id: number
    name: string
  }
}
