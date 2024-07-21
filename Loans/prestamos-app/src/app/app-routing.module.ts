import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { CanActivateService } from "./services/auth/can-activate.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "clientes",
    pathMatch: "full",
  },
  {
    path: "clientes",
    canActivate: [CanActivateService],
    loadChildren: () =>
      import("./pages/clientes/clientes.module").then(
        (m) => m.ClientesPageModule,
      ),
  },
  {
    path: "form-clientes",
    canActivate: [CanActivateService],
    loadChildren: () =>
      import("./pages/clientes/form-cliente/form-cliente.module").then(
        (m) => m.FormClientePageModule,
      ),
  },
  {
    path: "prestamos",
    canActivate: [CanActivateService],
    loadChildren: () =>
      import("./pages/prestamos/prestamos.module").then(
        (m) => m.PrestamosPageModule,
      ),
  },
  {
    path: "prestamos/cliente/:id",
    canActivate: [CanActivateService],
    loadChildren: () =>
      import("./pages/prestamos/prestamos.module").then(
        (m) => m.PrestamosPageModule,
      ),
  },
  {
    path: "prestamos/detalles/:id",
    canActivate: [CanActivateService],
    loadChildren: () =>
      import(
        "./pages/prestamos/prestamos-detalles/prestamos-detalles.module"
      ).then((m) => m.PrestamosDetallesPageModule),
  },
  {
    path: "pagos",
    canActivate: [CanActivateService],
    loadChildren: () =>
      import("./pages/pagos/pagos.module").then((m) => m.PagosPageModule),
  },
  {
    path: "estadisticas",
    canActivate: [CanActivateService],
    loadChildren: () =>
      import("./pages/estadisticas/estadisticas.module").then(
        (m) => m.EstadisticasPageModule,
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
