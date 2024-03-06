import { TestBed } from '@angular/core/testing';
import { EmpMainService } from './emp-main.service';
describe('EmpMainService', () => {
  let service: EmpMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpMainService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
