import { TestBed } from '@angular/core/testing';

import { LeaveManagementService } from './leave-management.service';

describe('LeaveManagementService', () => {
  let service: LeaveManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
