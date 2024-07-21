import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastsService } from "../services/toasts.service";
import { NgForm, Validators, FormBuilder } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  LoginForm = this.fb.group({
    password: ["", Validators.required],
    username: ["", Validators.required],
    // email: ['',],
  });

  logSubs: Subscription;
  isLogged$: Observable<boolean>;

  showRecPass: boolean = false;
  showUser: boolean = true;
  showEmail: boolean = true;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
  ) {
    this.isLogged$ = this.auth.returnAsObs().pipe(
      map((val) => {
        console.log("login", val);
        if (val) {
          console.log("Logueado!");
          this.router.navigate(["/dashboard"]);
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
