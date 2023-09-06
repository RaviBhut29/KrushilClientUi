import React, { useState } from 'react'
import './ResetPassword.scss';
import logosmall from '../../../Images/logo-small.svg';
import AuthLayout from '../../../Components/AuthLayout/AuthLayout';
import { Form, Label, Input, FormGroup, Button, FormFeedback } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import Back from '../../../Components/BackBtn/Back';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from './ResetPasswordMutation';
import { notification } from 'antd';

const ResetPassword = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const tempArray = id?.split("_")

    const [showPassword, setShowPassword] = useState(false)
    const [showconfPassword, setshowconfPassword] = useState(false)

    const { control, reset, handleSubmit, register, formState: { errors }, } = useForm({});

    const [resetPasswordMutaion] = useMutation(RESET_PASSWORD)

    const onLogin = (data) => {
        console.log("🚀 ~ file: Login.jsx:17 ~ onLogin ~ data", data)
        if (data?.password === data?.confPassword) {
            resetPasswordMutaion({
                variables: {
                    resetPasswordId: tempArray[0],
                    code: tempArray[1],
                    password: data?.password,
                }
            }).then((response) => {
                if (response?.data?.resetPassword) {
                    notification.success({
                        message: `Password reset successfully`,
                        placement: "top",
                    });
                    navigate("/reset-success");
                } else {
                    notification?.error({ message: "something wrong ...", placement: "top" })
                }
            })
        } else {
            notification?.error({ message: "Please enter same password", placement: "top" })
        }
    }

    return <AuthLayout>
        <div className="ResetForm" key={Math.random(6)}>
            <div className="header d-flex align-items-center">
                <Back onClick={() => navigate("/login")} /><img src={logosmall} alt="logo" /></div>
            <div className="description">
                <h2>Reset Password ↺</h2>
                <p>Your new password must be different to previously used passwords.</p>
            </div>
            <div className="form">
                <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onLogin)}>
                    <FormGroup >
                        <Label >Password <span style={{ color: 'red' }}>*</span></Label>
                        <div className='position-relative d-flex'>
                            <div className="w-100">
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => {
                                        return (
                                            <Input
                                                id='password'
                                                type={showPassword ? "text" : "password"}
                                                placeholder="****"
                                                {...register("password", {
                                                    required: true,
                                                })}
                                                invalid={errors?.password && true}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                {errors && errors?.password && (
                                    <FormFeedback>Please enter password</FormFeedback>
                                )}
                            </div>
                            <span className={classNames('viewPassword', { "mx-4": errors?.password })} onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? "Hide" : "Show"}</span>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <Label >Confirm Password <span style={{ color: 'red' }}>*</span></Label>
                        <div className='position-relative d-flex'>
                            <div className="w-100">
                                <Controller
                                    name="confPassword"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => {
                                        return (
                                            <Input
                                                id='confPassword'
                                                type={showconfPassword ? "text" : "password"}
                                                placeholder="****"
                                                {...register("confPassword", {
                                                    required: true,
                                                })}
                                                invalid={errors?.confPassword && true}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                {errors && errors?.confPassword && (
                                    <FormFeedback>Please enter Confirm password</FormFeedback>
                                )}
                            </div>
                            <span className={classNames('viewPassword', { "mx-4": errors?.confPassword })} onClick={() => { setshowconfPassword(!showconfPassword) }}>{showconfPassword ? "Hide" : "Show"}</span>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Button color='primary' className='w-100 btn login-btn' type="submit"> Reset Password </Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    </AuthLayout>
}

export default ResetPassword