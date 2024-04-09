export type CategoryAndTagResponseType = {
    success: boolean;
    data: {
        category: Array<{
            id: string;
            name: string;
        }>;
        tag: Array<string>;
    }
}

export type CategoriesType = Array<{
    id: string;
    name: string;
}>

export type TagsType = Array<string>

export type RequestDataType = {
    url: string;
    method: string;
    params: {
        keyword: string;
        category: string;
        tag: string;
    }
}

export type ProductType = {
    id: string;
    imgUrl: string;
    title: string;
    price: number;
    sales: number;
}

export type CategorySearchListResponseType = {
    success: boolean;
    data: Array<ProductType>
}