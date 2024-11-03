export type SummaryFilter = {
  year?: number
  month?: number
  categoryId?: number
  payerId?: number
}

export type Summary = {
  year: number
  month: number
  totalAmount: number
  category: {
    id: number
    name: string
  }
}
