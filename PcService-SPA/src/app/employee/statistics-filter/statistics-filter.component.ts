import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusesService } from 'src/app/_services/statuses/statuses.service';
import { EquipmentsService } from 'src/app/_services/equipments/equipments.service';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { ElementNamesService } from 'src/app/_services/elementNames/elementNames.service';

@Component({
  selector: 'app-statistics-filter',
  templateUrl: './statistics-filter.component.html',
  styleUrls: ['./statistics-filter.component.css']
})
export class StatisticsFilterComponent implements OnInit {
  filterForm: FormGroup;
  @Output() form = new EventEmitter<FormGroup>();
  statusOptions;
  elementNames;

  constructor(private formBuilder: FormBuilder, private equipmentsService: EquipmentsService, private alertify: AlertifyService,
    private statusesService: StatusesService, private elementNamesService: ElementNamesService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      servicemanName: [''],
      elementName: [],
      elementStatus: [],
      minEquipmentRequestDate: [''],
      maxEquipmentRequestDate: [''],
      minEquipmentReleaseDate: [''],
      maxEquipmentReleaseDate: ['']
    });
    this.getStatusList();
  }

  filter() {
    this.form.emit(this.filterForm.value);
    this.getStatusList();
    this.getElementNames();
  }

  resetForm() {
    this.filterForm.reset();
    this.filter();
  }

  getStatusList() {
    this.statusesService.getElementStatuses().subscribe((response) => {
      this.statusOptions = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  getElementNames() {
    this.elementNamesService.getElementNamesList().subscribe(response => {
      this.elementNames = response;
    }, error => {
      this.alertify.error(error);
    });
  }
}
