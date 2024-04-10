import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createCashFlowChart();
    this.createLocationWiseChart();
  }

  createCashFlowChart() {
    const ctx = document.getElementById('cashFlowChart') as HTMLCanvasElement;
    const cashFlowChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['On Date', 'MTD', 'YTD'],
        datasets: [{
          label: 'Receipts',
          data: [250000, 1475000, 6736000],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }, {
          label: 'Payments',
          data: [178000, 1578000, 4005000],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'end',
            offset: 4,
            formatter: (value, context) => {
              return value;
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: false
          }
        }
      }
    });
  }

  createLocationWiseChart() {
    const ctx = document.getElementById('locationWiseChart') as HTMLCanvasElement;
    const locationWiseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Vijayawada', 'Guntur', 'Hyderabad', 'Tirupathi'],
        datasets: [{
          label: 'Cash Flow',
          data: [
            [250000, -32000], // Receipts, Payments for Vijayawada
            [680000, -15000], // Receipts, Payments for Guntur
            [155000, -9640],  // Receipts, Payments for Hyderabad
            [230050, -125000] // Receipts, Payments for Tirupathi
          ],
          backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'end',
            offset: 4,
            formatter: (value, context) => {
              const receipts = value[0];
              const payments = value[1];
              return receipts - payments; // Calculate and display net cash flow
            }
          }
        },
        scales: {
          x: {
            stacked: true // Enable stacked bars
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  
}
