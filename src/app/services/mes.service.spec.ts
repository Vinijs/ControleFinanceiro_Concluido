import { TestBed } from '@angular/core/testing';

import { MesService } from './mes.service';

describe('MesService', () => {
  let service: MesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
