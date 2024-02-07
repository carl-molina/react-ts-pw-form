interface IPasswordFormData {
    newPw: string;
    confirmNewPw: string;
}

interface IPasswordFormProps {
    initialFormData?: IPasswordFormData;
    handleSave: (formData: IPasswordFormData) => void;
}

interface IUserData {
    password: string;
}

interface IValidators {
    hasLowercase: boolean,
    hasUppercase: boolean,
    hasNumber: boolean,
    hasAtLeast8Chars: boolean,
}


export type { IPasswordFormData, IPasswordFormProps, IUserData, IValidators };