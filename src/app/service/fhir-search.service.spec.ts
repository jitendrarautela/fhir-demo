import { TestBed } from '@angular/core/testing';

import { FhirSearchService } from './fhir-search.service';

describe('FhirSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FhirSearchService = TestBed.get(FhirSearchService);
    expect(service).toBeTruthy();
  });
});
