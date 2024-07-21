import { OwlOptions } from 'ngx-owl-carousel-o';

export class OwlCarouselOptions {
    public static sliderSimples: OwlOptions = {
        autoplay: false,
        dots: false,
        loop: false,
        margin: 20,
        nav: false,
        pullDrag: false,
        freeDrag: false,
        autoWidth: true,
        autoHeight: true,
        touchDrag: false,
        navText: ['', ''],
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 2,
            },
            740: {
                items: 2,
            },
            940: {
                items: 2,
            },
        },
    };

    public static sliderBanners: OwlOptions = {
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        mouseDrag: true,
        freeDrag: true,
        nav: true,
        navText: ['<', '>'],
        dots: false,
        responsive: {
            0: { items: 1 },
            400: { items: 1 },
            740: { items: 1 },
            940: { items: 1 },
        },
    };

    public static carouselProdsOpts: OwlOptions = {
        autoplay: true,
        dots: false,
        loop: true,
        nav: false,
        skip_validateItems: true,
        navText: ['<', '>'],
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 2,
            },
            740: {
                items: 3,
            },
            940: {
                items: 5,
            },
        },
    };

    public static staticImgBanner: OwlOptions = {
        autoplay: false,
        dots: false,
        loop: false,
        nav: false,
        autoWidth: true,
        skip_validateItems: true,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            740: {
                items: 1,
            },
            940: {
                items: 1,
            },
        },
    };

    public static carouselOptsRelacionados: OwlOptions = {
        autoplay: true,
        dots: false,
        loop: true,
        nav: false,

        autoWidth: true,
        skip_validateItems: true,
        navText: ['<', '>'],
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 2,
            },
            740: {
                items: 3,
            },
            940: {
                items: 4,
            },
        },
    };

    public static carouselImgsProducto: OwlOptions = {
        autoplay: false,
        dots: false,
        loop: false,
        nav: false,

        autoWidth: true,
        skip_validateItems: true,
        navText: ['<', '>'],
        responsive: {
            0: {
                items: 5,
            },
            400: {
                items: 5,
            },
            740: {
                items: 5,
            },
            940: {
                items: 5,
            },
        },
    };

    public static carroucelComerciosLogos: OwlOptions = {
        autoplay: true,
        dots: false,
        loop: true,
        nav: false,
        autoWidth: true,
        margin: 15,
        skip_validateItems: true,
        navText: ['<', '>'],
        responsive: {
            0: {
                items: 3,
            },
            400: {
                items: 4,
            },
            740: {
                items: 7,
            },
            940: {
                items: 7,
            },
        },
    };
}
