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

const CategoryForm = (props) => {

    const { file, setFile, setValue, editorHtml, setEditorHtml, fileList, setFileList, servicesOptions } = props;

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
        setValue("flagIcon", "")
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
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <ModalHeader toggle={() => props.toggleHandler()}>
                {props?.updateId ? "Update" : "Add"} Category
            </ModalHeader>
            <ModalBody>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Category Name<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="categoryName"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Input
                                            id='categoryName'
                                            type='text'
                                            placeholder={"Enter category name"}
                                            {...props.register("categoryName", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.categoryName && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.categoryName && (
                                <FormFeedback>{"Please enter category name"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Category Title<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="categoryTitle"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Input
                                            id='categoryTitle'
                                            type='text'
                                            placeholder={"Enter category name"}
                                            {...props.register("categoryTitle", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.categoryTitle && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.categoryTitle && (
                                <FormFeedback>{"Please enter category title"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Select service<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="service"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Select
                                            options={servicesOptions}
                                            {...props.register("service", {
                                                required: true,
                                            })}
                                            {...field}
                                            placeholder={"Select service"}
                                            styles={props.errors?.service ? customStylesError : customSearchStyles}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.service && (
                                <FormFeedback>{"Please enter category name"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Like reference<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="llikeReference"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Input
                                            id='llikeReference'
                                            type='text'
                                            placeholder={"Enter like reference"}
                                            {...props.register("llikeReference", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.llikeReference && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.llikeReference && (
                                <FormFeedback>{"Please enter like reference"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group d-flex flex-column">
                            <Label for='subTitle'>Select Thumbnail<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="tumbnail"
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
                                                        id='tumbnail'
                                                        type='file'
                                                        placeholder={"Enter flag icon"}
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
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Price<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="price"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Input
                                            id='price'
                                            type='number'
                                            placeholder={"Enter price"}
                                            {...props.register("price", {
                                                required: true,
                                            })}
                                            invalid={props.errors?.price && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.price && (
                                <FormFeedback>{"Please enter price"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-group">
                            <Label for='nameMulti'>Discount</Label>
                            <Controller
                                name="discount"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <Input
                                            id='discount'
                                            type='number'
                                            placeholder={"Enter discount in percentage"}
                                            {...props.register("discount", {
                                                required: false,
                                            })}
                                            invalid={props.errors?.discount && true}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.discount && (
                                <FormFeedback>{"Please enter discount"}</FormFeedback>
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
                    <Col>
                        <FormGroup className="form-group d-flex flex-column">
                            <Label for='subTitle'>Catalogue images</Label>
                            <Controller
                                name="catalougeImage"
                                control={props.control}
                                render={({ field: { onChange, ...rest }, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
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
                <Row className="m-0">
                    <Col>
                        <FormGroup className="form-group tag-input">
                            <Label for='nameMulti'>Format included<span className="text-danger">&#42;</span></Label>
                            <Controller
                                name="formatIncluded"
                                control={props.control}
                                render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => {
                                    return (
                                        <TagsInput
                                            // onChange={setSelected}
                                            name="fruits"
                                            placeHolder="Enter formats here"
                                            {...props.register("formatIncluded", {
                                                required: true,
                                            })}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            {props.errors && props.errors?.formatIncluded && (
                                <FormFeedback>{"Please enter like reference"}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
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
                                        <QuillComponent
                                            editorHtml={editorHtml}
                                            setEditorHtml={setEditorHtml}
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

export default CategoryForm