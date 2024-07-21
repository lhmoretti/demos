import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComerciosComponent } from './slider-comercios.component';

describe('SliderComerciosComponent', () => {
    let component: SliderComerciosComponent;
    let fixture: ComponentFixture<SliderComerciosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SliderComerciosComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderComerciosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
