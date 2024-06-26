export interface Book {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    author: string;
    genre: string;
    yearOfRelease: string;
    numberOfPages: string;
}

export interface BookParameters {
    orderBy: string;
    search?: string;
    genres: string[];
    author: string;
    pageNumber: number;
    pageSize: number;
}