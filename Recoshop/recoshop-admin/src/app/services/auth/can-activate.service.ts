import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { AlertasService } from '../globales/alertas.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CanActivateService {
    constructor(
        private router: Router,
        private auth: AuthService,
        private alert: AlertasService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.auth.isLoggedIn()) {
            console.log('No logueado!');
            this.router.navigate(['login']);
            return false;
        } else {
            console.log('Logueado!');
            return true;
        }
    }
}
