import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputadoresRoutingModule } from './computadores-routing.module';
import { ComputadoresListaComponent } from './computadores-lista/computadores-lista.component';
import { ComputadoresFormComponent } from './computadores-form/computadores-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ComputadoresListaComponent, ComputadoresFormComponent],
  imports: [
    CommonModule,
    ComputadoresRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ComputadoresModule { }
