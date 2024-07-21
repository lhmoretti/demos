import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    LoginForm = this.fb.group({
        password: ['', Validators.required],
        // username: ['',],
        email: [''],
    });

    logSubs: Subscription;
    isLogged$: Observable<boolean>;

    showRecPass = false;
    showUser = true;
    showEmail = true;

    constructor(
        private fb: FormBuilder,
        public auth: AuthService,
        private router: Router,
    ) {
        this.isLogged$ = this.auth.returnAsObs().pipe(
            map((val) => {
                console.log('login', val);
                if (val) {
                    console.log('Logueado!');
                    this.router.navigate(['/dashboard']);
                }
                return val;
            }),
        );
    }

    ngOnInit() {
        // this.auth.isLoggedIn();
    }

    public login(): void {
        this.auth.login(this.LoginForm.value);
    }

    ngOnDestroy(): void {
        // this.logSubs.unsubscribe();
    }
}
