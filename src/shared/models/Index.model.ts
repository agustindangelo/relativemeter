export interface IndexResponse {
  content: {
    page_number: number
    page_count: number
    page_size: number
    total_elements_count: number
  }
  data: Index[]
  empty: boolean
  upgrade: boolean
}

export interface Index {
  symbol: string
  sourceCode: string
  country: string
  isRate: boolean
  minValue: number
  highValue: number
  price: number
  description: string
  closingPrice: number
  variation: number
}