export interface userContents {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface productContents {
    id: string;
    title: string;
}

export interface subProductContents {
    id: string;
    title: string;
    quantity: number;
    price: number;
    category?: string;
    imageUrl: string;
    productId: string;
}