import { TestBed } from '@angular/core/testing';

import { ClearService } from './clear.service';

describe('ClearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearService = TestBed.get(ClearService);
    expect(service).toBeTruthy();
  });
});
