
export type Cedears = Cedear[]

export interface Cedear {
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
  securityType: string
  closingPrice: number
  settlementPrice: number
  quantityBid: number
}