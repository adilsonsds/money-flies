export type SummaryFilter = {
  categoryId?: string
  period?: SummaryPeriod
}

export type SummaryPeriod = {
  start: Date
  end: Date
}

export type SummaryGroup = {
  id: string
  name: string
  items: SummaryGroupItem[]
}

export type SummaryGroupItem = {
  categoryId: string
  name: string
  operation: 'sum' | 'subtract'
}
