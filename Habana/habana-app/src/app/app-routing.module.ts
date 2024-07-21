import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { CanActivateService } from "./services/auth/can-activate.service";

const routes: Routes = [
    {
        path: "main",
        loadChildren: () =>
            import("./pages/main/main.module").then((m) => m.MainPageModule),
        canActivate: [CanActivateService],
    },
    {
        path: "login",
        loadChildren: () =>
            import("./pages/login/login.module").then((m) => m.LoginPageModule),
    },
    { path: "", pathMatch: "full", redirectTo: "login" },
    { path: "**", pathMatch: "full", redirectTo: "login" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules,
            // relativeLinkResolution: "",
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
