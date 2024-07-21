import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
    pagina = 0;
    subscriptDisabled: Subscription;
    loading = false;
    disable = false;
    constructor(private paginacion: PaginationService) {}

    ngOnInit(): void {
        this.subscriptDisabled = this.paginacion
            .returnDisable()
            .subscribe((data) => {
                // console.log(data);

                this.disable = data.disabled;
            });

        this.paginacion.getDisabled();
    }

    siguiente() {
        if (!this.disable) {
            this.pagina += 1;
            this.paginacion.addPage(this.pagina);
        }
    }

    anterior() {
        if (this.pagina > 0) {
            this.pagina -= 1;
        }
        if (this.loading == true) {
            return null;
        }
        this.paginacion.addPage(this.pagina);
    }
}
