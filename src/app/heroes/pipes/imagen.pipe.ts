import { Pipe, PipeTransform } from "@angular/core";
import { Heroe } from "../interfaces/heroes.interface";

@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform{
    transform(heroe: Heroe, extension: string = "jpg"): string {
        if (heroe.id === "") {
            return 'assets/no-image.png';
        }
        return `assets/heroes/${heroe.id}.${extension}`;
    }
}