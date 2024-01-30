import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoGanhoComponent } from './novo-ganho.component';

describe('NovoGanhoComponent', () => {
  let component: NovoGanhoComponent;
  let fixture: ComponentFixture<NovoGanhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoGanhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoGanhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
