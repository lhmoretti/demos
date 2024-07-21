import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// views
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CanActivateService } from './services/auth/can-activate.service';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './views/productos/productos.component';
import { EnviosComponent } from './views/envios/envios.component';
import { EstadisticasComponent } from './views/estadisticas/estadisticas.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { ComerciosComponent } from './views/comercios/comercios.component';
import { FormasPagoComponent } from './views/formas-pago/formas-pago.component';
import { BannersComponent } from './views/banners/banners.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { MisComerciosComponent } from './views/mis-comercios/mis-comercios.component';
import { FormBannerComponent } from './views/banners/form-banner/form-banner.component';
import { SuscripcionesComponent } from './views/suscripciones/suscripciones.component';
import { PlanesPagoComponent } from './views/planes-pago/planes-pago.component';
import { ImportCsvComponent } from './views/productos/import-csv/import-csv.component';
import { ConfMercadoPagoComponent } from './views/conf-mercado-pago/conf-mercado-pago.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'comercios',
        component: ComerciosComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'mis-comercios',
        component: MisComerciosComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'envios',
        component: EnviosComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'estadisticas',
        component: EstadisticasComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'formas-de-pago',
        component: FormasPagoComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'banners',
        component: BannersComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'form-banner',
        component: FormBannerComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'suscripciones',
        component: SuscripcionesComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'planes-de-pago',
        component: PlanesPagoComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'conf-mercado-pago',
        component: ConfMercadoPagoComponent,
        canActivate: [CanActivateService],
    },
    {
        path: 'import-csv',
        component: ImportCsvComponent,
        canActivate: [CanActivateService],
    },

    { path: 'login', component: LoginComponent },

    { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
