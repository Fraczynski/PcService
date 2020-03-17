import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

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
  @Input() elementNameOptions;
  @Input() statusOptions;
  @Input() warrantyRepairOptions = ['Yes', 'No'];
  filterForm: FormGroup;
  @Output() form = new EventEmitter<FormGroup>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      name: [''],
      status: [],
      problemDescription: [''],
      minRequestDate: [''],
      maxRequestDate: [''],
      minReleaseDate: [''],
      maxReleaseDate: [''],
      orderBy: 'id'
    });
  }

  filter() {
    this.form.emit(this.filterForm);
  }

  resetForm() {
    this.filterForm.reset();
    this.filter();
  }
}
