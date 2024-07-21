import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { CrudProductosPage } from "./crud-productos.page";

describe("CrudProductosPage", () => {
    let component: CrudProductosPage;
    let fixture: ComponentFixture<CrudProductosPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CrudProductosPage],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(CrudProductosPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
