import { TestBed } from '@angular/core/testing';

import { FeesManagementService } from './fees-management.service';

describe('FeesManagementService', () => {
  let service: FeesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
