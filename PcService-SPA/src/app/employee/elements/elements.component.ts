import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { ElementsService } from 'src/app/_services/elements/elements.service';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  elements: Element[] = [];
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination = new Pagination();

  constructor(private alertify: AlertifyService, private elementsService: ElementsService) { }

  ngOnInit() {
    this.getElements();
  }

  getElements(userParams?) {
    this.elementsService.getElements(this.pageNumber, this.pageSize, userParams).subscribe((response) => {
      this.elements = response.result;
      this.pagination = response.pagination;
      this.pageNumber = this.pagination.currentPage;
      this.pageSize = this.pagination.itemsPerPage;
    }, error => {
      this.alertify.error(error);
    });
  }

}
