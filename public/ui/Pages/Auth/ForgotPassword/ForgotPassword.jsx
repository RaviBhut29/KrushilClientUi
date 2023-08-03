import React from 'react'
import { Form, Label, Input, FormGroup, Button, FormFeedback } from 'reactstrap';
import AuthLayout from '../../../Components/AuthLayout/AuthLayout'
import './forgotPassword.scss'
import logosmall from '../../../Images/logo-small.svg';
import { Controller, useForm } from 'react-hook-form';
import Back from '../../../Components/BackBtn/Back';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD } from './ForgotPasswordMutation';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';
import { FormatError } from '../../../Components/Common/FormatError';


const ForgotPassword = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, register, formState: { errors }, } = useForm({});

    const [forgotPasswordMutation] = useMutation(FORGOT_PASSWORD)

    const onLogin = (data) => {
        forgotPasswordMutation({
            variables: {
                email: data?.email,
            }
        }).then((response) => {
            response?.data?.forgotPassword && notification.success({
                message: `We sent you email reset your password`,
                placement: "top",
            });
        }).catch((error) => {
            notification?.error({ message: FormatError(error), placement: "top" })
        })
    }
    return (<AuthLayout>
        <div className="forgot-pass" key={Math.random(6)}>
            <div className="header d-flex align-items-center">
                <Back onClick={() => navigate("/login")} />
                <img src={logosmall} alt="logo" />
            </div>
            <div className="description">
                <h2>Forgot Password? 🔐</h2>
                <p>No Worries, we'll send you reset instructions.</p>
            </div>
            <div className="form">
                <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onLogin)}>
                    <FormGroup className='fg-email'>
                        <Label className="form-label"> Email <span style={{ color: 'red' }}>*</span> </Label>
                        <Controller
                            name="email"
                            control={control}
                            render={({
                                field,
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState,
                            }) => {
                                return (
                                    <Input
                                        id='email'
                                        type='text'
                                        placeholder="john@email.com"
                                        {...register("email", {
                                            required: true,
                                        })}
                                        invalid={errors?.email && true}
                                        {...field}
                                    />
                                );
                            }}
                        />
                        {errors && errors?.email && (
                            <FormFeedback>Please enter a valid email address!</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Button color='primary' className='w-100 btn login-btn' type="submit"> Confirm </Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    </AuthLayout>
    )
}

export default ForgotPassword