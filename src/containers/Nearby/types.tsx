export type ResponseType = {
    success: boolean;
    data: Array<{
        id: string;
        name: string;
        phone: string;
        address: string;
        latitude: string;
        longitude: string;
        distance: string;
    }>
}

