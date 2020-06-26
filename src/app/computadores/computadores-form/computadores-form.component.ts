import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-computadores-form',
  templateUrl: './computadores-form.component.html',
  styleUrls: ['./computadores-form.component.css']
})
export class ComputadoresFormComponent implements OnInit {

  form: FormGroup
  submitted=false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
   this.form=this.fb.group({
      numeroDeSerie:[null,[Validators.required]],
      placaMaeMarca:[null,[Validators.required]],
      placaMaeModelo:[null,[Validators.required]],
      RAMquantidade:[null,[Validators.required]],
      RAMcapacidadeTotal:[null,[Validators.required]],
      HDquantidade:[null,[Validators.required]],
      HDcapacidadeTotal:[null,[Validators.required]],
      fonteMarca:[null,[Validators.required]],
      fonteModelo:[null,[Validators.required]],
      processadorMarca:[null,[Validators.required]],
      processadorVelocidade:[null,[Validators.required]]
    })
  }
  onSubmit(){
    this.submitted=true;
    console.log(this.form.value)
    if(this.form.valid){
        console.log("submit")
      }
  }
  onCancel(){
    this.submitted=false;
    this.form.reset();
     console.log("cancelado")
  }
  hasError(field: string) {
    return this.form.get(field).errors;
  }

}
