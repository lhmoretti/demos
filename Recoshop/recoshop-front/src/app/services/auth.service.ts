import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertsService } from './alerts.service';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Usuario } from '../models/usuarios.model';
import { UsuariosService } from './usuarios.service';
import * as jwt_decode from 'jwt-decode';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    User: Usuario = {};
    isLog = false;
    Token: any;

    private subjUser = new Subject<any>();

    constructor(
        private _http: HttpClient,
        private alertService: AlertsService,
        private router: Router,
    ) {
        this.getLocal();
    }

    returnUser(): Observable<any> {
        return this.subjUser.asObservable();
    }

    getUser() {
        // console.log(this.isLog);
        this.subjUser.next({
            usuario: this.User,
            isLogged: this.isLog,
        });
    }

    login(user) {
        return new Promise((resolve, reject) => {
            this._http.post(`${URL}/login`, user).subscribe(
                async (data: any) => {
                    this.Token = await data.token;
                    const userDecoded = await jwt_decode(this.Token);
                    this.User = await userDecoded;
                    // console.log(userDecoded);
                    localStorage.setItem('rs-token', this.Token);
                    localStorage.setItem(
                        'rs-user',
                        JSON.stringify(userDecoded),
                    );
                    this.isLog = true;
                    this.getUser();
                    resolve(true);
                },
                (err) => {
                    reject(err);
                },
            );
        });
    }

    logout() {
        localStorage.removeItem('rs-user');
        this.User = {};
        this.isLog = false;
        this.router.navigate(['inicio']).then((data) => location.reload());
        this.getUser();
    }

    isLogged(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (Object.keys(this.User).length != 0) {
                // console.log('Hay user');
                this.isLog = true;
                // console.log(this.isLog);
                resolve(this.isLog);
            } else {
                this.isLog = false;
                // console.log(this.isLog);
                resolve(this.isLog);
            }
        });
    }

    getLocal() {
        const usrLocal = localStorage.getItem('rs-user');
        // console.log(usrLocal);
        if (usrLocal != undefined) {
            this.User = JSON.parse(localStorage.getItem('rs-user'));
            if (this.User != null) {
                this.isLog = true;
            } else {
                this.isLog = false;
            }
            this.getUser();
        }
    }
}
