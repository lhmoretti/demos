import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { CardGridComponent } from './card-grid/card-grid.component';
import { CardSwiperComponent } from './card-swiper/card-swiper.component';
import { SliderComponent } from './slider/slider.component';
import { SliderCategoriasComponent } from './slider-categorias/slider-categorias.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RecPasswordComponent } from './rec-password/rec-password.component';
import { SliderComerciosComponent } from './slider-comercios/slider-comercios.component';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        CarouselModule,
        BrowserAnimationsModule,
        FormsModule,
    ],
    exports: [
        CardGridComponent,
        CardSwiperComponent,
        SliderComponent,
        SliderCategoriasComponent,
        PaginationComponent,
        SliderComerciosComponent,
        RecPasswordComponent,
        BrowserModule,
        AppRoutingModule,
        CarouselModule,
    ],
    declarations: [
        CardGridComponent,
        CardSwiperComponent,
        SliderComponent,
        SliderCategoriasComponent,
        PaginationComponent,
        RecPasswordComponent,
        SliderComerciosComponent,
    ],
    providers: [],
})
export class ComponentsModule {}
