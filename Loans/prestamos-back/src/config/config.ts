import * as dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

export class Config {
    separator: string = '---------------------------\n';
    private readonly env: NodeJS.ProcessEnv = process.env;

    constructor() {}

    private getValue(key: string, throwOnMissing = true): string | any {
        const value = this.env[key];

        if (!value && throwOnMissing)
            throw new Error(`${this.separator} Missing .env VALUE: \n${key}\n`);

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }

    get nodeEnv(): string {
        return this.env.NODE_ENV;
    }

    get privateKey(): string {
        return this.env.PRIVATE_KEY;
    }

    get port(): string {
        return this.env.PORT;
    }

    get jwtSecret() {
        return this.env.JWT_SECRET;
    }

    get jwtExp(): number {
        return parseInt(this.env.JWT_EXP, 0);
    }

    get jwtInnactivityExp(): number {
        return parseInt(this.env.JWT_INNACTIVITY_EXP, 0);
    }

    get connectMongo(): boolean {
        return this.env.CONNECT_MONGO === 'true' ? true : false;
    }

    get databasePrefix(): string {
        return this.env.DB_PREFIX || '';
    }

    get mailApiKey(): string {
        return this.env.MAIL_API_KEY;
    }

    get mailFrom(): string {
        return this.env.MAIL_FROM;
    }
}

new Config().ensureValues([
    'PRIVATE_KEY',
    'PORT',
    'NODE_ENV',
    'BACKUPS_DIR',
    'CONNECT_MONGO',

    'JWT_SECRET',
    'JWT_EXP',
    'JWT_INNACTIVITY_EXP',

    'SQL_NAME_CONNECTION',
    'SQL_HOST',
    'SQL_PORT',
    'SQL_USERNAME',
    'SQL_PASSWORD',
    'SQL_DATABASE',

    'MONGO_HOST',
    'MONGO_PORT',
    'MONGO_DATABASE',
    'MONGO_USERNAME',
    'MONGO_PASSWORD',

    'AWS_BUCKET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',

    'MAIL_API_KEY',
    'MAIL_FROM',
]);
