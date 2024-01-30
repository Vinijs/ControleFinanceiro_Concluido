import { TestBed } from '@angular/core/testing';

import { GanhosService } from './ganhos.service';

describe('GanhosService', () => {
  let service: GanhosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GanhosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
