import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coxinha } from '../models/coxinha';

@Injectable({
  providedIn: 'root'
})
export class CoxinhaService {

  private apiUrl = 'https://bancacoxinha-api.onrender.com/api/catalogo/coxinha';

  constructor(private http: HttpClient) {}

  listarCoxinhas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}