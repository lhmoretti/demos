import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuscadosComponent } from './list-buscados.component';

describe('ListBuscadosComponent', () => {
    let component: ListBuscadosComponent;
    let fixture: ComponentFixture<ListBuscadosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListBuscadosComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListBuscadosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
