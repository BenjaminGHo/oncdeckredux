import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentTemplateComponent } from './edit-appointment-template.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

describe('EditAppointmentTemplateComponent', () => {
  let component: EditAppointmentTemplateComponent;
  let fixture: ComponentFixture<EditAppointmentTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAppointmentTemplateComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
