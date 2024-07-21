import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';

import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { VerArticuloComponent } from './pages/ver-articulo/ver-articulo.component';
import { LoginComponent } from './pages/login/login.component';
import { ComercioComponent } from './pages/comercio/comercio.component';
import { Checkout1Component } from './pages/checkout1/checkout1.component';
import { Checkout2Component } from './pages/checkout2/checkout2.component';
import { Checkout3Component } from './pages/checkout3/checkout3.component';
import { RegComercioComponent } from './pages/reg-comercio/reg-comercio.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { ComponentsModule } from './components/components.module';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta.component';
import { MisPedidosComponent } from './pages/mis-pedidos/mis-pedidos.component';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { ListBuscadosComponent } from './pages/list-buscados/list-buscados.component';
import { HeaderMobileComponent } from './shared/header-mobile/header-mobile.component';
import { CartMobileComponent } from './shared/cart-mobile/cart-mobile.component';
import { ContactoComponent } from './pages/footer-pages/contacto/contacto.component';
import { SobreNosotrosComponent } from './pages/footer-pages/sobre-nosotros/sobre-nosotros.component';
import { VisionComponent } from './pages/footer-pages/vision/vision.component';
import { ComoComprarComponent } from './pages/footer-pages/como-comprar/como-comprar.component';
import { PlanesPagosComponent } from './pages/footer-pages/planes-pagos/planes-pagos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { PregFrecuentesComponent } from './pages/footer-pages/preg-frecuentes/preg-frecuentes.component';
import { MediosPagosComponent } from './pages/footer-pages/medios-pagos/medios-pagos.component';
import { EnviosComponent } from './pages/footer-pages/envios/envios.component';
import { TerminosCondicionesComponent } from './pages/footer-pages/terminos-condiciones/terminos-condiciones.component';
import { PagoEnProcesoComponent } from './pages/pago-en-proceso/pago-en-proceso.component';

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        InicioComponent,

        VerArticuloComponent,
        LoginComponent,
        ComercioComponent,

        Checkout1Component,
        Checkout2Component,
        Checkout3Component,
        PlanesPagosComponent,
        RegComercioComponent,
        ComerciosComponent,
        MiCuentaComponent,
        MisPedidosComponent,
        ListaProductosComponent,
        ListBuscadosComponent,
        HeaderMobileComponent,
        CartMobileComponent,
        ContactoComponent,
        SobreNosotrosComponent,
        VisionComponent,
        ComoComprarComponent,
        CategoriasComponent,
        PregFrecuentesComponent,
        MediosPagosComponent,
        EnviosComponent,
        TerminosCondicionesComponent,
        PagoEnProcesoComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        FormsModule,
        ComponentsModule,
        HttpClientModule,
        CarouselModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            // ToastrModule added
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
            preventDuplicates: true,
        }),
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }],
    bootstrap: [AppComponent],
})
export class AppModule {}
