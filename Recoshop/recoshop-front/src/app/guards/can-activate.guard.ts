import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertsService } from '../services/alerts.service';

@Injectable({
    providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private alertService: AlertsService,
        private router: Router,
    ) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) {
        const resp = await this.authService.isLogged();
        console.log(resp);

        if (resp) {
            return true;
        } else {
            this.router.navigate(['login']).then((val) => {
                this.alertService.toastAlert(
                    'Porfavor, inicia sesión o regístrate.',
                    '',
                );
                return false;
            });
        }
    }
}
