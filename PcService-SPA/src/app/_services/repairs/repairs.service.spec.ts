/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RepairsService } from './repairs.service';

describe('Service: Repairs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairsService]
    });
  });

  it('should ...', inject([RepairsService], (service: RepairsService) => {
    expect(service).toBeTruthy();
  }));
});
