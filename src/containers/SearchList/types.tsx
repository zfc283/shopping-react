export type ResponseType = {
    success: boolean;
    data: Array<{
        id: string;
        cat_id: string;
        imgUrl: string;
        title: string;
        price: number;
        sales: number;
    }>;
}