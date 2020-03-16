/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EquipmentsService } from './equipments.service';

describe('Service: Equipments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentsService]
    });
  });

  it('should ...', inject([EquipmentsService], (service: EquipmentsService) => {
    expect(service).toBeTruthy();
  }));
});
