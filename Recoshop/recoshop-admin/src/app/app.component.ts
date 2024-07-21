import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    isLogged$: Observable<boolean>;

    constructor(private auth: AuthService, private router: Router) {
        this.isLogged$ = this.auth.returnAsObs().pipe(
            map((val) => {
                if (val) {
                    router.navigate(['dashboard']);
                }
                return val;
            }),
        );
    }

    ngOnInit(): void {}
}
