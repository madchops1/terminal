import { TestBed } from '@angular/core/testing';

import { LsService } from './ls.service';

describe('LsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LsService = TestBed.get(LsService);
    expect(service).toBeTruthy();
  });
});
