import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemGanhosComponent } from './listagem-ganhos.component';

describe('ListagemGanhosComponent', () => {
  let component: ListagemGanhosComponent;
  let fixture: ComponentFixture<ListagemGanhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemGanhosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemGanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
