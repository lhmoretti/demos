import { Injectable } from "@angular/core";
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root",
})
export class CanActivateService {
    constructor(private router: Router, private auth: AuthService) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!(await this.auth.isLogged())) {
            this.router
                .navigate(["login"])
                .then((res) => res)
                .catch((e) => e);
            return false;
        } else {
            return true;
        }
    }
}
