import { Image, Switch } from "antd";
import React, { useState } from "react";
import { Save } from "react-feather";
import { Controller } from "react-hook-form";
import { Button, Col, FormFeedback, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import deleteBtn from '../../../Images/delete-btn-signup.png';

const ServiceForm = (props) => {

    const { file, setFile, setValue } = props;

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

    const removeImage = () => {
        setFile();
        setValue("flagIcon", "")
    }

    return (
        <>
            <ModalHeader toggle={() => props.toggleHandler()}>
                {props?.updateId ? "Update" : "Add"} Service
            </ModalHeader>
            <ModalBody>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Service Name<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="serviceName"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Input
                                            id='serviceName'
                                            type='text'
                                            placeholder={"Enter service name"}
                                            {...props.register("serviceName", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.serviceName && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.serviceName && (
                                <FormFeedback>{"Please enter service name"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    {/* </Row>
                <Row className="m-0"> */}
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='subTitle'>Select Icon</Label>
                            <Controller
                                name="flagIcon"
                                control={props.control}
                                render={({ field: { onChange, ...rest }, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <>
                                            {
                                                file
                                                    ?
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Image src={file} alt="" className='profile-image' />
                                                        <div>
                                                            <img src={deleteBtn} alt="" className='cursor-pointer' onClick={() => { removeImage() }} />
                                                        </div>
                                                    </div>
                                                    :
                                                    <Input
                                                        id='flagIcon'
                                                        type='file'
                                                        placeholder={"Enter flag icon"}
                                                        {...props.register("flagIcon", {
                                                            required: true,
                                                        })}
                                                        defaultValue={""}
                                                        onChange={(e) => { onFileChange(e?.target?.files[0]); onChange(e) }}
                                                        invalid={props.errors?.flagIcon && true}
                                                        {...rest}
                                                    />
                                            }
                                        </>
                                    );
                                }}
                            />
                            {props.errors && props.errors?.flagIcon && (
                                <FormFeedback>{"Please enter flag icon"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group d-flex flex-column">
                            <Label for='nameMulti'>Category by itself<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="isCategory"
                                control={props.control}
                                render={({ field: { value, ...rest }, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Switch
                                            defaultChecked={value}
                                            style={{ width: "44px" }}
                                            id='isCategory'
                                            placeholder={"Enter short order"}
                                            {...props.register("isCategory", {
                                                required: false,
                                            })}
                                            invalid={props.errors?.isCategory && true}
                                            {...rest}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.isCategory && (
                                <FormFeedback>{"Please enter service name"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    {props?.updateId
                        && <Col>
                            <FormGroup className="form-group">
                                <Label for='nameMulti'>Short order</Label>
                                <Controller
                                    name="sortOrder"
                                    control={props.control}
                                    render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                        return (
                                            <Input
                                                id='sortOrder'
                                                type='number'
                                                placeholder={"Enter  short order"}
                                                {...props.register("sortOrder", {
                                                    required: true,
                                                })}
                                                invalid={props.errors?.sortOrder && true}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                {props.errors && props.errors?.sortOrder && (
                                    <FormFeedback>{"Please select  short order"}</FormFeedback>
                                )}
                            </FormGroup>
                        </Col>
                    }
                </Row>
                <Row className="m-0">
                    <Col sm='12'>
                        <FormGroup style={{ marginTop: 3 }} className="form-group">
                            <Label for='lastNameMulti'>Description</Label>
                            <Controller
                                name="description"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Input
                                            id='description'
                                            type='textarea'
                                            placeholder={"Enter description"}
                                            {...props.register("description", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.description && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.description && (
                                <FormFeedback>{"Please enter description"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="cancel-btn" onClick={() => props.toggleHandler()}>
                    {"Cancel"}
                </Button>{' '}
                <Button color='primary' className="accept-btn d-flex align-items-center "
                    onClick={(e) => { props?.updateId ? props?.updateButtonHandler(e) : props?.addButtonHandler(e) }}
                >
                    <Save size={16} style={{ marginRight: "5px  " }} />{"Save"}
                </Button>
            </ModalFooter>
        </>

    )
}

export default ServiceForm