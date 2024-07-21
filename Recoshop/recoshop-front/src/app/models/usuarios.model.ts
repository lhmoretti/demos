export interface Usuario {
    id?: number;
    username?: string;
    password?: string;
    nombre?: string;
    apellido?: string;
    avatar?: string;
    telefono?: string;
    localidad?: string;
    domicilio?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
    role?: number;
    activo?: boolean;
}
