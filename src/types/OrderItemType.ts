export type OrderItemType = {
    items: SubOrderItemType[];
    total: number;
    descount: number;
    delivery: number;
    userUID: string;
    status: number;
    ref: string
}

export type SubOrderItemType = {
    quantity: number;
    price: number;
    title: string;
    productRef: string;
    category: string
}