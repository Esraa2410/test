export interface ILogin {
    email: string;
    password: string;
}

export interface IForgetPassword {
    email: string;
}


export interface IVerfiy {
    email: string;
    code:string;
}

export interface IResetPassword {
    email: string;
    password: string;
    confirmPassword: string;
    seed:string;
}

export interface IRegister {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    profileImage: string;
    password: string;
    confirmPassword: string;
}

export interface IChangePassword {
    oldPassword:string;
    newPassword: string;
    confirmNewPassword: string;
}