export class CarouselOptions {
    public static prodOptions: any = {
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        slideTransition: 'fade',
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: true,
        dots: false,
        navSpeed: 1000,
        autoHeight: true,
        // transitionStyle: "fade",
        navText: ['<', '>'],
        responsive: {
            0: { items: 1 },
            400: { items: 1 },
            740: { items: 1 },
            940: { items: 1 },
        },
        nav: true,
    };

    public static artCelOptions: any = {
        loop: true,
        autoplay: false,
        autoplaySpeed: 2000,
        autoplayHoverPause: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: true,
        dots: false,
        center: true,
        margin: -100,
        autoWidth: true,
        navText: ['<', '>'],
        nav: true,
        navSpeed: 2000,
        responsive: {
            0: { items: 1 },
            400: { items: 1 },
            740: { items: 1 },
            940: { items: 1 },
        },
    };
}
