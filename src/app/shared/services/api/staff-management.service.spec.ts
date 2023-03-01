import { TestBed } from '@angular/core/testing';

import { StaffManagementService } from './staff-management.service';

describe('StaffManagementService', () => {
  let service: StaffManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
