import { TestBed } from '@angular/core/testing';

import { DirectoryStructureService } from './directory-structure.service';

describe('DirectoryStructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectoryStructureService = TestBed.get(DirectoryStructureService);
    expect(service).toBeTruthy();
  });
});
