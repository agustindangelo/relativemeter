import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MarketService } from '../market.service';
import { SeriesResponse } from '../../shared/models/SeriesResponse.model';
import { Chart, registerables } from 'chart.js';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})

export class ChartComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = []

  constructor(private marketService: MarketService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.marketService.getCurrentTime().subscribe(time => {
      const ticker1Request$ = this.marketService.getSeries('SUPV', time)
      const ticker2Request$ = this.marketService.getSeries('GGAL', time)
      
      this.subscriptions.push(
        forkJoin([ticker1Request$, ticker2Request$]).subscribe(
          ([t1Res, t2Res]) => {
            if (t1Res.s === 'ok' && t2Res.s === 'ok') {
              console.log('t1', t1Res.c)
              console.log('t2', t2Res.c)
              const ratio = t1Res.c.map((val, i) => val / t2Res.c[i])
              console.log('ratio', ratio)
              this.renderLineChart(t1Res.t, ratio)
            }
          }
        )
      )
    })
  }

  private renderLineChart(x: number[], y: number[]) {
    const chartData = {
      labels: x,
      datasets: [
        {
          label: 'SUPV / GGAL',
          data: y,
          fill: false,
          borderColor: [
            'rgb(54, 162, 235)',
          ],
          tension: 0.1
        },
        {
          label: 'Media',
          data: new Array(y.length).fill(y.reduce((a, b) => a + b) / y.length),
          fill: false,
          borderColor: 'rgb(255, 99, 132)'
        }
      ]
    }

    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
        },
        interaction: {
          intersect: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}