type ProductType = {
    catId: string;
    productId: string;
    imgUrl: string;
    weight: string;
    title: string;
    price: number;
    count: number;
    ordered: boolean;
}

export type StoreType = {
    shopId: string;
    shopName: string;
    cartList: Array<ProductType>
}


export type ResponseType = {
    success: boolean;
    data: Array<StoreType>;
}


export type CartProductType = {
    shopId: string;
    catId: string;
    productId: string;
}


export type CartSubmitArray = Array<{
    storeId: string;
    catId: string;
    productId: string;
    count: number;
}>

export type SubmitResponseType = {
    success: boolean;
    data: {
        orderId: string;
    }
}

type CartUpdateSuccessType = {
    success: boolean;
}

type CartUpdateErrorType = {
    success: boolean;
    data: any
}

export type deleteResponseType = {
    success: boolean;
}

export type CartUpdateResponseType = CartUpdateSuccessType | CartUpdateErrorType;