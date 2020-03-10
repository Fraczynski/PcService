import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() elementNameOptions;
  @Input() resultOptions;
  @Input() warrantyRepairOptions = ['Yes', 'No'];
  filterForm: FormGroup;
  @Output() form = new EventEmitter<FormGroup>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      repairId: '',
      elementName: 'null',
      result: 'null',
      warrantyRepair: 'null',
      minWarrantyExpiryDate: '',
      maxWarrantyExpiryDate: '',
      orderBy: 'repairId'
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
