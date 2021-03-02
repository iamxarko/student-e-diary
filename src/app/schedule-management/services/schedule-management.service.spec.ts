import { TestBed } from '@angular/core/testing';

import { ScheduleManagementService } from './schedule-management.service';

describe('ScheduleManagementService', () => {
  let service: ScheduleManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
