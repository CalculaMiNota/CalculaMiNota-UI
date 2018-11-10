import { Rubro } from "./rubro";

export class Curso {
    id:number;
    nombre: string;
    puntaje: number;
    minimo: number;
    user_id: number;
    rubros: Rubro[];
}
