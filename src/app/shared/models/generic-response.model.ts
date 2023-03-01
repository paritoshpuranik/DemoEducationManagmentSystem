export interface IApiResponseObj <T = any> {
    data: string;
    response: T;
}

export interface ISendDataObj <T = any> {
    type?: string;
    items: T;
}

export interface IDateObj {
    day: number;
    month: number;
    year: number;
}

