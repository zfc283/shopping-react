type AddressListType = Array<{
    id: string; 
    name: string; 
    phone: string; 
    address: string;
    isDefault: boolean;
}>


export type ResponseType = {
    success: boolean;
    data: AddressListType
}

export type DeleteAddressResponseType = {
    success: boolean;
}