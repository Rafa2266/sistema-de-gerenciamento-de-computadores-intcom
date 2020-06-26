import { ComputadoresService } from './../computadores.service';
import { Computador } from '../computador';
import { Component, OnInit } from '@angular/core';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-computadores-lista',
  templateUrl: './computadores-lista.component.html',
  styleUrls: ['./computadores-lista.component.css'],
  preserveWhitespaces:true
})
export class ComputadoresListaComponent implements OnInit {
  computadores:Computador[];

  constructor(private service:ComputadoresService) { }

  ngOnInit(): void {
    this.service.list().subscribe(dados=>this.computadores=dados);
  }

}
