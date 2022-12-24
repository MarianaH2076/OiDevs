interface ItensCompraDto{
    productId: string,
    amount: number,
    unitValue: number
}

export interface Cart{
    id: string,
    userId: String,
    itens: ItensCompraDto[]
}