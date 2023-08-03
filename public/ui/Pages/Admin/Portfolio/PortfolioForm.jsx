import React, { useState } from "react";
import { Save } from "react-feather";
import { Controller } from "react-hook-form";
import { Button, Col, FormFeedback, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import deleteBtn from '../../../Images/delete-btn-signup.png';
import { Image, Modal, Upload, Button as AndtButton, Space } from "antd";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import QuillComponent from "../../../Components/QuillComponent/QuillComponent";
import Select from 'react-select';
import { customStylesError, customSearchStyles } from "../../../../configs/conts";
import { TagsInput } from "react-tag-input-component";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const PortfolioForm = (props) => {

    const { file, setFile, setValue, fileList, setFileList, categoriesOptions } = props;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

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
        setValue("tumbnail", "")
    }

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>
                Upload
            </div>
        </div>
    );

    return (
        <>
            <ModalHeader toggle={() => props.toggleHandler()}>
                {props?.updateId ? "Update" : "Add"} Portfolio
            </ModalHeader>
            <ModalBody>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Name<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="name"
                                control={props.control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            id='name'
                                            type='text'
                                            placeholder={"Type name"}
                                            {...props.register("name", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.name && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.name && (
                                <FormFeedback>{"Please enter name"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='subTitle'>Select Thumbnail<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="tumbnail"
                                control={props.control}
                                render={({ field: { onChange, ...rest } }) => {
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
                                                        id='tumbnail'
                                                        type='file'
                                                        placeholder={"Select flag icon"}
                                                        {...props.register("tumbnail", {
                                                            required: true,
                                                        })}
                                                        defaultValue={""}
                                                        onChange={(e) => { onFileChange(e?.target?.files[0]); onChange(e) }}
                                                        invalid={props.errors?.tumbnail && true}
                                                        {...rest}
                                                    />
                                            }
                                        </>
                                    );
                                }}
                            />
                            {props.errors && props.errors?.tumbnail && (
                                <FormFeedback>{"Please select Thumbnail"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Description<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="description"
                                control={props.control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            id='description'
                                            type='textarea'
                                            placeholder={"Type description"}
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
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Select category<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="category"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Select
                                            options={categoriesOptions}
                                            {...props.register("category", {
                                                required: false,
                                            })}
                                            {...field}
                                            placeholder={"Select category"}
                                            styles={props.errors?.category ? customStylesError : customSearchStyles}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.category && (
                                <FormFeedback>{"Please enter category name"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    {props?.updateId
                        && <Col>
                            <FormGroup className="form-group">
                                <Label for='nameMulti'>Short order<span className="text-danger">&#42;</span></Label>
                                <Controller
                                    name="sortOrder"
                                    control={props.control}
                                    render={({ field }) => {
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
                                    <FormFeedback>{"Please select sort order"}</FormFeedback>
                                )}
                            </FormGroup>
                        </Col>
                    }
                </Row>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group d-flex flex-column">
                            <Label for='subTitle'>Catalogue images</Label>
                            <Controller
                                name="catalougeImage"
                                control={props.control}
                                render={({ field: { onChange, ...rest } }) => {
                                    return (
                                        <>
                                            <Upload
                                                action={(e) => { }}
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={handlePreview}
                                                onChange={handleChange}
                                            >
                                                {uploadButton}
                                            </Upload>
                                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                <img
                                                    alt="example"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    src={previewImage}
                                                />
                                            </Modal>
                                        </>
                                    );
                                }}
                            />
                            {props.errors && props.errors?.catalougeImage && (
                                <FormFeedback>{"Please select catalogue images"}</FormFeedback>
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

export default PortfolioForm
