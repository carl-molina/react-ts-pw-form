import React from "react";

import { test, afterEach, describe, expect, vi } from "vitest";
import { render, fireEvent, screen } from '@testing-library/react';
import PasswordForm from "./PasswordForm.js";
import { IPasswordFormData } from "./interfaces.js";

const handleSave = vi.fn();


afterEach(function () {
    vi.restoreAllMocks();
});


describe("PasswordForm smoke test", function () {
    test('renders without crashing', function () {
        render(<PasswordForm handleSave={handleSave} />);
    });
});


describe("PasswordForm renders correct data", function () {
    test('contains expected text', function () {
        const res = render(<PasswordForm handleSave={handleSave} />);
        expect(res.queryByText('Welcome back CARL!')).toBeInTheDocument();
        expect(res.queryByText('❌ Include a number')).toBeInTheDocument();
        expect(res.queryByText('❌ Password must match')).toBeInTheDocument();
    });

    test('button attribute set to disabled on initial render', function () {
        const { container } = render(<PasswordForm handleSave={handleSave} />);
        const btn = container.querySelector('button')!;
        expect(btn.getAttribute('disabled')).toBeDefined();
        expect(btn).toBeDisabled();
    });
});


describe("PasswordForm valid inputting and submitting", function () {
    test('returns valid form changes and handleSave called',
        async function () {
            const { container } = render(
                <PasswordForm handleSave={handleSave} />
            );

            const submitBtn = container.querySelector("button")!;
            const newPwInput = container.querySelector(
                `input[name="newPw"]`) as HTMLInputElement;
            const confirmPwInput = container.querySelector(
                `input[name="confirmNewPw"]`) as HTMLInputElement;

            expect(submitBtn).toContainHTML("Reset Password");
            expect(newPwInput).toHaveValue("");

            fireEvent.change(newPwInput, { target: { value: "ABC123abc" } });

            expect(newPwInput).toHaveValue("ABC123abc");
            expect(confirmPwInput).toHaveValue("");

            fireEvent.change(
                confirmPwInput,
                {
                    target: {
                        value: "ABC123abc"
                    }
                }
            );

            expect(confirmPwInput).toHaveValue("ABC123abc");

            fireEvent.click(submitBtn);

            expect(handleSave).toHaveBeenCalledTimes(1);
        });

    test('returns valid form changes and form submit',
        async function () {
            const { container } = render(
                <PasswordForm handleSave={checkSubmit} />
            );

            function checkSubmit(formData: IPasswordFormData): void {
                expect(formData.newPw).toEqual("ABC123abc");
                expect(formData.confirmNewPw).toEqual("ABC123abc");
            }

            const submitBtn = container.querySelector("button")!;
            const newPwInput = container.querySelector(
                `input[name="newPw"]`) as HTMLInputElement;

            expect(newPwInput).toHaveValue("");

            fireEvent.change(newPwInput, { target: { value: "ABC123abc" } });
            const confirmPw = container.querySelector(
                `input[name="confirmNewPw"]`) as HTMLInputElement;

            expect(confirmPw).toHaveValue("");

            fireEvent.change(confirmPw, { target: { value: "ABC123abc" } });
            fireEvent.click(submitBtn);
        });
});


describe("PasswordForm invalid inputs", function () {
    test("input does not meet 1 uppercase letter password requirement",
        async function () {
            render(<PasswordForm handleSave={handleSave} />);

            const submitBtn = screen.getByRole(
                'button',
                {
                    name: 'Reset Password'
                }
            );

            const newPwInput = screen.getByRole(
                'textbox',
                {
                    name: 'Enter new password *'
                }
            );

            expect(submitBtn).toBeDisabled();
            expect(newPwInput).toHaveValue("");

            fireEvent.change(newPwInput, { target: { value: "abc123test" } });
            await screen.findByText('❌ Include an uppercase letter');
            expect(submitBtn).toBeDisabled();
        });
    test("input does not meet 1 lowercase letter password requirement",
        async function () {
            render(<PasswordForm handleSave={handleSave} />);

            const submitBtn = screen.getByRole(
                'button',
                {
                    name: 'Reset Password'
                }
            );

            const newPwInput = screen.getByRole(
                'textbox',
                {
                    name: 'Enter new password *'
                }
            );

            expect(submitBtn).toBeDisabled();
            expect(newPwInput).toHaveValue("");

            fireEvent.change(newPwInput, { target: { value: "ABC123TEST" } });
            await screen.findByText('❌ Include a lowercase letter');
            expect(submitBtn).toBeDisabled();
        });
    test("input does not meet 1 number password requirement",
        async function () {
            render(<PasswordForm handleSave={handleSave} />);

            const submitBtn = screen.getByRole(
                'button',
                {
                    name: 'Reset Password'
                }
            );

            const newPwInput = screen.getByRole(
                'textbox',
                {
                    name: 'Enter new password *'
                }
            );

            expect(submitBtn).toBeDisabled();
            expect(newPwInput).toHaveValue("");

            fireEvent.change(newPwInput, { target: { value: "ABCdefGHI" } });
            await screen.findByText('❌ Include a number');
            expect(submitBtn).toBeDisabled();
        });
    test("newPw does not match confirmNewPw", async function () {
        render(<PasswordForm handleSave={handleSave} />);

        const submitBtn = screen.getByRole(
            'button',
            {
                name: 'Reset Password'
            }
        );
        const newPwInput = screen.getByRole(
            'textbox',
            {
                name: 'Enter new password *'
            }
        );
        const confirmPwInput = screen.getByRole(
            'textbox',
            {
                name: 'Confirm password *'
            }
        );

        expect(submitBtn).toBeDisabled();
        expect(newPwInput).toHaveValue("");
        expect(confirmPwInput).toHaveValue("");

        fireEvent.change(newPwInput, { target: { value: "ABC123abc" } });
        fireEvent.change(confirmPwInput, { target: { value: "ABC123test" } });
        await screen.findByText('❌ Password must match');
        expect(submitBtn).toBeDisabled();
    });
});


describe("PasswordForm snapshot test", function () {
    test('matches snapshot', function () {
        const { container } = render(<PasswordForm handleSave={handleSave} />);
        expect(container).toMatchSnapshot();
    });
});
