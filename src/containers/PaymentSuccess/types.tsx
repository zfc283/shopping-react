export type OrderSubmitResponseType = {
    success: boolean;
    data: boolean;
}

export type ResponseDataType = {
    address: {
        id: string;
        name: string;
        phone: string;
        address: string;
    },
    time: string;
    total: number;
    shop: Array<{
        shopId: string;
        shopName: string;
        cartList: Array<{
            productId: string;
            imgUrl: string;
            weight: string;
            title: string;
            price: number;
            count: number;
        }>
    }>
}

export type ResponseType = {
    success: boolean;
    data: ResponseDataType
}

export type AddressResponseType = {
    success: boolean;
    data: Array<{
        id: string;
        name: string;
        phone: string;
        address: string;
    }>
}
