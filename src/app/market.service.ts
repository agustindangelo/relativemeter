import { Injectable } from '@angular/core';
// import { environment } from './environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeriesResponse } from '../shared/models/SeriesResponse.model';
import { EquityAssetsResponse } from '../shared/models/Equity.model';
import { PublicBondsResponse } from '../shared/models/PublicBonds.model';
import { Cedears } from '../shared/models/Cedears.model';
import { IndexResponse } from '../shared/models/Index.model';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private baseUrl = 'https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free'
  public currentTime?: number;

  constructor(private client: HttpClient) {
    this.getCurrentTime().subscribe(res => this.currentTime = res);
  }

  getCurrentTime(): Observable<number> {
    return this.client.get<number>(`${this.baseUrl}/chart/historical-series/time`)
  }

  getSeries(ticker: string, to: number): Observable<SeriesResponse> {
    const options = new HttpParams()
      .set('symbol', `${ticker} 48HS`)
      .set('resolution', 'D')
      .set('from', 1709851871)
      .set('to', this.currentTime!)
    return this.client.get<SeriesResponse>(`${this.baseUrl}/chart/historical-series/history`, { params: options })
  }
  
  getBonds(): Observable<PublicBondsResponse> {
    const body = {
      "T2": true,
      "T1": false,
      "T0": false,
      "Content-Type": "application/json"
    }
    return this.client.post<PublicBondsResponse>(`${this.baseUrl}/public-bonds`, body)
  }
  
  getCedears(): Observable<Cedears> {
    const body = {
      "excludeZeroPxAndQty": true,
      "T2": true,
      "T1": false,
      "T0": false,
      "Content-Type": "application/json"
    }
    return this.client.post<Cedears>(`${this.baseUrl}/cedears`, body)
  }
  
  getLeadingEquity(): Observable<EquityAssetsResponse> {
    const body = {
      "excludeZeroPxAndQty": true,
      "T2": true,
      "T1": false,
      "T0": false,
      "Content-Type": "application/json"
    }
    return this.client.post<EquityAssetsResponse>(`${this.baseUrl}/leading-equity`, body)
  }
  
  getIndices(): Observable<IndexResponse> {
    const body = {
      "Content-Type": "application/json"
    }
    return this.client.post<IndexResponse>(`${this.baseUrl}/index-price`, body)
  }
}