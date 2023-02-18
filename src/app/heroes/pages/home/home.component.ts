import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  get auth(){
    return this.authService.auth;
  }

  constructor(private router: Router,
              private authService: AuthService){}

  logout(){
    this.router.navigate(['./auth']);
  }
}
