import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastsService } from "../toasts.service";

@Injectable({
    providedIn: "root",
})
export class CanLoadGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private toastService: ToastsService
    ) {}

    async canActivate() {
        if (await this.authService.isLogged()) {
            return true;
        } else {
            this.router
                .navigate(["login"])
                .then((res) => {
                    this.toastService.errorToast("Inicia sesión.");
                    return false;
                })
                .catch((e) =>
                    this.toastService.errorToast("Ocurrió un error.")
                );
        }
    }
}
