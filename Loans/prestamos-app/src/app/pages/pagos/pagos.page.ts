import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Pagos } from "src/app/models/pagos";
import { PaginacionService } from "src/app/services/globales/paginacion/paginacion.service";
import { PagosService } from "src/app/services/pagos.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-pagos",
  templateUrl: "./pagos.page.html",
  styleUrls: ["./pagos.page.scss"],
})
export class PagosPage implements OnInit {
  pagos$: Observable<Pagos[]>;
  size: number = 10;
  nro: number = 0;

  constructor(
    private _pag: PaginacionService,
    private _pagos: PagosService,
  ) {}

  ngOnInit() {}

  pageChanged(event: { pageNro: number; pageSize: number }) {
    this.nro = event.pageNro;
    this.size = event.pageSize;
    this.getPag();
  }

  reset(evt?) {
    // reseteamos el nro de paginado
    this._pag.setPag(0);
    this.getPag();
  }

  getPag() {
    console.log("ejecutando getPag");
    this.pagos$ = this._pagos.getPaginated(this.size, this.nro).pipe(
      tap((data: Pagos[]) => {
        if (data.length === 0) {
          this._pag.setBlockBtn(true);
        } else {
          this._pag.setBlockBtn(false);
        }
      }),
    );
  }
}
