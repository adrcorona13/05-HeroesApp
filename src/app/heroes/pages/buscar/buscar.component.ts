import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {

  termino:string = "";
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | any;

  constructor(private heroesService: HeroesService){}

  buscar(){
    this.heroesService.getHeroesByTermino(this.termino)
    .subscribe((heroes) => this.heroes = heroes);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    };
   
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroesById(heroe.id!)
      .subscribe( heroe => this.heroeSeleccionado = heroe);
  }


}
