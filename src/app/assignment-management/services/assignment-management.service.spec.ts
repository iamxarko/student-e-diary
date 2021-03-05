import { TestBed } from '@angular/core/testing';

import { AssignmentManagementService } from './assignment-management.service';

describe('AssignmentManagementService', () => {
  let service: AssignmentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
