interface itensCompraDto{
    productId: string,
    amount: number,
    unitValue: number
}

export interface CartDto{
    id: string,
    userId: string,
    // unitValue: number,
    itens: itensCompraDto[]
}