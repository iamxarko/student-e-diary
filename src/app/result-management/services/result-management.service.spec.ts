import { TestBed } from '@angular/core/testing';

import { ResultManagementService } from './result-management.service';

describe('ResultManagementService', () => {
  let service: ResultManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
