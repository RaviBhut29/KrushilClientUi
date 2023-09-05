import React, { useEffect, useMemo, useState } from 'react'
import "./Profile.scss"
import { Home, Trash2, Upload } from "react-feather"
import { Checkbox, Image } from "antd"
import { Row, Col, FormGroup, Label, Input, FormFeedback, Button } from "reactstrap"
import { Controller, useForm } from 'react-hook-form'
import userDefaultImage from "../../../Images/user-default-image.png"
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input'
import { Country, State, City } from 'country-state-city'
import { customStylesError } from '../../../../configs/conts'
import Select from 'react-select';
import classNames from 'classnames'
import { Link } from 'react-router-dom';

const customSearchStyles = {
    control: (styles) => ({ ...styles, border: "1.14015px solid #6c757d !important", minHeight: "44px" }),
    input: (styles) => ({ ...styles, height: '30px', display: 'flex', alignItems: "center", justifyContent: "center" }),
    indicatorSeparator: (base) => ({
        ...base,
        display: "none",
    }),
};

const Profile = () => {

    const [file, setFile] = useState();
    const [value, setValue] = useState()
    const [country, setCountry] = useState()
    const [stateOptions, setStateOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])
    const [showPassword, setShowPassword] = useState(false)

    const userData = useMemo(() => JSON.parse(localStorage.getItem("user")))
    const AllCountries = useMemo(() => { return Country?.getAllCountries() }, [])
    const AllStates = useMemo(() => { return State?.getAllStates() }, [])
    const AllCity = useMemo(() => { return City?.getAllCities() }, [])

    const { control, watch, register, reset, formState: { errors }, handleSubmit, setValue: setFormValue } = useForm({});

    const removeImage = () => {
        setFile();
        setFormValue("profile", "")
    }

    const onFileChange = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setFile(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const onBlurHandler = (mobile) => {
        const code = formatPhoneNumberIntl((value !== "" && value !== null) ? value : mobile)?.split(" ")?.[0]
        const country = AllCountries?.find(d => d?.phonecode === code?.substr(1))
        const states = AllStates?.filter(d => d?.countryCode === country?.isoCode)
        const options = states?.map((d) => {
            return { label: d?.name, value: d }
        })
        setCountry(country)
        setStateOptions(options)
        return options
    }

    const onStateChange = (data) => {
        const city = AllCity?.filter(d => d?.stateCode === data?.value?.isoCode && d?.countryCode === data?.value?.countryCode)
        const options = city?.map((d) => {
            return { label: d?.name, value: d }
        })
        setCityOptions(options)
        return options
    }

    useEffect(() => {
        if (userData) {
            const country = AllCountries?.find(d => d?.name == userData?.country)
            const state = AllStates?.find(d => d?.countryCode === country?.isoCode && d?.name == userData?.state)

            setValue(`+${country?.phonecode}${userData?.mobile}`)
            onBlurHandler(`+${country?.phonecode}${userData?.mobile}`)
            onStateChange({ value: state })

            reset({
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                email: userData?.email,
                password: userData?.password,
                city: { label: userData?.city, value: userData?.city },
                state: { label: state?.name, value: state }
            })
        }
    }, [])

    const submitHandler = (data) => {
        console.log("🚀 ~ file: Profile.jsx:98 ~ submitHandler ~ data:", data)

    }

    return (
        <div className="profile-section">
            <div className="profile-main-sec">
                <div className='navigation-bar d-flex align-items-center'>
                    <Home size={16} /> <Link to="/" className="text-decoration-none d-flex" style={{ color: "#212529" }}><span className="fw-bold"><u>Home</u></span></Link> <span style={{ color: '#6C757D' }}>/ Profile</span>
                </div>
                <div className='profile-edit-area'>
                    <div className='edit-statement'>
                        <p className='title-statement'>User Information</p>
                        <p className='statement'>Here you can edit public information about your self. the changes will be
                            displayed for other user within five minutes.</p>
                    </div>
                </div>
                <div className='edit-form'>
                    <Row className='mb-1'>
                        <Col className='p-0' sm="6">
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
                                            <div className='d-flex align-items-center justify-content-between profile-pic-sec'>
                                                <Image src={file ? file : userData?.profilePhoto ? userData?.profilePhoto : userDefaultImage} width={111} height={111} style={{ borderRadius: "14px" }} />
                                                <div >
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
                                                        <Upload size={16} />Upload Picture
                                                    </label>
                                                    <Button className='btn d-flex justify-content-center align-items-center mr-1 delete-btn' onClick={removeImage}>
                                                        <Trash2 size={16} />Remove Picture
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                                {errors && errors?.email && (
                                    <FormFeedback>Please enter a valid email address!</FormFeedback>
                                )}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className='fg-email'>
                                <Label className="form-label">First Name <span style={{ color: 'red' }}>*</span> </Label>
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
                                <Label className="form-label">Last Name <span style={{ color: 'red' }}>*</span> </Label>
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
                                                type='email'
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
                        <Col className="mobile-input">
                            <FormGroup className='fg-email'>
                                <Label className="form-label"> Enter number <span style={{ color: 'red' }}>*</span> </Label>
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
                        <Col sm="3">
                            <FormGroup>
                                <Label className="form-label"> Select State <span style={{ color: 'red' }}>*</span> </Label>
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
                        <Col sm="3">
                            <FormGroup>
                                <Label className="form-label"> Select City <span style={{ color: 'red' }}>*</span> </Label>
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
                                                            required: false,
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
                        </Col>
                    </Row>
                </div>

                <div className="settings w-100">
                    <div className='d-flex align-items-center justify-content-center mb-3'>
                        <div className="border-bottom"></div> <p className='settings-title m-0'>Settings</p> <div className="border-bottom"></div>
                    </div>
                    <div className='profile-edit-area mb-1'>
                        <div className='edit-statement'>
                            <p className='title-statement'>User Information</p>
                            <p className='statement'>Here you can edit public information about your self. the changes will be
                                displayed for other user within five minutes.</p>
                        </div>
                    </div>
                    <div className='checkbox-group'>
                        <Row className="m-0">
                            <Col className="p-0">
                                <Controller
                                    name="isInboxMessages"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => {
                                        return (
                                            <Checkbox
                                                id='isInboxMessages'
                                                {...register("isInboxMessages", {
                                                    required: false,
                                                })}
                                                invalid={errors?.isInboxMessages && true}
                                                {...field}
                                            >Inbox Messages</Checkbox>
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="m-0">
                            <Col className="p-0">
                                <Controller
                                    name="isOrderMessages"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => {
                                        return (
                                            <Checkbox
                                                id='isOrderMessages'
                                                {...register("isOrderMessages", {
                                                    required: false,
                                                })}
                                                invalid={errors?.isOrderMessages && true}
                                                {...field}
                                            >Order Messages</Checkbox>
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="m-0">
                            <Col className="p-0">
                                <Controller
                                    name="isOrderUpdates"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => {
                                        return (
                                            <Checkbox
                                                id='isOrderUpdates'
                                                {...register("isOrderUpdates", {
                                                    required: false,
                                                })}
                                                invalid={errors?.isOrderUpdates && true}
                                                {...field}
                                            >Order Updates</Checkbox>
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="m-0">
                            <Col className="p-0">
                                <Controller
                                    name="isShowToastNotification"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => {
                                        return (
                                            <Checkbox
                                                id='isShowToastNotification'
                                                {...register("isShowToastNotification", {
                                                    required: false,
                                                })}
                                                invalid={errors?.isShowToastNotification && true}
                                                {...field}
                                            >Show toast notification </Checkbox>
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Button color='primary' onClick={handleSubmit(submitHandler)}>Save Changes</Button>
                </div>

            </div>
        </div>
    )
}

export default Profile