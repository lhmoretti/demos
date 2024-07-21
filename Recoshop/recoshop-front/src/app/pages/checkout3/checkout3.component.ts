import { Component, OnInit } from '@angular/core';
// import * as metPagos from '../../../assets/json/MetPago.json';

@Component({
    selector: 'app-checkout3',
    templateUrl: './checkout3.component.html',
    styleUrls: ['./checkout3.component.css'],
})
export class Checkout3Component implements OnInit {
    step = 'check3';

    // arrMetPago:any[] = metPagos.MetodosPagos;

    constructor() {}

    ngOnInit(): void {}

    // select(index){
    //   this.arrMetPago.forEach(e=> e.selected = false);

    //   this.arrMetPago[index].selected = true;

    // }
}
