import { ComputadoresFormComponent } from './computadores-form/computadores-form.component';
import { ComputadoresListaComponent } from './computadores-lista/computadores-lista.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
 {path:'computadores', component:ComputadoresListaComponent}, 
 {path:'novoComputador', component:ComputadoresFormComponent},
 {path:'eidtarComputador/:id', component:ComputadoresFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputadoresRoutingModule { }
