import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegComercioComponent } from './reg-comercio.component';

describe('RegComercioComponent', () => {
    let component: RegComercioComponent;
    let fixture: ComponentFixture<RegComercioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegComercioComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegComercioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
