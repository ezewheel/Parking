export interface ILogin {
    username: string;
    password: string;
}

export interface ILoginRes {
    status: string;
    msg: string;
    token?: string;
}

export interface IRegister {
    username: string;
    fullName: string;
    password: string;
}

export interface IDecodedToken {
    name: string;
    role: string;
}