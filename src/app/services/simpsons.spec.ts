import { TestBed } from '@angular/core/testing';

import { Simpsons } from './simpsons';

describe('Simpsons', () => {
  let service: Simpsons;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Simpsons);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
