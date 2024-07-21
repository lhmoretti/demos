import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Usuarios } from 'src/app/models/Usuarios';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
    showSide: Subscription;
    showDescrip = true;
    comSubs: Subscription;
    isLogged$: Observable<boolean>;
    public usuario: Usuarios;
    urlActive: string;

    constructor(
        public auth: AuthService,
        private _showSide: SidebarService,
        private router: Router,
    ) {
        this.router.events.subscribe((e: any) => {
            if (e.url != 'undefined' && e.url != undefined) {
                this.urlActive = e.url;
            }
        });

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

        this.isLogged$ = this.auth.returnAsObs().pipe(
            map((val) => {
                console.log('side', val);
                return val;
            }),
        );
    }

    ngOnInit() {
        this.openNav();
    }

    ngAfterViewInit() {
        this.showSide = this._showSide
            .observerShowSide()
            .subscribe((show: boolean) => {
                if (show) {
                    this.openNav();
                } else {
                    this.closeNav();
                }
            });
    }

    ngOnDestroy(): void {
        this.comSubs.unsubscribe();
        this.showSide.unsubscribe();
    }

    openNav() {
        this.showDescrip = true;
        document.getElementById('mySidenav').style.width = '200px';
        document.getElementById('main').style.marginLeft = '200px';
    }

    closeNav() {
        this.showDescrip = false;
        document.getElementById('mySidenav').style.width = '40px';
        document.getElementById('main').style.marginLeft = '40px';
    }
}
