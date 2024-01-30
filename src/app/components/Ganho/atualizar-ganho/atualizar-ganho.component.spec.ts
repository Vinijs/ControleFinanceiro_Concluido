import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarGanhoComponent } from './atualizar-ganho.component';

describe('AtualizarGanhoComponent', () => {
  let component: AtualizarGanhoComponent;
  let fixture: ComponentFixture<AtualizarGanhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarGanhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarGanhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
