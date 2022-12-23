import { ItensDto } from "./itens";

export interface CartDto{
    userId: string,
    itens: ItensDto[]
}