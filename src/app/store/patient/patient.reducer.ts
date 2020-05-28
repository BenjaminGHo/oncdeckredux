import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';
import { Patient } from '../../models/patient.model';
import * as PatientActions from './patient.actions';
import * as BiopsyActions from '../biopsy/biopsy.actions';

export const patientsFeatureKey = 'patients';

export interface State extends EntityState<Patient> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Patient> = createEntityAdapter<Patient>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  entities: 
    {
      "51": {id: "51", firstName: "Ya", lastName: "Le", gender: "F", 
        dateOfBirth: "2000-02-02", biopsies: ["101"], dateCreatedMs: Date.now()},
      "52": {id: "52", firstName: "Jane", lastName: "Dia", gender: "F",
      dateOfBirth: "2000-03-01", biopsies: ["102"], dateCreatedMs: Date.now()}
    },
    ids: ["51", "52"]
});

export const reducer = createReducer(
  initialState,
  on(PatientActions.addPatient,
    (state, action) => adapter.addOne(action.patient, state)
  ),
  on(PatientActions.upsertPatient,
    (state, action) => adapter.upsertOne(action.patient, state)
  ),
  on(PatientActions.addPatients,
    (state, action) => adapter.addMany(action.patients, state)
  ),
  on(PatientActions.upsertPatients,
    (state, action) => adapter.upsertMany(action.patients, state)
  ),
  on(PatientActions.updatePatient,
    (state, action) => adapter.updateOne(action.patient, state)
  ),
  on(PatientActions.updatePatients,
    (state, action) => adapter.updateMany(action.patients, state)
  ),
  on(PatientActions.deletePatient,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PatientActions.deletePatients,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PatientActions.loadPatients,
    (state, action) => adapter.setAll(action.patients, state)
  ),
  on(PatientActions.clearPatients,
    state => adapter.removeAll(state)
  ),
  on(BiopsyActions.upsertBiopsy,
    (state, action) => {
      const patient: Patient = _.cloneDeep(state.entities[action.patientId]);
      if (patient.biopsies == null) {
        patient.biopsies = [];
      }
      patient.biopsies.push(action.biopsy.id);
      return {...state, entities: {...state.entities, [action.patientId]: patient}};
    }
  )
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()

export const selectPatients = createSelector(
  createFeatureSelector(patientsFeatureKey),
  selectAll
);

export const selectPatient = createSelector(
  selectPatients,
  (patients: Patient[], props) => patients.find(p => p.id == props.id)
);
