import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from './components/main/main.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InfoComponent } from './components/info/info.component';
import { CuestionarioComponent } from './components/cuestionario/cuestionario.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { LandingpageService } from './services/landingpage.service';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './components/test/test.component';
import { HapticaComponent } from './components/haptica/haptica.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    InicioComponent,
    InfoComponent,
    CuestionarioComponent,
    ResultadoComponent,
    TestComponent,
    HapticaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    LandingpageRoutingModule
  ],
  providers: [
    LandingpageService
  ],
})
export class LandingpageModule { }
