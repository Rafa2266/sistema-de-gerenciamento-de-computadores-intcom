import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputadoresRoutingModule } from './computadores-routing.module';
import { ComputadoresListaComponent } from './computadores-lista/computadores-lista.component';


@NgModule({
  declarations: [ComputadoresListaComponent],
  imports: [
    CommonModule,
    ComputadoresRoutingModule
  ]
})
export class ComputadoresModule { }
