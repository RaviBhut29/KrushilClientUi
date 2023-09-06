import React, { useState } from "react";
import { Save } from "react-feather";
import { Controller } from "react-hook-form";
import { Button, Col, FormFeedback, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import Select from 'react-select';
import { customStylesError, customSearchStyles } from "../../../../configs/conts";




const FAQForm = (props) => {

    return (
        <>
            <ModalHeader toggle={() => props.toggleHandler()}>
                {props?.isUpdate ? "Update" : "Add"} FAQ
            </ModalHeader>
            <ModalBody>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Select Category<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="categoryId"
                                control={props.control}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            options={props?.categoryOptions}
                                            {...props.register("categoryId", {
                                                required: true,
                                            })}
                                            {...field}
                                            placeholder={"Select categoryId"}
                                            styles={props.errors?.categoryId ? customStylesError : customSearchStyles}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.categoryId && (
                                <FormFeedback>{"Please Select Category"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group">
                            <Label >Question<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="answer"
                                control={props.control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            id='answer'
                                            type='text'
                                            placeholder={"Enter answer"}
                                            {...props.register("answer", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.answer && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.answer && (
                                <FormFeedback>{"Please enter answer"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup className="form-group">
                            <Label >Answer<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="question"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Input
                                            id='question'
                                            type='textarea'
                                            placeholder={"Enter question"}
                                            {...props.register("question", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.question && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.question && (
                                <FormFeedback>{"Please enter question"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="cancel-btn" onClick={() => props.toggleHandler()}>
                    {"Cancel"}
                </Button>{' '}
                <Button color='primary' className="accept-btn d-flex align-items-center"
                    onClick={(e) => { props?.isUpdate ? props?.updateButtonHandler(e) : props?.addButtonHandler(e) }}
                >
                    <Save size={16} style={{ marginRight: "5px  " }} />{"Save"}
                </Button>
            </ModalFooter>
        </>

    )
}

export default FAQForm