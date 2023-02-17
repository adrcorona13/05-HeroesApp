import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    publisher: Publisher.DCComics,
    first_appearance:''
  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  constructor(private heroeService: HeroesService, 
              private activatedRoute: ActivatedRoute,
              private router: Router){}

  ngOnInit():void{
    
    if(this.router.url.includes('editar')){
      this.activatedRoute.params.pipe(
        switchMap(({id}) => this.heroeService.getHeroesById(id))
      ).subscribe((heroe) => this.heroe = heroe)
    }else{
      return;
    }
  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroeService.updateHeroe(this.heroe)
      .subscribe(console.log);  
    }else{

      this.heroeService.saveHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
      });
    }
  }

  borrar(){
    this.heroeService.deleteHeroe(this.heroe.id!)
      .subscribe(resp => {
          this.router.navigate(['/heroes']);
      })
  }
}
