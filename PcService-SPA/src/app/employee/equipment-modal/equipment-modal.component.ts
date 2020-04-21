import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user/user.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { EquipmentsService } from 'src/app/_services/equipments/equipments.service';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';

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

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private userService: UserService,
    private equipmentsService: EquipmentsService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.equipmentForm = this.formBuilder.group({
      clientName: [''],
      name: ['', Validators.required],
      problemDescription: ['', Validators.required],
    });
  }

  addEquipment() {
    this.equipmentsService.addEquipment(this.equipmentForm.value).subscribe(() => {
      this.alertify.success('Dodano');
      this.addNewEquipment.emit();
      this.bsModalRef.hide();
    }, error => {
      this.alertify.error(error);
    });
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
