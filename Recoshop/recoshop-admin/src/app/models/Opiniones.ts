import { Usuarios } from './Usuarios';
import { Productos } from './Productos';

export class Opiniones {
    id: number;
    opinion: string;
    puntaje: number;
    fecha: Date;
    hora: string;
    usuario: Usuarios;
    producto: Productos;
}
