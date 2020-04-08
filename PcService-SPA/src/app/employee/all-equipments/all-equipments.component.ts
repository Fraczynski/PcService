import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/_models/equipment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pagination } from 'src/app/_models/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EquipmentsService } from 'src/app/_services/equipments/equipments.service';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { EquipmentModalComponent } from '../equipment-modal/equipment-modal.component';

@Component({
  selector: 'app-all-equipments',
  templateUrl: './all-equipments.component.html',
  styleUrls: ['./all-equipments.component.css']
})
export class AllEquipmentsComponent implements OnInit {
  employee = false;
  equipments: Equipment[] = [];
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination = new Pagination();
  bsModalRef: BsModalRef;

  constructor(private equipmentsService: EquipmentsService, private alertify: AlertifyService, private formBuilder: FormBuilder,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getEquipments(new Object());
  }

  reloadEquipments(form: FormGroup) {
    this.pageNumber = 1;
    const userParams = Object.assign({}, form.value);
    this.getEquipments(userParams);
  }

  getEquipments(userParams?) {
    this.equipmentsService.getEquipments(null, this.pageNumber, this.pageSize, userParams).subscribe((response) => {
      this.equipments = response.result;
      this.pagination = response.pagination;
      this.pageNumber = this.pagination.currentPage;
      this.pageSize = this.pagination.itemsPerPage;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.pageNumber = event.page;
    this.getEquipments();
  }
}
