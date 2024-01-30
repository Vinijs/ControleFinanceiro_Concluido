import { TestBed } from '@angular/core/testing';

import { CartoesService } from './cartoes.service';

describe('CartoesService', () => {
  let service: CartoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
