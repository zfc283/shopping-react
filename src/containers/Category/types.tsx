export type TagType = {
    id: string;
    name: string;
}

export type CategoryType = {
    id: string;
    name: string;
}

export type TagsType = Array<TagType>

export type CategoriesType = Array<CategoryType>


export type CategoryAndTagResponseType = {
    success: boolean;
    data: {
        category: CategoriesType;
        tag: TagsType;
    }
}


export type RequestDataType = {
    url: string;
    method: string;
    params: {
        keyword: string;
        category: CategoryType;
        tag: TagType;
    }
}


export type CategorySearchListResponseType = {
    success: boolean;
    data: Array<{
        catId: string;
        id: string;
        imgUrl: string;
        title: string;
        price: number;
        sales: number;
    }>
}

export type CartProductInfoType = {
    catId: string;
    productId: string;
    imgUrl: string;
    title: string;
    price: number;
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


