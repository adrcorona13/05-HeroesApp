import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit{

  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      delay(1000),
      switchMap(({id}) => this.heroesService.getHeroesById(id))
    )
    .subscribe(heroe => this.heroe = heroe);
    // this.activatedRoute.params.subscribe(console.log);
    
  }

  regresar(){
    this.router.navigateByUrl('/heroes');
  }

}
