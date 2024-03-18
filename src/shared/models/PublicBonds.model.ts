export interface PublicBondsResponse {
  content: {
    page_number: number
    page_count: number
    page_size: number
    total_elements_count: number
  }
  data: PublicBond[]
  empty: boolean
  upgrade: boolean
}

export interface PublicBond {
  tradeVolume: number
  symbol: string
  imbalance: number
  previousSettlementPrice: number
  offerPrice: number
  vwap: number
  numberOfOrders: number
  openingPrice: number
  securityDesc: string
  securitySubType: string
  maturityDate: string
  previousClosingPrice: number
  settlementType: string
  quantityOffer: number
  tradingHighPrice: number
  denominationCcy: string
  bidPrice: number
  tradingLowPrice: number
  market: string
  volumeAmount: number
  volume: number
  trade: number
  daysToMaturity: number
  securityType: string
  closingPrice: number
  settlementPrice: number
  quantityBid: number
}