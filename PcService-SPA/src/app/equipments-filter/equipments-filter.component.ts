import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EquipmentsService } from '../_services/equipments/equipments.service';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { StatusesService } from '../_services/statuses/statuses.service';

@Component({
  selector: 'app-equipments-filter',
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]
    )
  ],
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
