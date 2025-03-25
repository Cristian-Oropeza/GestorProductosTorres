export interface Domicilio {
    calle?: string;
    numero_interior?: string;
    numero_exterior?: string;
    colonia?: string;
    codigo_postal?: string;
    ciudad?: string;
  }
  
  export interface Proveedor {
    nombre_proveedor: string;
    telefono?: string[];
    pagina_web?: string;
    correo?: string;
    domicilio?: Domicilio;
  }
  