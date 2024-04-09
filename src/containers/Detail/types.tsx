export type ResponseType = {
    success: boolean;
    data: {
        id: string;
        cat_id: string;
        imgUrl: string;
        title: string;
        subtitle: string;
        price: number;
        sales: number;
        origin: string;
        specification: string;
        detail: string;
    };
}

export type CartResponseType = {
    success: boolean;
    data: {
        totalCount: number;
        productCount: number;
    };
}

export type CartChangeResponseType = {
    success: boolean;
    data: boolean;
}