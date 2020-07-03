import { Component, OnInit } from '@angular/core';
import { FhirSearchService } from '../service/fhir-search.service';

@Component({
  selector: 'app-fhir-form',
  templateUrl: './fhir-form.component.html',
  styleUrls: ['./fhir-form.component.css']
})
export class FhirFormComponent implements OnInit {

  private data: any[];
  private patients: any[] = [];
  private condition: any[] = [];
  private selectedPatient: any;
  private patientCondition: any = [];
  private conditionSorter = true;
  private dateSorter = true;
  private statusSorter = true;

  constructor(private service: FhirSearchService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.service.getPatients().subscribe((res) => {
      this.data = res.entry;
      this.filterData();
      this.selectedPatient = this.data[0].resource;
      this.selectedPatientCondition();
    });
  }

  selectPatient(id: string) {
    this.selectedPatient = this.data.filter(patient => patient.resource.id === id)[0].resource;
    this.selectedPatientCondition();
  }

  filterData() {
    for (const data of this.data) {
      if (data.resource.resourceType === 'Patient') {
        this.patients.push(data);
      } else {
        this.condition.push(data);
      }
    }
  }

  selectedPatientCondition() {
    this.patientCondition = [];
    for (const condition of this.condition) {
      if (condition.resource.subject.reference === 'Patient/' + this.selectedPatient.id) {
        this.patientCondition.push(condition.resource);
      }
    }
  }

  getFullName(patient: any): string {
    if (patient !== undefined) {
      return patient.name[0].given[0] + ' ' + patient.name[0].family;
    }
  }

  sortByDate() {
    this.patientCondition.sort((a, b) => {
      if (this.dateSorter) {
        return this.getTime(a.onsetDateTime) - this.getTime(b.onsetDateTime);
      } else {
        return this.getTime(b.onsetDateTime) - this.getTime(a.onsetDateTime);
      }
    });
    this.dateSorter = !this.dateSorter;
  }

  sortByCondition() {
    this.patientCondition.sort((a, b) => {
      if (this.conditionSorter) {
        return a.code.text < b.code.text ? -1 : a.code.text > b.code.text ? 1 : 0;
      } else {
        return a.code.text < b.code.text ? 1 : a.code.text > b.code.text ? -1 : 0;
      }
    });
    this.conditionSorter = !this.conditionSorter;
  }

  sortByStatus() {
    this.patientCondition.sort((a, b) => {
      if (this.statusSorter) {
        return a.clinicalStatus.coding[0].code < b.clinicalStatus.coding[0].code
        ? -1 : a.clinicalStatus.coding[0].code > b.clinicalStatus.coding[0].code ? 1 : 0;
      } else {
        return a.clinicalStatus.coding[0].code < b.clinicalStatus.coding[0].code
        ? 1 : a.clinicalStatus.coding[0].code > b.clinicalStatus.coding[0].code ? -1 : 0;
      }
    });
    this.statusSorter = !this.statusSorter;
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }
}
