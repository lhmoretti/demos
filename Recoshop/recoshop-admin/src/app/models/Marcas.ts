import { Productos } from './Productos';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comercios } from './Comercios';
import { Categorias } from './Categorias';

export class Marcas {
    id: number;
    marca: string;
    comercioId: Comercios;
}

@Injectable({ providedIn: 'root' })
export class MarcasForm {
    constructor(public fb: FormBuilder) {}

    public MarcasForm = this.fb.group({
        id: [],
        marca: ['', Validators.required],
        comercioId: ['', Validators.required],
    });
}
