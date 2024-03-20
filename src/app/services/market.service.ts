import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeriesResponse } from '../../shared/models/SeriesResponse.model';
import { EquityAssetsResponse } from '../../shared/models/Equity.model';
import { PublicBondsResponse } from '../../shared/models/PublicBonds.model';
import { Cedears } from '../../shared/models/Cedears.model';
import { IndexResponse } from '../../shared/models/Index.model';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private baseUrl =
    'https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free';
  public currentTime?: number;

  private httpBodyEquity = {
    excludeZeroPxAndQty: true,
    T2: true,
    T1: false,
    T0: false,
    'Content-Type': 'application/json',
  };

  constructor(private client: HttpClient) {
    this.getCurrentTime().subscribe((res) => (this.currentTime = res));
  }

  getCurrentTime(): Observable<number> {
    return this.client.get<number>(
      `${this.baseUrl}/chart/historical-series/time`,
    );
  }

  getSeries(
    symbol: string,
    fromDate: string,
    tillDate: string,
  ): Observable<SeriesResponse> {
    let from = Math.floor(new Date(fromDate).getTime() / 1000);
    let to = Math.floor(new Date(tillDate).getTime() / 1000);
    const options = new HttpParams()
      .set('symbol', `${symbol} 48HS`)
      .set('resolution', 'D')
      .set('from', from)
      .set('to', to);
    return this.client.get<SeriesResponse>(
      `${this.baseUrl}/chart/historical-series/history`,
      { params: options },
    );
  }

  getBonds(): Observable<PublicBondsResponse> {
    const body = {
      T2: true,
      T1: false,
      T0: false,
      'Content-Type': 'application/json',
    };
    return this.client.post<PublicBondsResponse>(
      `${this.baseUrl}/public-bonds`,
      body,
    );
  }

  getCedears(): Observable<Cedears> {
    return this.client.post<Cedears>(
      `${this.baseUrl}/cedears`,
      this.httpBodyEquity,
    );
  }

  getLeadingEquity(): Observable<EquityAssetsResponse> {
    return this.client.post<EquityAssetsResponse>(
      `${this.baseUrl}/leading-equity`,
      this.httpBodyEquity,
    );
  }

  getIndices(): Observable<IndexResponse> {
    const body = {
      'Content-Type': 'application/json',
    };
    return this.client.post<IndexResponse>(`${this.baseUrl}/index-price`, body);
  }
}
