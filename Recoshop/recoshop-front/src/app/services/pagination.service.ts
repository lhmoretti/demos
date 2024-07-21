import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaginationService {
    private subjectPage = new Subject<any>();
    private subjectDisabled = new Subject<any>();

    currentPage = 0;
    disabled = false;

    constructor() {}

    returnDisable(): Observable<any> {
        return this.subjectDisabled.asObservable();
    }

    getPage() {
        this.subjectPage.next({
            pagina: this.currentPage,
        });
    }

    getDisabled() {
        this.subjectDisabled.next({
            disabled: this.disabled,
        });
    }

    returnPage(): Observable<any> {
        return this.subjectPage.asObservable();
    }

    addPage(page: number) {
        this.currentPage = page;

        this.getPage();
    }

    addDisabled(value: boolean) {
        this.disabled = value;
        this.getDisabled();
    }
}
