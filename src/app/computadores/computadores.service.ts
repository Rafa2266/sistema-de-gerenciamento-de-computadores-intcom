import { environment } from './../../environments/environment';
import { Computador } from './computador';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ComputadoresService {

  private readonly API=`${environment.API}computadores`;
    
    constructor(private http:HttpClient) { }

    list(){
      return this.http.get<Computador[]>(this.API).pipe(tap(console.log));
    }
  
  };

