import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { ElementsService } from 'src/app/_services/elements/elements.service';
import { Pagination } from 'src/app/_models/pagination';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  elementNumberForm: FormGroup;

  constructor(private alertify: AlertifyService, private elementsService: ElementsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getElements();
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.elementNumberForm = this.formBuilder.group({ elementId: [''] });
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

  reloadElements(form: FormGroup) {
    this.pageNumber = 1;
    const userParams = Object.assign({}, form.value);
    this.getElements(userParams);
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.pageNumber = event.page;
    this.getElements();
  }

  searchElement() {
    if (this.elementNumberForm.controls.elementId.value > 0) {
      this.elementsService.searchElement(this.elementNumberForm.value.elementId).subscribe((element: Element) => {
        if (element !== null) {
          this.elements = [];
          this.elements.push(element);
        }
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
