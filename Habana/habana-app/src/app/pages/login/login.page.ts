import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastsService } from "src/app/services/toasts.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
    UserLogin: any = {
        username: "",
        password: "",
    };

    constructor(
        private router: Router,
        private toastService: ToastsService,
        private authService: AuthService
    ) {}

    async ngOnInit() {
        // this.UserLogin = {};
        let resp: boolean = await this.authService.isLogged();
        console.log("resp", resp);

        if (resp) {
            this.router
                .navigate(["main"])
                .then((res) => {
                    return this.toastService.errorToast("Estás logueado");
                })
                .catch((e) => console.log("e", e));
        } else {
            this.router.navigate(["/login"]);
        }
    }

    async ionViewWillEnter() {}

    login(form: NgForm) {
        if (form.invalid) {
            this.toastService.errorToast(
                "¡El email o la contraseña no son correctos!"
            );
            return;
        }

        this.authService.login(this.UserLogin);
        // this.UserLogin = {};
    }
}
