import React from "react";
import { useState } from "react";
import { IPasswordFormData } from "./interfaces";


/** PasswordForm: checks whether a password is valid password.
 *
 *  Props:
 *  - none
 *
 *  State:
 *  - formData
 *  - errs
 *
 *  App -> PasswordForm
 */

interface IPasswordFormProps {
    initialFormData?: IPasswordFormData;
    handleSave: (formData: IPasswordFormData) => void;
}

const defaultInitialFormData: IPasswordFormData = {newPw: "", confirmNewPw: ""};

function PasswordForm({ initialFormData = defaultInitialFormData, handleSave }
        : IPasswordFormProps) {

    const [formData, setFormData] = useState(initialFormData);
    const [errs, setErrs] = useState([]);

    /** Update form input */
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const input = evt.target;
        setFormData((fData: any) => ({
            ...fData,
            [input.name]: input.value,
        }));
    }


    /** Call parent function and clear form */
    function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        handleSave(formData);
        setFormData(initialFormData);
    }


    return (
        <form>
            <div className="PasswordForm-header">
                <h1>Welcome back CARL!</h1>
                <p>Your username is CARLMOLINA42</p>
                <br/>
                <p>Create a new password.</p>
                <p>Make sure it does not match your prior passwords.</p>
            </div>
            <div className="PasswordForm-newPw">
                <label htmlFor="PasswordForm-newPw">New Password: </label>
                <input
                    type="password"
                    id="PasswordForm-newPw"
                    name="newPw"
                    placeholder="new password"
                    onChange={handleChange}
                    value={formData.newPw}
                    required
                />
            </div>
            <div className="PasswordForm-confirmNewPw">
                <label htmlFor="PasswordForm-confirmNewPw">Confirm New Password: </label>
                <input
                    type="password"
                    id="PasswordForm-confirmNewPw"
                    name="confirmNewPw"
                    placeholder="new password"
                    onChange={handleChange}
                    value={formData.confirmNewPw}
                    required
                />
            </div>

            <button className="PasswordForm-btn">SUBMIT NEW CHANGES</button>

        </form>
    )


}












// older code for reference:

// type State = {
//     text: string;
// };

// class PasswordForm extends React.Component<Props, State> {
//     state = {
//         text: "",
//     };

//     onChange = (e: React.FormEvent<HTMLInputElement>): void => {
//         this.setState({ text: e.currentTarget.value });
//     };

//     render() {
//         return (
//             <div>
//                 <input type="text" value={this.state.text} onChange={this.onChange} />
//             </div>
//         )
//     }
// }


// oldest code for reference:

// function PasswordForm() {
//     const [formData, setFormData] = useState("");
//     const [errs, setErrs] = useState([]);



//     return (
//         <>

//         </>
//     )
// }


export default PasswordForm;