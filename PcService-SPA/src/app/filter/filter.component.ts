import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  elementNameOptions = [null, 'Ram', 'Speaker', 'Disk'];
  resultOptions = [null, 'New', 'Repair'];
  warrantyRepairOptions = [null, 'Yes', 'No'];
  @Output() form = new EventEmitter<FormGroup>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      repairId: '',
      elementName: '',
      result: '',
      warrantyRepair: '',
      minWarrantyExpiryDate: '',
      maxWarrantyExpiryDate: ''
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
