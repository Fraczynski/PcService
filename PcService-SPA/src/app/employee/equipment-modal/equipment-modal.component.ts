import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user/user.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-equipment-modal',
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
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.css']
})
export class EquipmentModalComponent implements OnInit {
  @Output() addNewEquipment = new EventEmitter();
  equipmentForm: FormGroup;
  clientNameExists: boolean = null;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.equipmentForm = this.formBuilder.group({
      clientName: [''],
      name: ['', Validators.required],
      problemDescription: ['', Validators.required],
    });
  }

  addEquipment() {
    this.addNewEquipment.emit(this.equipmentForm);
    this.bsModalRef.hide();
  }

  checkClientExists() {
    this.clientNameExists = null;
    this.userService.checkUserExists(this.equipmentForm.controls.clientName.value).subscribe((response: string) => {
      this.clientNameExists = true;
    }, error => {
      this.clientNameExists = false;
    });
  }
}
