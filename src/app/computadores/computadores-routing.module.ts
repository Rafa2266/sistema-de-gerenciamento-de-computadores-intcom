import { ComputadoresListaComponent } from './computadores-lista/computadores-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
 {path:'computadores', component:ComputadoresListaComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputadoresRoutingModule { }
