import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Categoria } from 'src/app/models/categoria.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-slider-categorias',
    templateUrl: './slider-categorias.component.html',
    styleUrls: ['./slider-categorias.component.css'],
})
export class SliderCategoriasComponent implements OnInit {
    @Input() optSlider: OwlOptions = {};
    @Input() arrCategorias: Categoria[] = [];

    constructor(private router: Router) {}

    ngOnInit(): void {}

    verProdsCategoria(categoria) {
        let nombreSE = '';
        for (let i = 0; i < categoria.categoria.length; i++) {
            nombreSE +=
                categoria.categoria.charAt(i) == ' '
                    ? '-'
                    : categoria.categoria.charAt(i);
        }
        this.router.navigate(['lista-productos', categoria.id, nombreSE]);
    }
}
