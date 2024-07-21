import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArticuloComponent } from './ver-articulo.component';

describe('VerArticuloComponent', () => {
    let component: VerArticuloComponent;
    let fixture: ComponentFixture<VerArticuloComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VerArticuloComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerArticuloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
