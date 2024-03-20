import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnChanges {
  @Input() x: string[] = [];
  @Input() y: number[] = [];
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
  chart: any;
  chartCtx: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.chartCtx = document.getElementById('chart') as HTMLCanvasElement;
  }

  ngOnChanges(): void {
    this.renderLineChart();
  }

  private renderLineChart() {
    if (this.chart) this.chart.destroy();

    const chartData = {
      labels: this.x,
      datasets: [
        {
          label: this.title,
          data: this.y,
          fill: false,
          borderColor: ['rgb(54, 162, 235)'],
          pointStyle: false as unknown as string,
          tension: 0.1,
        },
        {
          label: 'Media',
          data: new Array(this.y.length).fill(
            this.y.reduce((a, b) => a + b) / this.y.length,
          ),
          fill: false,
          borderDash: [5, 5],
          pointRadius: 0,
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    };

    this.chart = new Chart(this.chartCtx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {},
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: this.title,
            font: {
              size: 20,
            },
          },
        },
        layout: {
          padding: {
            left: 40,
            right: 40,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
