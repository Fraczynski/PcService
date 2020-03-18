import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { EquipmentsService } from '../_services/equipments/equipments.service';
import { AlertifyService } from '../_services/alertify/alertify.service';

@Component({
  selector: 'app-filter',
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
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() currentUserId;
  @Input() employee;
  @Input() elementNameOptions;
  @Input() warrantyRepairOptions = ['Yes', 'No'];
  filterForm: FormGroup;
  @Output() form = new EventEmitter<FormGroup>();
  statusOptions: string[];

  constructor(private formBuilder: FormBuilder, private equipmentsService: EquipmentsService, private alertify: AlertifyService) { }

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
    this.equipmentsService.getStatusList(this.currentUserId).subscribe((response: string[]) => {
      this.statusOptions = response;
    }, error => {
      this.alertify.error(error);
    });
  }
}
