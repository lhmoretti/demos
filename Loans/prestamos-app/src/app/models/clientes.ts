export class Clientes {
  id: number;
  nombre: string;
  apellido: string;
  localidad: string;
  telefono: string;
  domicilio: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export class ClientesJson {
  public static ClientesJson: Clientes = {
    id: null,
    nombre: null,
    apellido: null,
    localidad: null,
    telefono: null,
    domicilio: null,
    email: null,
    created_at: null,
    updated_at: null,
  };
}
