export type LoginResponseType = {
    success: boolean;
    data: {
        token: string;
    }
}

export type RegisterResponseType = {
    success: boolean,
    data: boolean
}