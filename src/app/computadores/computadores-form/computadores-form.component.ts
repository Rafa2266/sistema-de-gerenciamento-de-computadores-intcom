import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { ComputadoresService } from './../computadores.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { Computador } from '../computador';

@Component({
  selector: 'app-computadores-form',
  templateUrl: './computadores-form.component.html',
  styleUrls: ['./computadores-form.component.css'],
  preserveWhitespaces: true,
})
export class ComputadoresFormComponent implements OnInit {
  form: FormGroup;
  updatedFormulario = false;
  submitted = false;
  computadores: Computador[]

  constructor(
    private fb: FormBuilder,
    private service: ComputadoresService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service.load().subscribe(dados=> this.computadores = dados);
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.service.loadByID(id))
      )
      .subscribe((computador) => {
        this.updateForm(computador);
      });

    this.form = this.fb.group({
      id: [null],
      numeroDeSerie: [null, [Validators.required]],
      placaMaeMarca: [null, [Validators.required]],
      placaMaeModelo: [null, [Validators.required]],
      RAMquantidade: [null, [Validators.required]],
      RAMcapacidadeTotal: [null, [Validators.required]],
      HDquantidade: [null, [Validators.required]],
      HDcapacidadeTotal: [null, [Validators.required]],
      fonteMarca: [null, [Validators.required]],
      fonteModelo: [null, [Validators.required]],
      processadorMarca: [null, [Validators.required]],
      processadorVelocidade: [null, [Validators.required]],
    });
  }
  updateForm(computador) {
    this.updatedFormulario = true;
    this.form.setValue({
      id: computador.id,
      numeroDeSerie: computador.numeroDeSerie,
      placaMaeMarca: computador.placaMaeMarca,
      placaMaeModelo: computador.placaMaeModelo,
      RAMquantidade: computador.RAMquantidade,
      RAMcapacidadeTotal: computador.RAMcapacidadeTotal,
      HDquantidade: computador.HDquantidade,
      HDcapacidadeTotal: computador.HDcapacidadeTotal,
      fonteMarca: computador.fonteMarca,
      fonteModelo: computador.fonteModelo,
      processadorMarca: computador.processadorMarca,
      processadorVelocidade: computador.processadorVelocidade,
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.form.value.id) {
        if (
          !(this.VerificarNumeroDeSerieUpdate(
            this.form.value.numeroDeSerie,
            this.form.value.id
          ))
        ) {
          this.service.update(this.form.value).subscribe(
            (success) => {
              this.modal.showAlertSuccess('Registro atualizado com sucesso');
              this.location.back();
            },
            (error) => {
              this.modal.showAlertDanger(
                'Erro ao atualizar registro, tente novamente mais tarde'
              );
            },
            () => console.log('update completo')
          );
          this.updatedFormulario = false;
        } else {
          this.modal.showAlertDanger('Número de série já existente');
        }
      } else {
        if (!(this.VerificarNumeroDeSerieCreate(this.form.value.numeroDeSerie))) {
          console.log('submit');
          this.service.create(this.form.value).subscribe(
            (success) => {
              this.modal.showAlertSuccess('Computador cadastrado com sucesso');
              this.form.reset();
              this.submitted = false;
              this.location.back();
            },
            (error) =>
              this.modal.showAlertDanger(
                'Erro ao cadastrar computador, tente novamente mais tarde'
              ),
            () => console.log('request completo')
          );
        } else {
          this.modal.showAlertDanger('Número de série já existente');
        }
      }
    }
  }

  onCancel() {
    this.submitted = false;
    if (this.form.value.id) {
      this.location.back();
    }
    this.form.reset();
    console.log('cancelado');
  }
  hasError(field: string) {
    return this.form.get(field).errors;
  }
  VerificarNumeroDeSerieCreate(verificado: String) {
    

    for (let computador of this.computadores) {
      if (computador.numeroDeSerie == verificado) {
        return true;
      }
    }
    return false;
  }
  VerificarNumeroDeSerieUpdate(verificado: String, id) {
    for (let computador of this.computadores) {
      if (computador.numeroDeSerie == verificado && computador.id != id) {
        return true;
      }
    }
    return false;
  }
}
