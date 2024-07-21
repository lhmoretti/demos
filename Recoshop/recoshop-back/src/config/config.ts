export class Config {
    constructor() {}

    // Puertos
    public port(): any {
        let puerto: any = process.env.PORT || 3010;
        return puerto;
    }

    // Entornos
    public env() {
        let env: any = process.env.NODE_ENV || 'DEV';
        return env;
    }

    // Vencimiento token
    public caducidadToken() {
        return (process.env.CADUCIDAD_TOKEN = '1h');
        //     process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30; // seg, min, dia mes
    }
}
