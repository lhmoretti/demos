import { Component, OnInit, Input } from '@angular/core';
import { Comercio } from 'src/app/models/comercio.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-slider-comercios',
    templateUrl: './slider-comercios.component.html',
    styleUrls: ['./slider-comercios.component.css'],
})
export class SliderComerciosComponent implements OnInit {
    @Input() Titulo: String;
    @Input() arrComercios: Comercio[] = [];
    @Input() optSwiperComercios: OwlOptions = {};

    constructor() {}

    ngOnInit(): void {}
}
