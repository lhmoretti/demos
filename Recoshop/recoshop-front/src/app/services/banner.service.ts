import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class BannerService {
    constructor(private _http: HttpClient) {}

    getBanner() {
        return this._http.get(`${URL}/banners/activos`);
    }
}
