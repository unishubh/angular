import { TestBed, inject } from '@angular/core/testing';

import { FormChecksService } from './form-checks.service';

describe('FormChecksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormChecksService]
    });
  });

  it('should be created', inject([FormChecksService], (service: FormChecksService) => {
    expect(service).toBeTruthy();
  }));
});
