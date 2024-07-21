import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    // changeDetection:ChangeDetectionStrategy.OnPush,
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
    @Input() optSlider: OwlOptions = {};
    @Input() arrImgs: any[] = [];

    isDual = false;
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.optSlider.responsive['940'].items == 2
            ? (this.isDual = true)
            : (this.isDual = false);

        //  console.log(this.arrImgs);
    }

    verRuta(ruta) {
        if (ruta != undefined) {
            this.router.navigate([ruta]);
        }
    }
}
