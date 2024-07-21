import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregFrecuentesComponent } from './preg-frecuentes.component';

describe('PregFrecuentesComponent', () => {
    let component: PregFrecuentesComponent;
    let fixture: ComponentFixture<PregFrecuentesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PregFrecuentesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PregFrecuentesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
