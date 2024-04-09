export type ResponseType = {
    success: boolean;
    data: {
        name: string;
        phone: string;
        address: string;
        isDefault: boolean;
    }
}

type EditAddressSuccessResponse = {
    success: boolean;
}

type EditAddressErrorResponse = any;


export type EditAddressResponseType = EditAddressSuccessResponse | EditAddressErrorResponse;

/* export type EditAddressResponseType = {
    success: boolean;
} */