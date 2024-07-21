import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Clientes } from "src/app/models/clientes";
import { ClientesService } from "src/app/services/clientes.service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-cliente",
  templateUrl: "./form-cliente.page.html",
  styleUrls: ["./form-cliente.page.scss"],
})
export class FormClientePage implements OnInit {
  cliente$: Observable<Clientes>;

  constructor(
    private _clientes: ClientesService,
    private _router: Router,
  ) {
    this.cliente$ = this._clientes.obsUser().pipe(
      map((c: Clientes) => {
        return c;
      }),
    );
  }

  ngOnInit() {}

  regresar() {
    this._router
      .navigate(["clientes"])
      .then(() => this._clientes.refreshPag(true));
  }

  send(c: Clientes) {
    c.id === null ? this.post(c) : this.update(c);
  }

  post(c: Clientes) {
    this._clientes
      .post(c)
      .toPromise()
      .then((res) => {
        this.regresar();
      })
      .catch((err) => console.log(err));
  }

  update(c: Clientes) {
    this._clientes
      .update(c)
      .toPromise()
      .then((res) => {
        this.regresar();
      })
      .catch((err) => console.log(err));
  }
}
