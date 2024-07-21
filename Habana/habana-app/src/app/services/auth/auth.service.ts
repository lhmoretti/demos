import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ToastsService } from "../toasts.service";
import { Empleados } from "../../models/Empleados.model";
import { Storage } from "@ionic/storage-angular";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import jwt_decode from "jwt-decode";

type TokenType = {
    isLogged: boolean;
    token: string;
    expiresIn: number;
    error?: string;
};

export const TOKEN: string = "_zD";

const urlRest = `${environment.urlRest}/login`;

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private subjUser = new Subject<any>();
    Usuario: Empleados = {};
    isLoggedIn: boolean = false;

    constructor(
        private _http: HttpClient,
        private storage: Storage,
        private router: Router,
        private toastService: ToastsService
    ) {}

    returnUser(): Observable<any> {
        return this.subjUser.asObservable();
    }

    getUser() {
        this.subjUser.next({
            usuario: this.Usuario,
            isLogged: this.isLoggedIn,
        });
    }

    login(user): void {
        this._http.post(`${urlRest}`, user).subscribe({
            next: (data: any) => {
                if (data.error) return this.toastService.errorToast(data.error);

                const decoded: any = jwt_decode(data.token);

                this.storage.set(TOKEN, data.token);
                localStorage.setItem(TOKEN, data.token);
                this.Usuario = decoded;
                this.isLoggedIn = true;
                this.storage
                    .set("user-hab", decoded)
                    .then((res) => {
                        this.router.navigate(["/main/pedidos-todos"]);
                    })
                    .catch((err) =>
                        this.toastService.errorToast(
                            "Ocurrió un error al guardar usuario."
                        )
                    );
            },
            error: (err) => {
                this.toastService.errorToast(
                    "Ocurrió un error. Intente nuevamente."
                );
                console.log("Error", err);
            },
        });
    }

    logout() {
        localStorage.clear();
        this.storage.remove(TOKEN);
        this.storage.remove("user-hab").then((res) => {
            this.router.navigate(["/login"]).then(() => {});
        });
    }

    public async isLogged(token?: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            this.Usuario = (await this.storage.get("user-hab")) || null;
            if (!this.Usuario) return false;

            if (!token) token = (await this.storage.get(TOKEN)) || null;
            if (!token) return false;

            localStorage.setItem(TOKEN, token);
            const date: Date = this.getTokenExpirationDate(token);
            if (date === undefined) return true;

            const decoded: any = jwt_decode(token);
            if (!(date.valueOf() > new Date().valueOf())) {
                this.logout();
                this.Usuario = null;
                this.isLoggedIn = false;
                resolve(this.isLoggedIn);
                return false;
            } else {
                this.Usuario = decoded;
                this.isLoggedIn = true;
                resolve(this.isLoggedIn);
                this.getUser();
                return true;
            }
        });
    }

    getTokenExpirationDate(token: string): Date {
        const decoded: any = jwt_decode(token);
        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
}
