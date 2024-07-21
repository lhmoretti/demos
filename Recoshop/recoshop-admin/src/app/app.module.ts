import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// PIPE ESPAÑOL
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsAr, 'es-Ar');

// HTTP SERVICE.
import { AuthInterceptorService } from './services/auth-interceptor.service';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { ProductosComponent } from './views/productos/productos.component';
import { EnviosComponent } from './views/envios/envios.component';
import { EstadisticasComponent } from './views/estadisticas/estadisticas.component';
import { ImagenesComponent } from './views/productos/imagenes/imagenes.component';
import { MarcasComponent } from './views/productos/marcas/marcas.component';
import { FormArticuloComponent } from './views/productos/form-producto/form-producto.component';
import { CategoriasComponent } from './views/productos/categorias/categorias.component';
import { PaginacionComponent } from './services/globales/paginacion/paginacion.component';
import { ModalPedidoComponent } from './views/pedidos/modal-pedido/modal-pedido.component';
import { ComerciosComponent } from './views/comercios/comercios.component';
import { FormComerciosComponent } from './views/comercios/form-comercio/form-comercio.component';
import { DestacadosComponent } from './views/productos/destacados/destacados.component';
import { PromocionComponent } from './views/productos/promocion/promocion.component';
import { FormasPagoComponent } from './views/formas-pago/formas-pago.component';
import { BannersComponent } from './views/banners/banners.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { FormUsuarioComponent } from './views/usuarios/form-usuario/form-usuario.component';
import { MisComerciosComponent } from './views/mis-comercios/mis-comercios.component';
import { FormBannerComponent } from './views/banners/form-banner/form-banner.component';
import { SuscripcionesComponent } from './views/suscripciones/suscripciones.component';
import { PlanesPagoComponent } from './views/planes-pago/planes-pago.component';
import { ImportCsvComponent } from './views/productos/import-csv/import-csv.component';
import { ConfMercadoPagoComponent } from './views/conf-mercado-pago/conf-mercado-pago.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent,
        DashboardComponent,
        LoginComponent,
        PedidosComponent,
        ProductosComponent,
        EnviosComponent,
        EstadisticasComponent,
        ImagenesComponent,
        MarcasComponent,
        FormArticuloComponent,
        CategoriasComponent,
        PaginacionComponent,
        ModalPedidoComponent,
        ComerciosComponent,
        FormComerciosComponent,
        DestacadosComponent,
        PromocionComponent,
        FormasPagoComponent,
        BannersComponent,
        UsuariosComponent,
        FormUsuarioComponent,
        MisComerciosComponent,
        FormBannerComponent,
        SuscripcionesComponent,
        PlanesPagoComponent,
        ImportCsvComponent,
        ConfMercadoPagoComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, // required animations module
        AngularEditorModule,
        ImageCropperModule,
        ToastrModule.forRoot({
            // ToastrModule added
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
            preventDuplicates: true,
        }),
    ],
    exports: [],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-Ar' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
