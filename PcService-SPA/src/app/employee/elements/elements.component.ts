import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { ElementsService } from 'src/app/_services/elements/elements.service';
import { Pagination } from 'src/app/_models/pagination';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EditElementModalComponent } from '../edit-element-modal/edit-element-modal.component';

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
  elementsType: string;
  bsModalRef: BsModalRef;

  constructor(private alertify: AlertifyService, private elementsService: ElementsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadElements(this.elementsType);
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.pageNumber = event.page;
    this.loadElements(this.elementsType);
  }

  loadElements(type: string, userParams?) {
    this.elementsType = type;
    switch (this.elementsType) {
      case 'unassigned':
        this.elementsService.getUnassignedElements(this.pageNumber, this.pageSize, userParams).subscribe((response) => {
          this.elements = response.result;
          this.pagination = response.pagination;
          this.pageNumber = this.pagination.currentPage;
          this.pageSize = this.pagination.itemsPerPage;
        }, error => {
          this.alertify.error(error);
        });
        break;
      default:
        this.elementsService.getServicemanElements(this.pageNumber, this.pageSize, userParams).subscribe((response) => {
          this.elements = response.result;
          this.pagination = response.pagination;
          this.pageNumber = this.pagination.currentPage;
          this.pageSize = this.pagination.itemsPerPage;
        }, error => {
          this.alertify.error(error);
        });
        break;
    }
  }

  showModal(element) {
    if (element.servicemanName == null) {
      this.bsModalRef = this.modalService.show(ConfirmModalComponent);
      this.bsModalRef.content.returnMessage.subscribe((message: string) => {
        if (message === 'confirm') {
          this.elementsService.assignElement(element.id).subscribe(() => {
            this.loadElements(this.elementsType);
            this.alertify.success('Success');
          }, error => {
            this.alertify.error(error);
          });
        }
      }, error => {
        this.alertify.error(error);
      });
    } else {
      const initialState = {
        editedElement: element
      };
      this.bsModalRef = this.modalService.show(EditElementModalComponent, { initialState });
      this.bsModalRef.content.refreshElements.subscribe(() => {
        this.loadElements(this.elementsType);
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
