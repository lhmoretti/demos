import { NgModule, Injectable } from "@angular/core";
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// PIPE ESPAÑOL
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeEsAr from "@angular/common/locales/es-AR";
// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsAr, "es-Ar");

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptorService } from "./services/auth-interceptor.service";

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    press: { time: 500 }, // default: 251 ms
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    {
      provide: LOCALE_ID,
      useValue: "es-Ar",
    },
    {
      provide: { RouteReuseStrategy },
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
