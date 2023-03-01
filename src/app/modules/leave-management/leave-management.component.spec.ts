import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveManagementService } from '@shared/index';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LeaveManagementComponent } from './leave-management.component';

describe('LeaveManagementComponent', () => {
  let component: LeaveManagementComponent;
  let fixture: ComponentFixture<LeaveManagementComponent>;
  let service: LeaveManagementService;
  let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ LeaveManagementComponent ],
            imports: [HttpClientTestingModule],
            providers: [LeaveManagementService]
        })
        .compileComponents();   
        service = TestBed.inject(LeaveManagementService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LeaveManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        httpMock.verify();
    });
    
    it('should retrieve data from the API via GET', () => {
        const dummyData = {
            data: "",
            response: [
                {
                    id: 1,
                    fromDate: "12-01-2022",
                    toDate: "12-10-2022",
                    reason: "Family function",
                    status: "Approved"
                },
                {
                    id: 2,
                    fromDate: "04-20-2022",
                    toDate: "04-25-2022",
                    reason: "Vacations",
                    status: "Approved"
                },
            ]
        };
    
        service.getLeavesOfStaff().subscribe(data => {
            expect(data.response.length).toBe(2);
            expect(data).toEqual(dummyData);
        });
    
        const req = httpMock.expectOne('http://localhost:4200///assets/json/menu.json');
        expect(req.request.method).toBe('GET');
        req.flush(dummyData);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
