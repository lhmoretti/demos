import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { VerPedidoPage } from "./ver-pedido.page";

describe("VerPedidoPage", () => {
    let component: VerPedidoPage;
    let fixture: ComponentFixture<VerPedidoPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [VerPedidoPage],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(VerPedidoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
