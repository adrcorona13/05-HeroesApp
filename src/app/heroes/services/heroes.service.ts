import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Heroe } from "../interfaces/heroes.interface";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService{

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient){}

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroesById(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  getHeroesByTermino(termino: string): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=5`);
  }

  saveHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  updateHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  deleteHeroe(id: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }
}