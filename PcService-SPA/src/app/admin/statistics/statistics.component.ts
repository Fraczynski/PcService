import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statistics = [];
  chartOptions = {
    responsive: true
  };
  chartData;
  chartLabels;
  namesArray: string[] = [];
  valuesArray: number[] = [];
  chartReady = false;

  constructor(private adminService: AdminService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadStatistics('elementName');
  }

  loadStatistics(type: string) {
    this.adminService.loadStatistics(type).subscribe((statistics: [string, number][]) => {
      this.statistics = statistics;
      this.drawChart();
    }, error => {
      this.alertify.error(error);
    });
  }

  drawChart() {
    this.statistics.forEach((element) => {
      this.namesArray.push(element.item1);
      this.valuesArray.push(element.item2);
    });
    this.valuesArray.push(0);
    this.chartData = [{ data: this.valuesArray }];
    this.chartLabels = this.namesArray;
    this.chartReady = true;
  }
}
