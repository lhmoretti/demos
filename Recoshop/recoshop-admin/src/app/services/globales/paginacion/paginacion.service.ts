import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaginacionService {
    private resetSubjet = new Subject<number>();
    private sizeSub = new Subject<number>();
    private btnNext = new Subject<boolean>();

    constructor() {}

    // =======================================
    public returnBtn(): Observable<boolean> {
        return this.btnNext.asObservable();
    }

    public setBlockBtn(state: boolean) {
        return this.btnNext.next(state);
    }

    // =======================================
    public returnPagNro(): Observable<number> {
        return this.resetSubjet.asObservable();
    }

    public setPag(nro: number) {
        return this.resetSubjet.next(nro);
    }

    // =======================================
    public returnPagSize(): Observable<number> {
        return this.sizeSub.asObservable();
    }

    public setSize(size: number) {
        return this.sizeSub.next(size);
    }
}
