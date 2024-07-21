import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class MailtransaccionalService {
    constructor(private _http: HttpClient) {}

    postMail(body: any) {
        return this._http.post(`${URL}/mailtransaction`, body);
    }
}
