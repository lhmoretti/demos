import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { environment } from "src/environments/environment";

import { registerLocaleData } from "@angular/common";
import localeEsAr from "@angular/common/locales/es-AR";
registerLocaleData(localeEsAr, "es-Ar");

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
//Native storage
import { IonicStorageModule } from "@ionic/storage-angular";

//HttpClient
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { InterceptorService } from "./services/interceptor.service";
const config: SocketIoConfig = { url: `${environment.urlWs}`, options: {} };

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        SocketIoModule.forRoot(config),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: LOCALE_ID, useValue: "es-Ar" },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
