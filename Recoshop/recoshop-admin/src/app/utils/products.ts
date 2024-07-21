import { Injectable } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Comercios } from '../models/Comercios';
import { AlertasService } from '../services/globales/alertas.service';
import { Productos } from '../models/Productos';

@Injectable({
    providedIn: 'root',
})
export class UtilProductService {
    constructor(
        private _productos: ProductosService,
        private _alert: AlertasService,
    ) {}

    checkCantProds(producto: Productos): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const plan: string = producto.comercioId.plan;
            this._productos
                .getCountProdsComercio(producto.comercioId.id)
                .subscribe((count: any) => {
                    const cnt: number = Number(count);
                    if (cnt >= 5 && plan === 'Negocio') {
                        this._alert.sweetAlert(
                            'Upss',
                            `Tu comercio ${producto.comercioId.nombre} ha alcanzado el límite de productos activos, pausa alguna publicación o bien, actualiza tu plan para más beneficios.`,
                        );
                        resolve(true);
                    } else if (cnt >= 40 && plan === 'Corporativo') {
                        this._alert.sweetAlert(
                            'Upss',
                            `Tu comercio ${producto.comercioId.nombre} ha alcanzado el límite de productos activos, pausa alguna publicación o bien, actualiza tu plan para más beneficios.`,
                        );
                        resolve(true);
                    } else if (producto.comercioId.id !== null) {
                        // comprobamos si es un producto a editar, habilitamos el btn guardar
                        resolve(false);
                    } else {
                        resolve(false);
                    }
                });
        });
    }

    archivar(producto: Productos): Promise<any> {
        return new Promise((resolve, reject) => {
            let msg1, msg2: string;
            if (!producto.archivado) {
                msg1 = 'Pausar publicación';
                msg2 = '¿Desea pausar la publicación?';
            } else {
                msg1 = 'Habilitar publicación';
                msg2 = '¿Desea habilitar la publicación?';
            }

            this._alert.sweetConfirm(msg1, msg2).then(async (val: boolean) => {
                if (val) {
                    if (!producto.archivado) {
                        // si está activo, lo archivamos
                        producto.archivado = true;
                    } else {
                        const res: boolean = await this.checkCantProds(
                            producto,
                        );
                        if (!res) {
                            // si devuelve false, habilitamos el producto
                            producto.archivado = false;
                        } else {
                            return;
                        }
                    }

                    this._productos.update(producto).subscribe(
                        (data: Productos) => {
                            this._alert.toastSuccess(
                                'Modificado con éxito',
                                '',
                            );
                            resolve(producto.comercioId.id);
                        },
                        (err) => {
                            this._alert.toastError('Ocurrió un error', 'Error');
                            console.log(err);
                        },
                    );
                }
            });
        });
    }
}
