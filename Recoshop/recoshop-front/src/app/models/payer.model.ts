export interface Payer {
    name?: string;
    surname?: string;
    email?: string;
    date_created?: Date;
    phone?: Phone;
    identification?: Identification;
    address?: Address;
}

export interface Address {
    street_name?: string;
    street_number?: string;
    zip_code?: string;
}

export interface Identification {
    type?: string;
    number?: string;
}

export interface Phone {
    area_code?: string;
    number?: number;
}
