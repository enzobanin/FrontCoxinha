import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coxinha } from './coxinha';

describe('Coxinha', () => {
  let component: Coxinha;
  let fixture: ComponentFixture<Coxinha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coxinha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Coxinha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
