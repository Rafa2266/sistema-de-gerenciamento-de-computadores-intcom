import { AlertModalService } from './../../shared/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComputadoresService } from './../computadores.service';
import { Computador } from '../computador';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-computadores-lista',
  templateUrl: './computadores-lista.component.html',
  styleUrls: ['./computadores-lista.component.css'],
  preserveWhitespaces: true,
})
export class ComputadoresListaComponent implements OnInit {

  computadores$: Observable<Computador[]>;
  error$ = new Subject<boolean>();
  delteModalRef:BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  computadorSelecionado:Computador;
  filtragemAtual:string='';
   
  constructor(
    private service: ComputadoresService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService:BsModalService,
    private modal:AlertModalService
  ) {}

  ngOnInit(): void {
    

    this.onRefresh();
  }
  onRefresh() {
    this.computadores$ = this.service.list().pipe(
      catchError((erro) => {
        console.error(erro);
        this.error$.next(true);
        return empty();
      })
    );
           
    }
  onEdit(id) {
    this.router.navigate(['eidtarComputador', id], { relativeTo: this.route });
  }
  onDelete(computador) {
    this.delteModalRef=this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    this.computadorSelecionado=computador;
  }
  onConfirmDelete(){
     this.service.remove(this.computadorSelecionado.id).subscribe(
       success=>{
        this.modal.showAlertSuccess("Registro apagado com sucesso")
        this.onRefresh()
       },
       error=>{this.modal.showAlertDanger("Falha ao apagar registro, tente novamente mais tarde")}
       
     );
     this.delteModalRef.hide();
  }
  onDeclineDelete(){
    this.delteModalRef.hide();
  }
  onKeyUp(evento:KeyboardEvent){
        this.filtragemAtual=((<HTMLInputElement>evento.target).value).toLowerCase();
  }
  onFiltro(computador:Computador){
       if(this.filtragemAtual==''||this.filtragemAtual==computador.numeroDeSerie.toLowerCase()||this.filtragemAtual==computador.placaMaeMarca.toLowerCase()||
       this.filtragemAtual==computador.placaMaeModelo.toLowerCase()||this.filtragemAtual==(`${computador.RAMquantidade}RAM`).toLowerCase()
       ||this.filtragemAtual==(`${computador.RAMcapacidadeTotal}GB`).toLowerCase()||this.filtragemAtual==(`${computador.HDquantidade}HD`).toLowerCase()
       ||this.filtragemAtual==(`${computador.HDcapacidadeTotal}TB`).toLowerCase()||this.filtragemAtual==computador.processadorMarca.toLowerCase()
       ||this.filtragemAtual==(`${computador.processadorVelocidade}GHz`).toLowerCase()||this.filtragemAtual==computador.fonteMarca.toLowerCase()
       ||this.filtragemAtual==computador.fonteModelo.toLowerCase()){
         return true
       }else{
         return false
       }
  }
}
