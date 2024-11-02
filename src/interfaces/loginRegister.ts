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
    name: string;
    password: string;
}

export interface IDecodedToken {
    given_name: string;
    exp: string;
}