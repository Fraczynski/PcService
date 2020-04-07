import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/_services/statistics/statistics.service';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';

@Component({
  selector: 'app-serviceman-statistics',
  templateUrl: './serviceman-statistics.component.html',
  styleUrls: ['./serviceman-statistics.component.css']
})
export class ServicemanStatisticsComponent implements OnInit {
  statistics = [];
  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    }
  };
  chartData;
  chartLabels;
  namesArray: string[] = [];
  valuesArray: number[] = [];
  chartReady = false;
  chartType = 'bar';
  colors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  legend = false;

  constructor(private statisticsService: StatisticsService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadStatistics();
  }

  change() {

  }

  loadStatistics(type = 'name') {
    this.statisticsService.loadServicemanStatistics(type).subscribe((statistics: [string, number][]) => {
      this.statistics = statistics;
      this.drawChart();
    }, error => {
      this.alertify.error(error);
    });
  }

  drawChart() {
    this.namesArray = [];
    this.valuesArray = [];
    this.statistics.forEach((element) => {
      this.namesArray.push(element.item1);
      this.valuesArray.push(element.item2);
    });
    this.chartData = [{ data: this.valuesArray }];
    this.chartLabels = this.namesArray;
    this.chartReady = true;
  }

  setChartType(type: string) {
    this.chartType = type;
    setTimeout(() => {
      this.legend = (this.chartType === 'pie' || this.chartType === 'doughnut' || this.chartType === 'polarArea') ? true : false;
    });
  }

}
