import { TestBed } from '@angular/core/testing';

import { PwdService } from './pwd.service';

describe('PwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PwdService = TestBed.get(PwdService);
    expect(service).toBeTruthy();
  });
});
