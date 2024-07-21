import { Component, OnInit, ViewChild, AfterContentInit } from "@angular/core";
// import { Observable } from 'rxjs';
import { Prestamos } from "src/app/models/prestamos";
import { PrestamosService } from "src/app/services/prestamos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PaginacionService } from "src/app/services/globales/paginacion/paginacion.service";
import { ToastsService } from "src/app/services/toasts.service";
// import { tap } from 'rxjs/operators';
// import { DoubleTapDirective } from 'src/app/directives/double-tap.directive';

@Component({
  selector: "app-prestamos",
  templateUrl: "./prestamos.page.html",
  styleUrls: ["./prestamos.page.scss"],
})
export class PrestamosPage implements OnInit, AfterContentInit {
  // @ViewChild(DoubleTapDirective) doubleTapable: DoubleTapDirective;
  prestamos: Prestamos[] = [];
  clienteId: number;

  size: number = 10;
  nro: number = 0;
  estado: string = "Todos";
  order: string = "fecha_hora";
  ad: string = "DESC"; // asc. y desc.

  constructor(
    private _prestamos: PrestamosService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _pag: PaginacionService,
    private _toast: ToastsService,
  ) {}

  ngOnInit() {}

  ngAfterContentInit() {
    // How can i call functionFromDirective()?
    // this.doubleTapDir.onTap()
  }

  getAll() {
    this._prestamos.getAll().subscribe(
      (data: Prestamos[]) => {
        this.prestamos = data;
        console.log("prestamos", data);
      },
      (err) => {
        console.log("Error: ", err);
      },
    );
  }

  getByIdCliente() {
    this._prestamos.getByIdCliente(this.clienteId).subscribe(
      (data: Prestamos[]) => {
        console.log("getByIdCliente", data);
        this.prestamos = data;
      },
      (err) => {
        console.log("Error: ", err);
      },
    );
  }

  edit(c: Prestamos) {
    this._router.navigate(["form-prestamos"]).then(() => {
      // this.showForm = true;
      // this._prestamos.
    });
  }

  pageChanged(event: { pageNro: number; pageSize: number }) {
    this.nro = event.pageNro;
    this.size = event.pageSize;
    this.getPag();
  }

  reset(event: any) {
    // reseteamos el nro de paginado
    console.log("event", event);
    this._pag.setPag(0);
    this.getPag();
  }

  verPrestamo(prestamoId: number) {
    this._router.navigate(["prestamos/detalles/", prestamoId]);
  }

  getPag() {
    this.clienteId = parseInt(this._actRoute.snapshot.paramMap.get("id"));

    if (this.clienteId) {
      console.log("Obteniendo x id cliente:", this.clienteId);
      this.getByIdCliente();
    } else {
      console.log("Obteniendo paginado");
      this.prestamos = [];
      this._prestamos
        .getPaginated(this.size, this.nro, this.estado, this.order, this.ad)
        .subscribe(
          (data: Prestamos[]) => {
            if (data.length === 0) {
              this._pag.setBlockBtn(true);
            } else {
              this._pag.setBlockBtn(false);
              this.prestamos = data;
            }
          },
          (err) => {
            console.log(err);
          },
        );
    }
  }

  async delete(p) {
    const tit: string = "¡Eliminar préstamo!";
    const msg: string = "¿Estás seguro?";
    let alert = await this._toast.deleteToast(tit, msg);

    alert.present();
    alert.onDidDismiss().then((res) => {
      if (res.role === "cancel") return;
      else if (res.role === "backdrop")
        // hace click fuera del modal
        return;
      else
        this._prestamos
          .delete(p.id)
          .toPromise()
          .then((data: any) => {
            console.log("data", data);

            this._toast.successToast("Eliminado con éxito");
            this.getPag();
          })
          .catch((err) => {
            console.log(err);
            this._toast.errorToast(err);
          });
    });
  }
}
