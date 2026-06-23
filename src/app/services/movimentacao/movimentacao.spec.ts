import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Movimentacao } from './movimentacao';

describe('Movimentacao', () => {
  let component: Movimentacao;
  let fixture: ComponentFixture<Movimentacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movimentacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Movimentacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
