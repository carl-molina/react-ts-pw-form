export interface IPasswordFormData {
    newPw: string;
    confirmNewPw: string;
}

export interface IPasswordFormProps {
    initialFormData?: IPasswordFormData;
    handleSave: (formData: IPasswordFormData) => void;
}

export interface IUserData {
    password: string;
}