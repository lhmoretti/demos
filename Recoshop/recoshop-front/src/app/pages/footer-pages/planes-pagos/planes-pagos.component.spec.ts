import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesPagosComponent } from './planes-pagos.component';

describe('PlanesPagosComponent', () => {
    let component: PlanesPagosComponent;
    let fixture: ComponentFixture<PlanesPagosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlanesPagosComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlanesPagosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
