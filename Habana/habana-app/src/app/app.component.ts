import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { AuthService } from "./services/auth/auth.service";
import { Subscription } from "rxjs";
import { Storage } from "@ionic/storage-angular";
//import { Socket } from 'ngx-socket-io';
import { Empleados } from "./models/Empleados.model";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { Router } from "@angular/router";
import { ToastsService } from "./services/toasts.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public logged: boolean = false;
    Usuario: Empleados = {};
    public appPages = [
        {
            title: "Empleados",
            url: "/main/empleados",
            icon: "person-circle",
            user1: "ADMIN",
        },
        {
            title: "Mesas",
            url: "/main/mesas",
            icon: "people-circle",
            user1: "ADMIN",
        },
        {
            title: "Todos los pedidos",
            url: "/main/pedidos-todos",
            icon: "book",
            user1: "ADMIN",
            user2: "MOZO",
            user3: "COCINERO",
        },
        {
            title: "Administrar pedidos",
            url: "/main/adm-pedidos",
            icon: "construct",
            user1: "ADMIN",
        },
        {
            title: "Generar pedido",
            url: "/main/gen-pedido",
            icon: "clipboard",
            user1: "ADMIN",
            user2: "MOZO",
        },
        {
            title: "Comidas",
            url: "/main/productos",
            icon: "pizza",
            user1: "ADMIN",
        },
    ];

    userSubscription: Subscription;

    constructor(
        private router: Router,
        private toastService: ToastsService,
        private platform: Platform,
        public authService: AuthService,
        private storage: Storage // private sockets: Socket
    ) {
        this.initializeApp();
    }

    async initializeApp() {
        // const { SplashScreen, StatusBar } = Plugins;
        await this.storage.create();

        try {
            await SplashScreen.hide();
            await StatusBar.setStyle({ style: Style.Dark });
            if (this.platform.is("android")) {
                StatusBar.setBackgroundColor({ color: "#CDCDCD" });
            }
        } catch (err) {
            console.log("This is normal in a browser", err);
        }
    }

    async ngOnInit() {
        this.userSubscription = this.authService.returnUser().subscribe({
            next: (data) => {
                this.Usuario = data.usuario || {};
                this.logged = data.isLogged;
            },
            error: (err) => {
                console.log("err", err);
            },
        });

        this.authService.getUser();
        let resp: boolean = await this.authService.isLogged();

        if (resp) {
            return true;
        } else {
            this.router.navigate(["/login"]);
        }
    }

    async ionViewWillEnter() {}
}
