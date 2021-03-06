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
  name: string;
  type = 'name';
  form;

  constructor(private statisticsService: StatisticsService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadStatistics(this.type);
  }

  randomizeColors() {
    const colors = [];
    const min = 0;
    const max = 255;
    this.statistics.forEach(() => {
      let sum = 500;
      let red;
      let green;
      let blue;
      while (sum >= 500) {
        red = Math.floor(Math.random() * (max - min + 1)) + min;
        green = Math.floor(Math.random() * (max - min + 1)) + min;
        blue = Math.floor(Math.random() * (max - min + 1)) + min;
        sum = red + green + blue;
      }
      colors.push('rgba(' + red + ', ' + green + ', ' + blue + ', 0.6)');
    });
    this.colors = [{ backgroundColor: colors }];
  }

  loadStatistics(type, form?) {
    if (form) {
      this.form = form;
      debugger;
    }
    this.type = type;
    this.statisticsService.loadServicemanStatistics(type, this.form).subscribe((statistics: [string, number][]) => {
      this.statistics = statistics;
      this.correctNames();
      this.drawChart();
      this.name = document.getElementById(type).innerHTML;
      this.randomizeColors();
    }, error => {
      this.alertify.error(error);
    });
  }

  correctNames() {
    this.statistics.forEach(element => {
      if (element.item1 === 'True') {
        element.item1 = 'Tak';
      } else if (element.item1 === 'False') {
        element.item1 = 'Nie';
      }
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
