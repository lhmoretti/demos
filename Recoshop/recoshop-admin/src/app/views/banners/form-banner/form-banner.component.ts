import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ObservableLike, Observable, Subscription } from 'rxjs';
import { Banners } from 'src/app/models/Banners';
import { BannersService } from 'src/app/services/banners.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertasService } from 'src/app/services/globales/alertas.service';

@Component({
    selector: 'app-form-banner',
    templateUrl: './form-banner.component.html',
    styleUrls: ['./form-banner.component.css'],
})
export class FormBannerComponent implements OnInit {
    // titulo: string = '';
    // descrip: string = '';

    progreso = '';
    selectedFile: File = null;

    banner: Banners;
    banSubs: Subscription;

    constructor(
        private _ban: BannersService,
        private _router: Router,
        private _auth: AuthService,
        private _alert: AlertasService,
    ) {
        this.banSubs = _ban
            .obsBanner()
            .subscribe((ban: Banners) => (this.banner = ban));
    }

    ngOnInit(): void {}

    update() {
        this._ban.update(this.banner).subscribe(
            (data: Banners) => {
                this._alert.toastSuccess('Actualizado con éxito', '');
                // this.get(data.id)
                this.volver();
            },
            (err) => {
                this._alert.toastError('Ocurrió un error', 'Error');
                console.log(err);
            },
        );
    }

    get(id: number) {
        this._ban.get(id).subscribe(
            (data: Banners) => {
                this.banner = data;
            },
            (err) => {
                this._alert.toastError('Ocurrió un error', 'Error');
                console.log(err);
            },
        );
    }

    volver() {
        this._router.navigate(['banners']);
    }

    resetDatosImg() {
        this.progreso = '';
        this.banner.titulo = null;
        this.banner.descrip = null;
        this.banner.link = null;
    }

    onFileSelected(event) {
        this.selectedFile = event.target.files[0] as File;
        this.onUpload();
    }

    async onUpload() {
        if (this.banner.titulo == '' || this.banner.titulo == null) {
            return this._alert.toastError('Complete el título del banner', '');
        }
        if (this.banner.descrip == '' || this.banner.descrip == null) {
            return this._alert.toastError(
                'Complete la descripción del banner',
                '',
            );
        }

        const fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name);
        fd.append('titulo', this.banner.titulo);
        fd.append('descrip', this.banner.descrip);
        fd.append('link', this.banner.link);

        // let token: string = await this._auth.returnToken();
        // console.log('await this._auth.returnToken();', await this._auth.returnToken());

        this._ban.onUpload(fd).subscribe(
            (event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    // seguimiento del progreso
                    console.log(
                        'Progreso:' +
                            Math.round((event.loaded / event.total) * 100) +
                            '%',
                    );
                    this.progreso =
                        'Progreso:' +
                        Math.round((event.loaded / event.total) * 100) +
                        '%';
                } else if (event.type === HttpEventType.Response) {
                    console.log(event);
                    if (event.status == 200) {
                        this._alert.toastSuccess(
                            '¡Banner agregado con éxito!',
                            '',
                        );
                        this.resetDatosImg();
                        this.volver();
                    }
                }
            },
            (err) => {
                this._alert.toastError('Intente nuevamente', 'Error');
                console.log(err);
            },
        );
    }
}
