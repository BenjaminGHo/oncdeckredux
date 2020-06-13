import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/common/patient.model';
import * as fromPatient from 'src/app/store/patient/patient.reducer';
import * as fromBiopsy from 'src/app/store/biopsy/biopsy.reducer';
import * as fromAppointment from 'src/app/store/appointment/appointment.reducer';
import { Biopsy } from 'src/app/models/biopsy/biopsy.model';
import { mergeMap } from 'rxjs/operators';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
  patient$: Observable<Patient>;
  appointments$: Observable<Appointment[]>;
  biopsies$: Observable<Biopsy[]>;

  constructor(private store: Store,
    private router: Router,
    private route: ActivatedRoute) {      
  }

  ngOnInit(): void {
    let patientId = this.route.snapshot.paramMap.get('patientId');

    this.patient$ = this.store.pipe(
      select(fromPatient.selectPatient, { id: patientId }));

    this.appointments$ = this.store.select(
      fromPatient.selectPatient, { id: patientId }).pipe(
        mergeMap(patient => 
          this.store.select(fromAppointment.selectAppointmentsSubset,
            { appointmentIds: patient.appointmentIds })
        )
      );

    this.biopsies$ = this.store.select(
      fromPatient.selectPatient, { id: patientId }).pipe(
      mergeMap(patient =>
        this.store.select(fromBiopsy.selectBiopsiesSubset, 
          { biopsyIds: patient.biopsies})
      )
    );
  }
}
