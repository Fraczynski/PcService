/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElementNamesService } from './elementNames.service';

describe('Service: ElementNames', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementNamesService]
    });
  });

  it('should ...', inject([ElementNamesService], (service: ElementNamesService) => {
    expect(service).toBeTruthy();
  }));
});
