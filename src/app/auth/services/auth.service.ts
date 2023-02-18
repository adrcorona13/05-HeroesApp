import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth{
    return {...this._auth!};
  }

  constructor(private httpClient: HttpClient) { }

  login():Observable<Auth>{
    return this.httpClient.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => {
          this._auth = auth;
          
        })
      );  
  }

  logout():void{
    this._auth = undefined;
  }
}
