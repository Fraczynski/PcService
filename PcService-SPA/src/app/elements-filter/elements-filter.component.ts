import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ElementsService } from '../_services/elements/elements.service';
import { AlertifyService } from '../_services/alertify/alertify.service';

@Component({
  selector: 'app-elements-filter',
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
  templateUrl: './elements-filter.component.html',
  styleUrls: ['./elements-filter.component.css']
})
export class ElementsFilterComponent implements OnInit {
  @Input() elementNameOptions;
  @Input() warrantyRepairOptions = ['Yes', 'No'];
  filterForm: FormGroup;
  @Output() form = new EventEmitter<FormGroup>();
  statusOptions: string[];

  constructor(private formBuilder: FormBuilder, private elementsService: ElementsService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      equipmentId: [''],
      servicemanName: [''],
      description: [''],
      name: [''],
      status: [''],
      warrantyRepair: [null],
      minNewWarrantyPeriod: [''],
      maxNewWarrantyPeriod: [''],
      orderBy: 'id'
    });
    // this.getStatusList();
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
    // this.elementsService.getStatusList(this.currentUserId).subscribe((response: string[]) => {
    //   this.statusOptions = response;
    // }, error => {
    //   this.alertify.error(error);
    // });
  }
}
