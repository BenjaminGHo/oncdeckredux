import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './containers/patient-list/patient-list.component';
import { ViewPatientComponent } from './containers/view-patient/view-patient.component';
import { EditPatientComponent } from './containers/edit-patient/edit-patient.component';
import { ViewPatientTemplateComponent } from './presentation/view-patient-template/view-patient-template.component';
import { EditPatientTemplateComponent } from './presentation/edit-patient-template/edit-patient-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListTemplateComponent } from './presentation/patient-list-template/patient-list-template.component';
import { ToolbarComponent } from './containers/toolbar/toolbar.component';
import { ToolbarTemplateComponent } from './presentation/toolbar-template/toolbar-template.component';
import { PatientSidenavTemplateComponent } from './presentation/patient-sidenav-template/patient-sidenav-template.component';
import { SearchCriteriaTemplateComponent } from './presentation/search-criteria-template/search-criteria-template.component';
import { ViewBiopsyComponent } from './containers/biopsy/view-biopsy/view-biopsy.component';
import { ViewBiopsyTemplateComponent } from './presentation/biopsy/view-biopsy-template/view-biopsy-template.component';
import { EffectsModule } from '@ngrx/effects';
import { PatientEffects } from './store/patient/patient.effects';
import { EditBiopsyReportComponent } from './containers/biopsy/edit-biopsy-report/edit-biopsy-report.component';
import { EditBiopsyReportTemplateComponent } from './presentation/biopsy/edit-biopsy-report-template/edit-biopsy-report-template.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientListTemplateComponent,
    ViewPatientComponent,
    ViewPatientTemplateComponent,
    EditPatientComponent,
    EditPatientTemplateComponent,
    ToolbarComponent,
    ToolbarTemplateComponent,
    PatientSidenavTemplateComponent,
    SearchCriteriaTemplateComponent,
    ViewBiopsyComponent,
    ViewBiopsyTemplateComponent,
    EditBiopsyReportComponent,
    EditBiopsyReportTemplateComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSidenavModule,
    MatStepperModule,
    MatToolbarModule,
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([PatientEffects])
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
