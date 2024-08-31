export type SummaryFilter = {
  categoryId?: string
  period?: SummaryPeriod
}

export type SummaryPeriod = {
  start: Date
  end: Date
}
