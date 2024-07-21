// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // Development
    urlRest: "http://localhost:3001",
    urlWs: "http://localhost:3001",

    // Production V1
    // urlRest: "http://your-domain.com.ar/api/v1",
    // urlWs: "http://your-domain.com.ar:8080",

    // Production V2
    // urlRest: "http://your-domain.com.ar/api/v2",
    // urlWs: "http://your-domain.com.ar:3001",

    // your-domain server test app
    // urlRest: "https://your-domain.com.ar/api-habana/api/v2",
    // urlWs: "https://your-domain.com.ar",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
