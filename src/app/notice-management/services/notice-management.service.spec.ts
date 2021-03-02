import { TestBed } from '@angular/core/testing';

import { NoticeManagementService } from './notice-management.service';

describe('NoticeManagementService', () => {
  let service: NoticeManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
