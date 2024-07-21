import { Injectable } from '@angular/core';
import { Endpoint } from '../endpoint';
import { HttpOptions } from './globales/httpOptions';
import { Banners } from '../models/Banners';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleErrorService } from './globales/handle-error.service';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BannersService {
    private UrlRestS = Endpoint.UrlRest + '/banners';
    private UrlRest = Endpoint.UrlRest + '/banner';
    private Url = Endpoint.UrlRest;

    httpOptions = HttpOptions.httpOptions;
    private banners: Banners[] = null;

    bannerSubject = new Subject<Banners>();
    banner: Banners;

    constructor(private http: HttpClient, private he: HandleErrorService) {}

    public obsBanner(): Observable<Banners> {
        return this.bannerSubject.asObservable();
    }

    public passBanner(banner: Banners): void {
        // this.banner = banner;
        return this.bannerSubject.next(banner);
    }

    public returnBanner(): void {
        return this.bannerSubject.next(this.banner);
    }

    public get(id: number): Observable<Banners> {
        return this.http
            .get<Banners>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Banners;
                }),
                catchError(this.he.handleError),
            );
    }

    public getAll(refresh?: boolean): Observable<Banners[]> {
        return this.http
            .get<Banners[]>(`${this.UrlRestS}`, this.httpOptions)
            .pipe(
                tap((res) => {
                    this.banners = res as Banners[];
                }),
                map((res) => {
                    return res as Banners[];
                }),
                catchError(this.he.handleError),
            );
    }

    public post(banner: Banners): Observable<Banners> {
        return this.http
            .post<Banners>(`${this.UrlRestS}`, banner, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Banners;
                }),
                catchError(this.he.handleError),
            );
    }

    public update(banner: Banners): Observable<Banners> {
        return this.http
            .put<Banners>(
                `${this.UrlRest}/${banner.id}`,
                banner,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Banners;
                }),
                catchError(this.he.handleError),
            );
    }

    public delete(id: number): Observable<Banners> {
        return this.http
            .delete<Banners>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Banners;
                }),
                catchError(this.he.handleError),
            );
    }

    //  ====================================================================================
    public getActivos(id: number): Observable<Banners[]> {
        return this.http
            .get<Banners[]>(`${this.UrlRestS}/activos`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Banners[];
                }),
                catchError(this.he.handleError),
            );
    }

    public onUpload(fd: FormData): Observable<any> {
        return this.http
            .post(`${this.Url}/files/banners`, fd, {
                reportProgress: true,
                observe: 'events',
            })
            .pipe(catchError(this.he.handleError));
    }
}
