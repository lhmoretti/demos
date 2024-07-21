import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastsService } from "../toasts.service";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CanActivateService {
  constructor(
    private router: Router,
    private auth: AuthService,
    private _toast: ToastsService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isLoggedIn()) {
      this._toast.errorToast("No logueado!");
      this.router.navigate(["login"]);
      return false;
    } else {
      // this._toast.successToast('Logueado!');
      return true;
    }
  }
}
