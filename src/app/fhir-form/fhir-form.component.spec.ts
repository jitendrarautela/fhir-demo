import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirFormComponent } from './fhir-form.component';

describe('FhirFormComponent', () => {
  let component: FhirFormComponent;
  let fixture: ComponentFixture<FhirFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhirFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
