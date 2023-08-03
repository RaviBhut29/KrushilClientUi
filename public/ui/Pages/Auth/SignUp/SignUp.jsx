import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row, UncontrolledTooltip } from 'reactstrap';
import AuthLayout from '../../../Components/AuthLayout/AuthLayout';
import logosmall from '../../../Images/logo-small.svg';
import googleIcon from '../../../Images/google.svg';
import appleIcon from '../../../Images/apple.svg';
import uploadBtn from '../../../Images/upload.svg';
import deleteBtn from '../../../Images/delete.svg';
import "./SignUp.scss"
import { Plus, Upload } from 'react-feather';
import Select from "react-select";
import { customSearchStyles, customStylesError } from '../../../../configs/conts';
import classNames from 'classnames';
import Back from '../../../Components/BackBtn/Back';
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input'
import { Country, State, City } from 'country-state-city'
import { useMutation } from '@apollo/client';
import { SIGN_UP } from './SignUpMutation';
import { Image, notification } from 'antd';
import { FormatError } from '../../../Components/Common/FormatError';
import SpinnerComponent from "../../../Components/spinner/Fallback-spinner"
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    const navigate = useNavigate()

    const [loader, setLoader] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [value, setValue] = useState()
    const [country, setCountry] = useState()
    const [stateOptions, setStateOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()

    const AllCountries = useMemo(() => { return Country?.getAllCountries() }, [])
    const AllStates = useMemo(() => { return State?.getAllStates() }, [])
    const AllCity = useMemo(() => { return City?.getAllCities() }, [])

    const { control, reset, handleSubmit, register, formState: { errors }, setValue: setFormValue } = useForm({});

    const [signUpMutation] = useMutation(SIGN_UP)

    const onLogin = (data) => {
        setLoader(true)
        const mobile = formatPhoneNumberIntl(value)?.split(" ")
        mobile?.shift()
        signUpMutation({
            variables: {
                input: {
                    city: data?.city?.label,
                    country: country?.name,
                    email: data?.email,
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                    mobile: mobile?.join(""),
                    password: data?.password,
                    state: data?.state?.label,
                }
            }
        }).then((res) => {
            notification.success({
                message: `Verification mail sent, Please check your mail`,
                placement: "top",
            });
            navigate("/check-mail");
            setLoader(false)
        }).catch((err) => {
            notification?.error({ message: FormatError(err), placement: "top" })
            setLoader(false)
        })
    }

    const onFileChange = (file) => {
        setFileName(file?.name)
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setFile(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const onBlurHandler = () => {
        const code = formatPhoneNumberIntl(value)?.split(" ")?.[0]
        const country = AllCountries?.find(d => d?.phonecode === code?.substr(1))
        const states = AllStates?.filter(d => d?.countryCode === country?.isoCode)
        const options = states?.map((d) => {
            return { label: d?.name, value: d }
        })
        setCountry(country)
        setStateOptions(options)
    }

    const onStateChange = (data) => {
        const city = AllCity?.filter(d => d?.stateCode === data?.value?.isoCode && d?.countryCode === data?.value?.countryCode)
        const options = city?.map((d) => {
            return { label: d?.name, value: d }
        })
        setCityOptions(options)
    }

    const removeImage = () => {
        setFile();
        setFileName();
        setFormValue("profilePhoto", "")
    }

    return (
        <>{loader && <SpinnerComponent />}<AuthLayout>
            <div className="form-card-container">

                <div className="SignupForm">
                    <div className="header d-flex justify-content-start">
                        <Back />
                        <img src={logosmall} alt="logo" />
                    </div>
                    <div className="description">
                        <h2>Hey, Welcome 👋</h2>
                        <p>Register to create your first account and start exploring our services.</p>
                    </div>
                    <div className="form">
                        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onLogin)}>
                            <Row className="mt-3 mb-1">
                                <Col>
                                    <FormGroup className='fg-email'>
                                        <Controller
                                            name="profilePhoto"
                                            control={control}
                                            render={({
                                                field: { onChange, ...rest },
                                                fieldState: { invalid, isTouched, isDirty, error },
                                                formState,
                                            }) => {
                                                return (
                                                    <>
                                                        {
                                                            file && fileName
                                                                ?
                                                                <div className='d-flex align-items-center justify-content-between'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <Image src={file} alt="" className='profile-image' />
                                                                        <div className="mx-1">
                                                                            <p className='mb-0 title-name'>Profile Picture</p>
                                                                            <p className='mb-0 img-name'>{fileName}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex align-items-center'>
                                                                        <UncontrolledTooltip placement='top' target="reupload">
                                                                            Reupload
                                                                        </UncontrolledTooltip>
                                                                        <label className='mx-1' style={{ margin: "unset" }}>
                                                                            <Input
                                                                                type='file'
                                                                                accept='image/*'
                                                                                hidden
                                                                                onChange={(e) => { onFileChange(e?.target?.files[0]); onChange(e) }}
                                                                            />
                                                                            <img src={uploadBtn} alt="" className='cursor-pointer' id="reupload" />
                                                                        </label>
                                                                        <img src={deleteBtn} alt="" className='cursor-pointer' onClick={() => { removeImage() }} />
                                                                    </div>
                                                                </div>
                                                                :
                                                                <label className='btn d-flex justify-content-center align-items-center mr-1 upload-btn' style={{ margin: "unset" }}>
                                                                    <Input
                                                                        type='file'
                                                                        id='fileInput'
                                                                        name='profilePhoto'
                                                                        accept='image/*'
                                                                        hidden
                                                                        {...register("profilePhoto", {
                                                                            required: false,
                                                                        })}
                                                                        onChange={(e) => { onFileChange(e?.target?.files[0]); onChange(e) }}
                                                                        invalid={errors?.profilePhoto && true}
                                                                        {...rest}
                                                                    />
                                                                    <Plus size={16} />Upload your Photo
                                                                </label>
                                                        }
                                                    </>
                                                );
                                            }}
                                        />
                                        {errors && errors?.email && (
                                            <FormFeedback>Please enter a valid email address!</FormFeedback>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col>
                                    <FormGroup className='fg-email'>
                                        <Label className="form-label"> First Name <span style={{ color: 'red' }}>*</span> </Label>
                                        {/* <Input type="email" placeholder="john@email.com" /> */}
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { invalid, isTouched, isDirty, error },
                                                formState,
                                            }) => {
                                                return (
                                                    <Input
                                                        id='firstName'
                                                        type='text'
                                                        placeholder="john"
                                                        {...register("firstName", {
                                                            required: true,
                                                        })}
                                                        invalid={errors?.firstName && true}
                                                        {...field}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors && errors?.firstName && (
                                            <FormFeedback>Please enter firstName</FormFeedback>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className='fg-email'>
                                        <Label className="form-label"> Last Name <span style={{ color: 'red' }}>*</span> </Label>
                                        {/* <Input type="email" placeholder="john@email.com" /> */}
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { invalid, isTouched, isDirty, error },
                                                formState,
                                            }) => {
                                                return (
                                                    <Input
                                                        id='lastName'
                                                        type='text'
                                                        placeholder="doe"
                                                        {...register("lastName", {
                                                            required: true,
                                                        })}
                                                        invalid={errors?.lastName && true}
                                                        {...field}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors && errors?.lastName && (
                                            <FormFeedback>Please enter lastName</FormFeedback>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col>
                                    <FormGroup className='fg-email'>
                                        <Label className="form-label"> Enter email <span style={{ color: 'red' }}>*</span> </Label>
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
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col className="mobile-input">
                                    <FormGroup className='fg-email'>
                                        <Label className="form-label"> Enter number <span style={{ color: 'red' }}>*</span> </Label>
                                        {/* <Input type="email" placeholder="john@email.com" /> */}
                                        <Controller
                                            name="mobile"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { invalid, isTouched, isDirty, error },
                                                formState,
                                            }) => {
                                                return (
                                                    <PhoneInput
                                                        country="US"
                                                        defaultCountry="IN"
                                                        value={value}
                                                        onChange={setValue}
                                                        onBlur={onBlurHandler}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors && errors?.mobile && (
                                            <FormFeedback>Please enter a valid email address!</FormFeedback>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col>
                                    <FormGroup className='fg-email'>
                                        <Label className="form-label"> Select State <span style={{ color: 'red' }}>*</span> </Label>
                                        {/* <Input type="email" placeholder="john@email.com" /> */}
                                        <Controller
                                            name="state"
                                            control={control}
                                            render={({
                                                field: { onChange, ...rest },
                                                fieldState: { invalid, isTouched, isDirty, error },
                                                formState,
                                            }) => {
                                                return (
                                                    <Select
                                                        name="state"
                                                        className='myDropDown'
                                                        options={stateOptions}
                                                        placeholder="... Select"
                                                        {...register("state", {
                                                            required: false,
                                                        })}
                                                        onChange={(e) => { onStateChange(e); onChange(e) }}
                                                        styles={errors?.state ? customStylesError : customSearchStyles}
                                                        {...rest}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors && errors?.state && (
                                            <FormFeedback>Please enter state</FormFeedback>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className='fg-email'>
                                        <Label className="form-label"> Select city <span style={{ color: 'red' }}>*</span> </Label>
                                        {/* <Input type="email" placeholder="john@email.com" /> */}
                                        <Controller
                                            name="city"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { invalid, isTouched, isDirty, error },
                                                formState,
                                            }) => {
                                                return (
                                                    <Select
                                                        name="city"
                                                        className='myDropDown'
                                                        options={cityOptions}
                                                        placeholder="... Select"
                                                        {...register("city", {
                                                            required: false,
                                                        })}
                                                        styles={errors?.city ? customStylesError : customSearchStyles}
                                                        {...field}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors && errors?.city && (
                                            <FormFeedback>Please enter city</FormFeedback>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col>
                                    <FormGroup >
                                        <Label for="examplePassword">Enter password <span style={{ color: 'red' }}>*</span></Label>
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
                                            <span style={{ marginTop: "0.5rem" }} className={classNames('viewPassword', { "mx-4": errors?.password })} onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? "Hide" : "Show"}</span>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col>
                                    <FormGroup check className='d-flex justify-content-between align-items-center'>
                                        <Label check className='bolder'> <Input type="checkbox" /> Remember Me </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col>
                                    <FormGroup>
                                        <Button color='primary' className='w-100 btn signup-btn' type="submit"> Signup </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className='orOption'> ----- OR ----- </div>
                    <div className="otherLoginOptions">
                        <div className="option"> <img src={googleIcon} alt="googleLogo" /> <span>Google</span></div>
                        <div className="option"> <img src={appleIcon} alt="appleLogo" /> <span>Apple ID</span></div>
                    </div>
                </div>
            </div>
        </AuthLayout></>
    )
}

export default SignUp