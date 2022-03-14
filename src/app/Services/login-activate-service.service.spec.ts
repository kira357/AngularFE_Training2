/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginActivateServiceService } from './login-activate-service.service';

describe('Service: LoginActivateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginActivateServiceService]
    });
  });

  it('should ...', inject([LoginActivateServiceService], (service: LoginActivateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
