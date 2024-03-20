import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChartComponent } from './chart/chart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarketService } from './services/market.service';
import { Subscription, forkJoin } from 'rxjs';
import { SpinnerService } from './services/spinner.service';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    ChartComponent,
    HttpClientModule,
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'Relativemeter';
  private subscriptions: Subscription[] = [];
  x: string[] = [];
  y: number[] = [];
  chartTitle: string = '';
  showSpinner = false;

  constructor(
    private market: MarketService,
    private spinnerService: SpinnerService,
  ) {
    this.spinnerService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.showSpinner = data ? data : false;
      });
      console.log(this.showSpinner);
    });
  }

  onFormChanged(form: any): void {
    this.getSeriesData(
      form.value.firstAsset,
      form.value.secondAsset,
      form.value.fromDate,
      form.value.tillDate,
    );
  }

  getSeriesData(
    firstAsset: string,
    secondAsset: string,
    fromDate: string,
    tillDate: string,
  ): void {
    this.spinnerService.show();
    const ticker1Request$ = this.market.getSeries(
      firstAsset,
      fromDate,
      tillDate,
    );
    const ticker2Request$ = this.market.getSeries(
      secondAsset,
      fromDate,
      tillDate,
    );

    this.subscriptions.push(
      forkJoin([ticker1Request$, ticker2Request$]).subscribe(
        ([t1Res, t2Res]) => {
          if (t1Res.s === 'ok' && t2Res.s === 'ok') {
            const ratio = t1Res.c.map((val, i) => val / t2Res.c[i]);
            this.x = t1Res.t.map((el) =>
              new Date(el * 1000).toISOString().slice(0, 10),
            );
            this.y = ratio;
            this.chartTitle = `${firstAsset} / ${secondAsset}`;
            // this.isLoading = false;
            this.spinnerService.hide();
          }
        },
      ),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
