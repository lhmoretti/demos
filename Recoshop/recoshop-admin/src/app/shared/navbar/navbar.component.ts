import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Usuarios } from 'src/app/models/Usuarios';
import { map } from 'rxjs/operators';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    side = true;
    comSubs: Subscription;
    isLogged$: Observable<boolean>;
    usuario: Usuarios;

    constructor(public auth: AuthService, public _side: SidebarService) {
        this.comSubs = this.auth.getUser().subscribe(
            (user: Usuarios) => {
                if (user == null) {
                    return;
                }
                this.usuario = user;
            },
            (err) => {
                console.log('Error', err);
            },
        );

        this._side.setShowSide(true);
    }

    ngOnInit() {
        this.isLogged$ = this.auth.returnAsObs().pipe(
            map((val) => {
                console.log('app', val);
                return val;
            }),
        );
    }

    ngOnDestroy(): void {
        this.comSubs.unsubscribe();
    }

    setSide() {
        if (this.side) {
            this._side.setShowSide(false);
            this.side = false;
        } else {
            this._side.setShowSide(true);
            this.side = true;
        }
    }
}
