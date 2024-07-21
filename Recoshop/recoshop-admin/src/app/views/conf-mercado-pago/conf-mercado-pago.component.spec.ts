import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfMercadoPagoComponent } from './conf-mercado-pago.component';

describe('ConfMercadoPagoComponent', () => {
    let component: ConfMercadoPagoComponent;
    let fixture: ComponentFixture<ConfMercadoPagoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfMercadoPagoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfMercadoPagoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
