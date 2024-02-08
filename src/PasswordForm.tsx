import React from "react";
import { useState } from "react";
import {
    IPasswordFormData,
    IPasswordFormProps,
    IValidators
}
    from "./interfaces";


/** PasswordForm: checks whether a password is valid password.
 *
 *  Props:
 *  - initialFormData
 *  - handleSave
 *
 *  State:
 *  - formData
 *  - validators
 *
 *  App -> PasswordForm
 */

const initialFormData: IPasswordFormData = {
    newPw: "",
    confirmNewPw: ""
};

const initialFormValidators: IValidators = {
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasAtLeast8Chars: false
}

function PasswordForm({ handleSave }
    : IPasswordFormProps) {

    const [formData, setFormData] = useState<IPasswordFormData>(
        initialFormData
    );

    const [validators, setValidators] = useState<IValidators>(
        initialFormValidators
    );

    console.log('PasswordForm formData: ', formData);
    console.log('PasswordForm validators: ', validators);

    /** Update form input */
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const input = evt.target;
        setFormData((fData: any) => ({
            ...fData,
            [input.name]: input.value,
        }));

        // check individually if lowercase letter, uppercase letter, number in
        // password. Also checks if there are at least 8 chars in password.
        if (input.name === "newPw") {
            setValidators({
                hasLowercase: /[a-z]/.test(input.value),
                hasUppercase: /[A-Z]/.test(input.value),
                hasNumber: /[0-9]/.test(input.value),
                hasAtLeast8Chars: /^\w{8,72}$/.test(input.value)
            });
        }
    }

    /** Call parent function and clear form */
    function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        handleSave(formData);
        setFormData(initialFormData);
        setValidators(initialFormValidators)
    }

    // attribution for regex pattern for password:
    // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const regex_pw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h1 className="card-title text-center">
                                Welcome back CARL!
                            </h1>
                            <h6>Your username is CARLMOLINA42</h6>
                            <form
                                className="PasswordForm-form"
                                onSubmit={handleSubmit}
                            >
                                <div className="form-group mt-5 mb-5">
                                    <h6>Create a new password.</h6>
                                    <h6>
                                        Make sure it does not match your prior
                                        passwords.
                                    </h6>
                                </div>
                                <div className="form-group mb-5">
                                    <label htmlFor="newPw">
                                        Enter new password *
                                    </label>
                                    <input
                                        // type="password"
                                        type="text"
                                        className="form-control mb-2"
                                        id="newPw"
                                        name="newPw"
                                        onChange={handleChange}
                                        value={formData.newPw}
                                        required
                                        pattern={regex_pw.source}
                                    // Setting regex pattern here for
                                    // form validation in addition to state
                                    />
                                    {validators.hasAtLeast8Chars ? (
                                        <h6>
                                        ✅ Password must be 8-72 characters long
                                        </h6>
                                    ) : (
                                        <h6>
                                        ❌ Password must be 8-72 characters long
                                        </h6>
                                    )}
                                    {validators.hasNumber ? (
                                        <h6>✅ Include a number</h6>
                                    ) : (
                                        <h6>❌ Include a number</h6>
                                    )}
                                    {validators.hasLowercase ? (
                                        <h6>✅ Include a lowercase letter</h6>
                                    ) : (
                                        <h6>❌ Include a lowercase letter</h6>
                                    )}
                                    {validators.hasUppercase ? (
                                        <h6>✅ Include an uppercase letter</h6>
                                    ) : (
                                        <h6>❌ Include an uppercase letter</h6>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmNewPw">
                                        Confirm password *
                                    </label>
                                    <input
                                        // type="password"
                                        type="text"
                                        className="form-control mb-2"
                                        id="confirmNewPw"
                                        name="confirmNewPw"
                                        onChange={handleChange}
                                        value={formData.confirmNewPw}
                                        required
                                    />
                                    {formData.newPw === formData.confirmNewPw
                                        && formData.confirmNewPw.length > 0 ? (
                                        <h6>✅ Password must match</h6>
                                    ) : (
                                        <h6>❌ Password must match</h6>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-5">
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordForm;
