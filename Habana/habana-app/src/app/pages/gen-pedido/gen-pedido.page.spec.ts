import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { GenPedidoPage } from "./gen-pedido.page";

describe("GenPedidoPage", () => {
    let component: GenPedidoPage;
    let fixture: ComponentFixture<GenPedidoPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GenPedidoPage],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(GenPedidoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
