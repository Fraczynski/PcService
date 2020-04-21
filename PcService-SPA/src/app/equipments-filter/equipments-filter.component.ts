import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EquipmentsService } from '../_services/equipments/equipments.service';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { StatusesService } from '../_services/statuses/statuses.service';
import { ResetInputAnimation } from '../_animations/resetInputAnimation';

@Component({
  selector: 'app-equipments-filter',
  animations: [ResetInputAnimation.animeTrigger],
  templateUrl: './equipments-filter.component.html',
  styleUrls: ['./equipments-filter.component.css']
})
export class EquipmentsFilterComponent implements OnInit {
  @Input() currentUserId;
  @Input() employee;
  filterForm: FormGroup;
  @Output() form = new EventEmitter<FormGroup>();
  statusOptions;

  constructor(private formBuilder: FormBuilder, private equipmentsService: EquipmentsService, private alertify: AlertifyService,
    private statusesService: StatusesService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      clientName: [''],
      name: [''],
      status: [],
      problemDescription: [''],
      minRequestDate: [''],
      maxRequestDate: [''],
      minReleaseDate: [''],
      maxReleaseDate: [''],
      orderBy: 'id'
    });
    this.getStatusList();
  }

  filter() {
    this.form.emit(this.filterForm);
    this.getStatusList();
  }

  resetForm() {
    this.filterForm.reset();
    this.filter();
  }

  getStatusList() {
    if (!this.employee && this.currentUserId !== null && this.currentUserId) {
      this.statusesService.getClientStatuses(this.currentUserId).subscribe((response) => {
        this.statusOptions = response;
      }, error => {
        this.alertify.error(error);
      });
    } else {
      this.statusesService.getEquipmentStatuses().subscribe((response) => {
        this.statusOptions = response;
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
