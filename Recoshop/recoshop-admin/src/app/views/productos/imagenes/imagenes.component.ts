import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-imagenes',
    templateUrl: './imagenes.component.html',
    styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
    progreso = '';
    selectedFile: File = null;
    nombreFoto = '';

    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    // funciones carga de archivos
    onFileSelected(event) {
        this.selectedFile = event.target.files[0] as File;
        this.nombreFoto = this.selectedFile.name;
    }

    onUpload() {
        const fd = new FormData();

        fd.append('file', this.selectedFile, this.selectedFile.name);

        this.http
            .post(`http://localhost:3000/api/v1/files/40`, fd, {
                reportProgress: true,
                observe: 'events',
            })
            .subscribe((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    console.log(
                        'Progreso:' +
                            Math.round((event.loaded / event.total) * 100) +
                            '%',
                    );
                    this.progreso =
                        Math.round((event.loaded / event.total) * 100) + '%';

                    if (this.progreso == '100%') {
                        console.log('Agregado con éxito!');
                    }
                } else if (event.type === HttpEventType.Response) {
                    console.log(event);
                }
            });
    }
}
