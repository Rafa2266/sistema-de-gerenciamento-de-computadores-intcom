import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'computadores'},
  {path:'computadores',loadChildren:'./computadores/computadores.module#ComputadoresModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
