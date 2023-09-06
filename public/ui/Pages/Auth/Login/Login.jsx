import React, { useEffect, useState } from 'react'
import './Login.scss';
import logosmall from '../../../Images/logo-small.svg';
import googleIcon from '../../../Images/google.svg';
import appleIcon from '../../../Images/apple.svg';
import AuthLayout from '../../../Components/AuthLayout/AuthLayout';
import { Form, Label, Input, FormGroup, Button, FormFeedback } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useMutation } from '@apollo/client';
import { LOGIN } from './LoginMutation';
import { notification } from 'antd';
import { useCookies } from 'react-cookie';
import { FormatError } from '../../../Components/Common/FormatError';
import SpinnerComponent from './../../../Components/spinner/Fallback-spinner';

const Login = ({ user, refetch }) => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    const [loader, setLoader] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [IsEmailValid, setIsEmailValid] = useState(true)
    //**-------------------For Remember me--------------------- */
    const [cookies, setCookie] = useCookies(["Remember"]);

    const { control, reset, handleSubmit, register, formState: { errors }, setValue } = useForm({});

    const [signInMutation] = useMutation(LOGIN)

    useEffect(() => {
        if (cookies?.Remember) {
            setValue("email", cookies?.Remember?.email)
        }
    }, [cookies])

    const onLogin = (data) => {
        setLoader(true)
        sessionStorage.clear();
        sessionStorage.clear();

        const CookiesData = {
            email: data?.email.trim(),
        };
        signInMutation({
            variables: {
                email: data?.email,
                password: data?.password,
            }
        }).then(async (response) => {
            if (response.data.signIn) {
                if (rememberMe) {
                    setCookie("Remember", JSON.stringify(CookiesData))
                }
                sessionStorage.setItem("token", response.data.signIn.token);
                sessionStorage.setItem("user", JSON.stringify(response?.data?.signIn?.user))
                sessionStorage.setItem("role", JSON.stringify(response.data.signIn.user?.roleId));
                setLoader(false)
                refetch();
                if (response.data.signIn.user?.roleId?.roleName == "superAdmin") {
                    navigate("/admin-services");
                } else {
                    navigate("/");
                }
                notification.success({
                    message: `Logged in successfully`,
                    placement: "top",
                });
            }
        }).catch((error) => {
            notification?.error({ message: FormatError(error), placement: "top" })
            setLoader(false)
        })
    }

    // const onEmailChange = (e) => {
    //     setIsEmailValid(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/?.test(e));
    // }
    return <>
        {loader && <SpinnerComponent />}
        <AuthLayout>
            <div className="LoginForm" key={Math.random(6)}>
                <div className="header"><img src={logosmall} alt="logo" /></div>
                <div className="description">
                    <h2>Hey, Welcome Back 👋</h2>
                    <p>Login to your account - Enjoy exclusive features.. Not a member yet? <span onClick={() => navigate("/signup")}>SignUp</span></p>
                </div>
                <div className="form">
                    <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onLogin)}>
                        <FormGroup className='fg-email'>
                            <Label className="form-label"> Email <span style={{ color: 'red' }}>*</span> </Label>
                            {/* <Input type="email" placeholder="john@email.com" /> */}
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
                                            type='email'
                                            placeholder="john@email.com"
                                            {...register("email", {
                                                required: true,
                                            })}
                                            // onChange={(e) => {
                                            //     onEmailChange(e?.target?.value);
                                            //     onChange(e?.target?.value)
                                            // }}
                                            invalid={errors?.email || !IsEmailValid && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {((errors && errors?.email) || !IsEmailValid) ? (
                                <FormFeedback>Please enter a valid email address!</FormFeedback>
                            ) : null}
                        </FormGroup>
                        <FormGroup >
                            <Label for="examplePassword">Password <span style={{ color: 'red' }}>*</span></Label>
                            <div className='position-relative d-flex'>
                                {/* <Input type={showPassword ? "text" : "password"} name="password" id="examplePassword" placeholder="****" /> */}
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
                                        <FormFeedback>PLease enter password</FormFeedback>
                                    )}
                                </div>
                                <span className={classNames('viewPassword', { "mx-4": errors?.password })} onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? "Hide" : "Show"}</span>
                            </div>
                        </FormGroup>
                        <FormGroup check className='d-flex justify-content-between align-items-center'>
                            <Label check className='bolder'> <Input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e?.target?.checked)} /> Remember Me </Label>
                            <Link to="/forgot-password" className='link'> Forgot Password? </Link>
                        </FormGroup>
                        <FormGroup>

                            <Button color='primary' className='w-100 btn login-btn' type="submit"> Login </Button>
                        </FormGroup>
                    </Form>
                </div>
                <div className='orOption'> ----- OR ----- </div>
                <div className="otherLoginOptions">
                    <div className="option"> <img src={googleIcon} alt="googleLogo" /> <span>Google</span></div>
                    <div className="option"> <img src={appleIcon} alt="appleLogo" /> <span>Apple ID</span></div>
                </div>
            </div>
        </AuthLayout>
    </>
}

export default Login