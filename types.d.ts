 export type UserTypes = {
    _id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    image: string;
    role: string;
    root: boolean;
    competition: string;
    createdAt: number;
    updatedAt: number;
    business_name: string;
    country: string;
}

export type Role = {
    user?: string;
    admin?: string;
    judge?: string;
}

export type PointTypes = {
    _id: number;
    name: string;
    surname: string;
    bizzName: string;
    judge: string;
    country: string;
    comment?: string;
    email: string;
    totalPoints: number;
    checked?: boolean;
}


export type ScoreTypes = {
    _id: number;
    email: string;
    name: string;
    surname: string;
    bizzName: string;
    country: string;
    Average: number;
}

