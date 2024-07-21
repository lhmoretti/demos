import { Marcas } from './Marcas';
import { Categorias } from './Categorias';
import { Imagenes } from './Imagenes';
import { Injectable } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Opiniones } from './Opiniones';
import { Comercios } from './Comercios';

export class Productos {
    id: number;
    nombre: string;
    descripcion: string;
    unidad: number;
    precio_costo: number;
    precio_venta: number;
    precio_oferta: number;
    oferta: boolean;
    promocion: boolean;
    destacado: boolean;
    promocion_comercio: boolean;
    destacado_comercio: boolean;
    inicio: boolean;
    disponible: boolean;
    disponible_compra: boolean;
    disponible_consulta: boolean;
    archivado: boolean;
    rebaja: number;
    sku: string;
    ranking: number;
    stock_actual: number;
    alto: number;
    ancho: number;
    profundidad: number;
    peso: number;
    marcaId: Marcas;
    categoriaId: Categorias;
    comercioId: Comercios;
    opinion: Opiniones[];
    imagenes: Imagenes[];
}

export class ProductosJson {
    public ProductoJson = {
        id: null,
        nombre: null,
        descripcion: null,
        // ------------------
        precio_costo: null,
        precio_venta: null,
        precio_oferta: null,
        // ------------------
        oferta: false,
        promocion: false,
        destacado: false,
        promocion_comercio: false,
        destacado_comercio: false,
        inicio: true,
        disponible: true,
        disponible_compra: true,
        disponible_consulta: false,
        archivado: false,
        unidad: 1,

        alto: null,
        ancho: null,
        profundidad: null,
        peso: null,
        // ------------------
        rebaja: null,
        sku: null,
        ranking: null,
        stock_actual: null,
        marcaId: null,
        categoriaId: null,
        opinion: null,
        imagenes: null,
        comercioId: null,
    };
}
