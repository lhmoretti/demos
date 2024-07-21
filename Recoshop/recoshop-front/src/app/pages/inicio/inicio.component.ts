import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OwlCarouselOptions } from 'src/app/components/owl-carousel';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { BannerService } from 'src/app/services/banner.service';
import { async } from '@angular/core/testing';
import { NgIf } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ComercioComponent } from '../comercio/comercio.component';
import { ComercioService } from 'src/app/services/comercio.service';
import { Comercio } from 'src/app/models/comercio.model';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
    tituloDest = 'Destacado';
    tituloProm = 'Ofertas';
    tituloInicio = 'Novedades';

    sliderBanners: OwlOptions = OwlCarouselOptions.sliderBanners;
    sliderSimples: OwlOptions = OwlCarouselOptions.sliderSimples;
    sliderBannerStatic: OwlOptions = OwlCarouselOptions.staticImgBanner;
    sliderProds: OwlOptions = OwlCarouselOptions.carouselProdsOpts;
    sliderComercios: OwlOptions = OwlCarouselOptions.carroucelComerciosLogos;

    arrBannersPrincipales: any[] = [];
    arrBannersDobles: any[] = [];
    arrDestacados: Producto[] = [];
    arrPromocion: Producto[] = [];
    arrInicio: Producto[] = [];
    arrCategoria: Categoria[] = [];
    arrComercios: Comercio[] = [];

    constructor(
        private prod_service: ProductosService,
        private categoriaService: CategoriaService,
        private bannerService: BannerService,
        private comercioService: ComercioService,
        private meta: Meta,
        private title: Title,
    ) {
        const tags: any[] = [];

        tags.push({
            name: 'description',
            content:
                'Tienda online marketplace, publicá tus productos y generá fidelidad con tus clientes. Plataforma pensada para pequeños y grandes comercios.',
        });
        tags.push({
            name: 'keywords',
            content:
                'recoshop, your-domain.com.ar, Recoshop, ecommmerce, tienda, online, vidriera, virtual, pagina, web, vender, internet, comprar, reconquista, avellaneda, barbijos, productos',
        });
        tags.push({
            name: 'author',
            content: 'Ecommerce - Ecommerce Performance',
        });
        tags.push({ name: 'copyright', content: 'Ecommerce' });

        this.meta.addTags(tags);
    }

    ngOnInit(): void {
        this.gets();
    }

    gets() {
        this.obtenerDestacado();
        this.obtenerCategoria();
        this.obtenerPromocion();
        this.obtenerBanners();
        this.obtenerInicio();
        this.obtenerComercios();
    }

    obtenerDestacado() {
        this.prod_service.getDestacadosGeneral().subscribe(
            (data: Producto[]) => {
                this.arrDestacados = data;
                const tags: any[] = [];

                for (const i of this.arrDestacados) {
                    tags.push({ name: i.nombre, content: i.descripcion });
                }

                this.meta.addTags(tags);
                // this.title.setTitle('Recoshop desde setTitle')
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }

    obtenerBanners() {
        this.bannerService.getBanner().subscribe(
            async (data: any) => {
                // console.log(data);
                for (const i of data) {
                    if (i.descrip == 'doble') {
                        //  console.log(i);
                        this.arrBannersDobles.push(i);
                    } else if (i.descrip == 'principal') {
                        //  console.log(i);
                        this.arrBannersPrincipales.push(i);
                    }
                }
            },
            (err) => {
                console.log('Error: ', err);
            },
        );
    }

    obtenerPromocion() {
        this.prod_service.getPromocionGeneral().subscribe(
            (data: Producto[]) => {
                this.arrPromocion = data;
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }

    obtenerComercios() {
        this.comercioService.getComerciosHabilitados().subscribe(
            (data: Producto[]) => {
                this.arrComercios = data;
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }

    obtenerInicio() {
        this.prod_service.getInicio().subscribe(
            (data: Producto[]) => {
                this.arrInicio = data;
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }

    obtenerCategoria() {
        this.categoriaService.getCategoriasActivas().subscribe(
            (data: Producto[]) => {
                this.arrCategoria = data;
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }
}
