export interface ShoppingCartItem {
    bookId: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    author: string;
    genre: string;
    yearOfRelease: number;
    numberOfPages: number;
    quantity: number;
}

export interface ShoppingCart {
    id: number;
    customerId: string;
    items: ShoppingCartItem[];
}