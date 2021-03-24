import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMesaComponent } from './status-mesa.component';

describe('StatusMesaComponent', () => {
  let component: StatusMesaComponent;
  let fixture: ComponentFixture<StatusMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
