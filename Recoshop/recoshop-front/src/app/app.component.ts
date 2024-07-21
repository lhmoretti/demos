import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'Recoshop';
    showHeaderMobile = false;

    ngOnInit() {
        if (window.innerWidth < 1000) {
            this.showHeaderMobile = true;
        } else {
            this.showHeaderMobile = false;
        }
    }

    onActivate(event) {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 900); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    }
}
