import { Productos } from './Productos';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export class Imagenes {
    id: number;
    nombre: string;
    descrip: string;
    img_thumb: string;
    url: string;
    articulo: Productos;
}

@Injectable({ providedIn: 'root' })
export class ImagenesForm {
    constructor(public fb: FormBuilder) {}

    public ImagenesForm = this.fb.group({
        id: [],
        nombre: [],
        descrip: [],
        img_thumb: [],
        url: [],
    });
}
