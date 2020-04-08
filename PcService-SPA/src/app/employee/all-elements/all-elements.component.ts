import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { ElementsService } from 'src/app/_services/elements/elements.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { EditElementModalComponent } from '../edit-element-modal/edit-element-modal.component';

@Component({
  selector: 'app-all-elements',
  templateUrl: './all-elements.component.html',
  styleUrls: ['./all-elements.component.css']
})
export class AllElementsComponent implements OnInit {
  elements: Element[] = [];
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination = new Pagination();
  elementNumberForm: FormGroup;
  bsModalRef: BsModalRef;

  constructor(private alertify: AlertifyService, private elementsService: ElementsService, private formBuilder: FormBuilder,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getElements();
    this.createNumberForm();
  }

  createNumberForm() {
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

  showModal(element) {
    const initialState = {
      editedElement: element
    };
    this.bsModalRef = this.modalService.show(EditElementModalComponent, { initialState });
    this.bsModalRef.content.refreshElements.subscribe(() => {
      this.getElements();
    }, error => {
      this.alertify.error(error);
    });
  }
}
