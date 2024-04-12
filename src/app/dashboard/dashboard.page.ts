import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private pieChartInstance: Chart<'pie', number[], string>;
  constructor() {
    this.pieChartInstance = null!;
  }
  
  ngOnInit() {
    this.initializeCharts();
  }

  initializeCharts() {
    this.createCashFlowChart();
    this.createLocationWiseChart();
    this.createReceiptsMonthWiseChart();
    this.createPaymentsMonthWiseChart();
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
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const clickedDatasetIndex = elements[0].datasetIndex;
          const clickedData = cashFlowChart.data.datasets[clickedDatasetIndex].data[elements[0].index];
          if (clickedDatasetIndex === 1) {
            this.updateDayPaymentsPieChart(clickedData);
          } else {
            this.updateDayReceiptsPieChart(clickedData);
          }
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
        label: 'Receipts',
        data: [250000, 680000, 155000, 230050],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }, {
        label: 'Payments',
        data: [32000, 15000, 9640, 125000],
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
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const clickedIndex = elements[0].index;
          const chartData = locationWiseChart.data.datasets[0].data[clickedIndex];
          this.updateDayReceiptsPieChart(chartData);
        }
      }
    }
  });
}

  
  

  updateDayReceiptsPieChart(data: number) {
    const labels: string[] = ['Customers', 'Bank', 'Sales', 'Others'];
    const heading: string = 'Day Receipts'; 
  
    const backgroundColors: string[] = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 205, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)'
    ];
    const borderColors: string[] = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(75, 192, 192, 1)'
    ];
  
    const backgroundColorsArray: string[] = [];
    const borderColorsArray: string[] = [];
  
    // Generate colors for each label
    for (let i = 0; i < labels.length; i++) {
      backgroundColorsArray.push(backgroundColors[i % backgroundColors.length]);
      borderColorsArray.push(borderColors[i % borderColors.length]);
    }
  
    if (this.pieChartInstance) {
      // If a pie chart instance already exists, update its data and labels
      this.pieChartInstance.data.labels = labels;
      this.pieChartInstance.data.datasets[0].data = [data];
      this.pieChartInstance.data.datasets[0].backgroundColor = backgroundColorsArray;
      this.pieChartInstance.data.datasets[0].borderColor = borderColorsArray;
      this.pieChartInstance.update();
    } else {
      // If no pie chart instance exists, create a new one
      const ctx = document.getElementById('dayReceipts') as HTMLCanvasElement;
      this.pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: heading,
            data: [data],
            backgroundColor: backgroundColorsArray,
            borderColor: borderColorsArray,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            datalabels: {
              color: 'black',
              formatter: (value, context) => {
                // Display the value on the pie chart
                return value;
              }
            }
          }
        }
      });
    }
  }
  
  updateDayPaymentsPieChart(data: number) {
    const labels: string[] = [
      'Salaries', 'OT\'s', 'Advances', 'Others', 'Mech. Maintenance', 'Ele. Maintenance', 'Civil Works', 'Office Expense'
    ];
    const heading: string = 'Day Payments';
  
    const backgroundColors: string[] = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 205, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)'
    ];
    const borderColors: string[] = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)'
    ];
  
    const backgroundColorsArray: string[] = [];
    const borderColorsArray: string[] = [];
  
    // Generate colors for each label
    for (let i = 0; i < labels.length; i++) {
      backgroundColorsArray.push(backgroundColors[i % backgroundColors.length]);
      borderColorsArray.push(borderColors[i % borderColors.length]);
    }
  
    if (this.pieChartInstance) {
      // If a pie chart instance already exists, update its data and labels
      this.pieChartInstance.data.labels = labels;
      this.pieChartInstance.data.datasets[0].data = [data];
      this.pieChartInstance.data.datasets[0].backgroundColor = backgroundColorsArray;
      this.pieChartInstance.data.datasets[0].borderColor = borderColorsArray;
      if (this.pieChartInstance.options.plugins && this.pieChartInstance.options.plugins.datalabels) {
        this.pieChartInstance.options.plugins.datalabels.formatter = (value, context) => value;
      }
      this.pieChartInstance.update();
    } else {
      // If no pie chart instance exists, create a new one
      const ctx = document.getElementById('dayPayments') as HTMLCanvasElement;
      this.pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: heading,
            data: [data],
            backgroundColor: backgroundColorsArray,
            borderColor: borderColorsArray,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            datalabels: {
              color: 'black',
              formatter: (value, context) => value
            }
          }
        }
      });
    }
  }
  

  
  createReceiptsMonthWiseChart() {
    const ctx = document.getElementById('receiptsMonthWiseChart') as HTMLCanvasElement;
    const receiptsMonthWiseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Receipts',
          data: [250000, 680000, 155000, 230050, 0, 0, 0, 0, 0, 0, 0, 0], // Fill in data for each month
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
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
  
  createPaymentsMonthWiseChart() {
    const ctx = document.getElementById('paymentsMonthWiseChart') as HTMLCanvasElement;
    const paymentsMonthWiseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Payments',
          data: [32000, 15000, 9640, 125000, 0, 0, 0, 0, 0, 0, 0, 0], // Fill in data for each month
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
  
  
  
  
  
}  
  

