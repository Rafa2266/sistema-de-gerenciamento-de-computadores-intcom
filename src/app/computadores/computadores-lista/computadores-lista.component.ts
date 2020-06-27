import { ComputadoresService } from './../computadores.service';
import { Computador } from '../computador';
import { Component, OnInit } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-computadores-lista',
  templateUrl: './computadores-lista.component.html',
  styleUrls: ['./computadores-lista.component.css'],
  preserveWhitespaces:true
})
export class ComputadoresListaComponent implements OnInit {
  
  computadores$:Observable<Computador[]>;

  error$ = new Subject<boolean>();

  constructor(private service:ComputadoresService) { }

  ngOnInit(): void {
    //this.service.list().subscribe(dados=>this.computadores=dados);
    
    this.onRefresh();
  }
  onRefresh(){
    this.computadores$=this.service.list().pipe(
      catchError(erro=>{
        console.error(erro);
        this.error$.next(true);
        return empty();
      })
      );
  }

}
