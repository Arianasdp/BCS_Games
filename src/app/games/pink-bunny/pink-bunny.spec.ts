import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinkBunny } from './pink-bunny';

describe('PinkBunny', () => {
  let component: PinkBunny;
  let fixture: ComponentFixture<PinkBunny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinkBunny],
    }).compileComponents();

    fixture = TestBed.createComponent(PinkBunny);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
