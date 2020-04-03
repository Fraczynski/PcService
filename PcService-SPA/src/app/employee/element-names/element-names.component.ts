import { Component, OnInit } from '@angular/core';
import { ElementNamesService } from 'src/app/_services/elementNames/elementNames.service';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { ElementName } from 'src/app/_models/elementName';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-element-names',
  templateUrl: './element-names.component.html',
  styleUrls: ['./element-names.component.css']
})
export class ElementNamesComponent implements OnInit {
  elementNames: ElementName[];
  elementNameForm: FormGroup;

  constructor(private elementNamesService: ElementNamesService, private alertify: AlertifyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getElementNameList();
    this.elementNameForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  getElementNameList() {
    this.elementNamesService.getElementNamesList().subscribe((response: ElementName[]) => {
      this.elementNames = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  addName() {
    this.elementNamesService.addElementName(this.elementNameForm.value).subscribe(() => {
      this.getElementNameList();
    }, error => {
      this.alertify.error(error);
    });
  }
}
