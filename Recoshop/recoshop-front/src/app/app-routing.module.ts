import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { VerArticuloComponent } from './pages/ver-articulo/ver-articulo.component';
import { LoginComponent } from './pages/login/login.component';
import { ComercioComponent } from './pages/comercio/comercio.component';
import { Checkout1Component } from './pages/checkout1/checkout1.component';
import { Checkout2Component } from './pages/checkout2/checkout2.component';
import { Checkout3Component } from './pages/checkout3/checkout3.component';
import { RegComercioComponent } from './pages/reg-comercio/reg-comercio.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta.component';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { ListBuscadosComponent } from './pages/list-buscados/list-buscados.component';

import { CanActivateGuard } from './guards/can-activate.guard';
import { SobreNosotrosComponent } from './pages/footer-pages/sobre-nosotros/sobre-nosotros.component';
import { VisionComponent } from './pages/footer-pages/vision/vision.component';
import { ComoComprarComponent } from './pages/footer-pages/como-comprar/como-comprar.component';
import { ContactoComponent } from './pages/footer-pages/contacto/contacto.component';
import { RecPasswordComponent } from './components/rec-password/rec-password.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { EnviosComponent } from './pages/footer-pages/envios/envios.component';
import { MediosPagosComponent } from './pages/footer-pages/medios-pagos/medios-pagos.component';
import { TerminosCondicionesComponent } from './pages/footer-pages/terminos-condiciones/terminos-condiciones.component';
import { PregFrecuentesComponent } from './pages/footer-pages/preg-frecuentes/preg-frecuentes.component';
import { PlanesPagosComponent } from './pages/footer-pages/planes-pagos/planes-pagos.component';
import { PagoEnProcesoComponent } from './pages/pago-en-proceso/pago-en-proceso.component';

const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: '', pathMatch: 'full', component: InicioComponent },

    { path: 'ver-articulo/:id/:descripcion', component: VerArticuloComponent },
    { path: 'comercio/:id/:descripcion', component: ComercioComponent },
    { path: 'lista-productos/:id/:nombre', component: ListaProductosComponent },
    { path: 'lista-buscados', component: ListBuscadosComponent },
    { path: 'comercios', component: ComerciosComponent },
    {
        path: 'checkout1',
        component: Checkout1Component,
        canActivate: [CanActivateGuard],
    },
    {
        path: 'checkout2',
        component: Checkout2Component,
        canActivate: [CanActivateGuard],
    },
    // {path:'checkout3', component:Checkout3Component},
    { path: 'registrar-comercio', component: RegComercioComponent },
    {
        path: 'mi-cuenta',
        component: MiCuentaComponent,
        canActivate: [CanActivateGuard],
    },
    { path: 'login', component: LoginComponent },
    { path: 'recuperar-contraseña', component: RecPasswordComponent },
    { path: 'categorias', component: CategoriasComponent },
    // footer pages
    { path: 'contactanos', component: ContactoComponent },
    { path: 'como-comprar', component: ComoComprarComponent },
    { path: 'vision', component: VisionComponent },
    { path: 'sobre-nosotros', component: SobreNosotrosComponent },
    { path: 'envios', component: EnviosComponent },
    { path: 'medios-pagos', component: MediosPagosComponent },
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
    { path: 'preguntas-frecuentes', component: PregFrecuentesComponent },
    { path: 'planes-de-pagos', component: PlanesPagosComponent },
    { path: 'pago-en-proceso', component: PagoEnProcesoComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            initialNavigation: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
