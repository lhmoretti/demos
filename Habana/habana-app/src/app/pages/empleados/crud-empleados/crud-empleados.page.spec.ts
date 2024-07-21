import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { CrudEmpleadosPage } from "./crud-empleados.page";

describe("CrudEmpleadosPage", () => {
    let component: CrudEmpleadosPage;
    let fixture: ComponentFixture<CrudEmpleadosPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CrudEmpleadosPage],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(CrudEmpleadosPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
