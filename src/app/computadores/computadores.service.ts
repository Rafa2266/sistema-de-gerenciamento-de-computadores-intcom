import { environment } from './../../environments/environment';
import { Computador } from './computador';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay,take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ComputadoresService {
//json-server --watch db.json
  private readonly API=`${environment.API}computadores`;
    
    constructor(private http:HttpClient) { }

    list(){
      return this.http.get<Computador[]>(this.API).pipe(delay(2000), tap(console.log));
    }
    create(computador:Computador){
      return this.http.post(this.API,computador).pipe(take(1));
    }
    loadByID(id){
      return this.http.get(`${this.API}/${id}`).pipe(take(1))
    }
    update(computador:Computador){
         return this.http.put(`${this.API}/${computador.id}`,computador).pipe(take(1));
    }
    remove(id){
      return this.http.delete(`${this.API}/${id}`).pipe(take(1));
    }
    load(){
      return this.http.get<Computador[]>(this.API).pipe(take(1))
    }
  
  };

