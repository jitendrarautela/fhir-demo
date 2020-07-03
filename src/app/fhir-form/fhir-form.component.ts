import { Component, OnInit } from '@angular/core';
import { FhirSearchService } from '../service/fhir-search.service';

@Component({
  selector: 'app-fhir-form',
  templateUrl: './fhir-form.component.html',
  styleUrls: ['./fhir-form.component.css']
})
export class FhirFormComponent implements OnInit {

  private data: any[];
  private patient: any[] = [];
  private condition: any[] = [];
  private selectedPatient: any;
  private patientCondition: any = [];

  constructor(private service: FhirSearchService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.service.getPatients().subscribe((res) => {
      this.data = res.entry;
      this.filterData();
      this.selectedPatient = this.data[0].resource;
      this.selectedPatientDetails();
    });
  }

  selectPatient(id: string) {
    this.selectedPatient = this.data.filter(patient => patient.resource.id === id)[0].resource;
    this.selectedPatientDetails();
  }

  filterData() {
    for (const data of this.data) {
      if (data.resource.resourceType === 'Patient') {
        this.patient.push(data);
      } else {
        this.condition.push(data);
      }
    }
  }

  selectedPatientDetails() {
    for (const condition of this.condition) {
      if (condition.resource.subject.reference === 'Patient/' + this.selectedPatient.id) {
        this.patientCondition.push(condition.resource);
      }
    }
  }

  sortByDate() {
    this.patientCondition.sort((a, b) => {
      return this.getTime(a.onsetDateTime) - this.getTime(b.onsetDateTime);
    });
  }

  sortByCondition() {
    this.patientCondition.sort((a, b) => a.code.text < b.code.text ? -1 : a.code.text > b.code.text ? 1 : 0);
  }

  sortByStatus() {
    this.patientCondition.sort((a, b) => a.clinicalStatus.coding[0].code < b.clinicalStatus.coding[0].code 
            ? -1 : a.clinicalStatus.coding[0].code > b.clinicalStatus.coding[0].code ? 1 : 0);
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }
}
