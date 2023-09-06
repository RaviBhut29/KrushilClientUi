import React, { useContext, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";
import { useForm } from "react-hook-form";
import ImageResize from "quill-image-resize-module-react";
import BlotFormatter from "quill-blot-formatter";
import SpinnerComponent from "../spinner/Fallback-spinner";

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = ["arial", "comic-sans", "courier-new", "georgia", "helvetica", "lucida", "poppins"];
Quill.register(Font, true);

Quill.register("modules/imageResize", ImageResize);

Quill.register('modules/blotFormatter', BlotFormatter);

const CustomHeart1 = () => <span id='test'>♥</span>;
const CustomHeart = () => (
    <span data-toggle='modal' data-target='#exampleModal'>
        ♥
    </span>
);

let quillRef;
let index;

function insertHeart() {
    const cursorPosition = this.quill.getSelection()?.index;
    this.quill.insertText(cursorPosition && cursorPosition, "♥");
    this.quill.setSelection(cursorPosition && cursorPosition + 1);
}

function addImageButtonHandler(data, cropedImage, image) {
    const editor = quillRef?.getEditor();
    const cursorPosition = editor?.getSelection()?.index;
    if (cursorPosition) index = cursorPosition;
    if (cropedImage) {
        editor?.insertEmbed(cursorPosition ? cursorPosition : index, "image", cropedImage && cropedImage);
        editor?.setSelection(cursorPosition && cursorPosition + 1);
    }
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = ({
    setCenteredModal,
    centeredModal,
    keyValue,
}) => {
    const toolBarRef = useRef();

    const customeqautionStyles = {
        control: (styles) => ({ ...styles, maxHeight: "24px", minHeight: "24px", width: "120px", fontSize: "10px", fontWeight: "400px" }),
        indicatorsContainer: (styles) => ({ ...styles, position: "absolute", right: "0px", top: "-8px" }),
        input: (styles) => ({ ...styles, height: "4px", display: "flex", alignItems: "center", justifyContent: "center" }),
        indicatorSeparator: (base) => ({
            ...base,
            display: "none",
        }),
    };
    return (
        <div key={keyValue} ref={toolBarRef} id='toolbar'>
            <select className='ql-size'>
                <option value='extra-small' defaultValue>
                    Normal
                </option>
                <option value='small'>Size 2</option>
                <option value='medium'>Size 3</option>
                <option value='large'>Size 4</option>
            </select>
            <button className='ql-bold'></button>
            <button className='ql-italic'></button>
            <button className='ql-underline'></button>
            <button className='ql-strike'></button>
            <button className='ql-blockquote'></button>
            <button className='ql-list' value='ordered'></button>
            <button className='ql-list' value='bullet'></button>
            <button className='ql-image'></button>
            {/* <button className='ql-addImageButtonHandler' onClick={() => setCenteredModal(!centeredModal)}>
                <Image />
            </button> */}
            <button className='ql-link'></button>
            {/* Align is not supported use mutiple */}
            <select className='ql-align' />
            <select className='ql-color' />
            {/* <button className='ql-formula' /> */}
            <button className='ql-clean' />
            <button className="ql-insertHeart">
                <CustomHeart1 />
            </button>
            {/* <div className='d-flex align-items-center justify-content-between'> */}
            {/* <div className='d-flex'>
                    <Select
                        name='formulas'
                        className='ml-1'
                        options={formulaOptions && formulaOptions}
                        placeholder={intlContext.messages.Formulas}
                        styles={customeqautionStyles}
                        onChange={(e) => addFormula(e?.value)}
                    />
                    <Select
                        name='variables'
                        className='mx-1'
                        options={variableOptions && variableOptions}
                        placeholder={intlContext.messages.Variables}
                        styles={customeqautionStyles}
                        onChange={(e) => addVariable(e?.value)}
                    />
                </div> */}
            {/* <div className='d-flex align-items-center belasting-hover-btn'>
                    <Save className='cursor-pointer mr-1' size={16} onClick={handleUpdate} />
                    <Delete className='cursor-pointer mr-1' size={16} onClick={handleDelete} />
                </div>
            </div> */}
        </div >
    );
};

/*
 * Editor component with custom toolbar and content containers
 */
const QuillComponent = (props) => {
    const textAreaRef = useRef();
    const { editorHtml, setEditorHtml } = props;

    const {
        control,
        watch,
        register,
        reset,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: {},
    });

    const [centeredModal, setCenteredModal] = useState(false);
    // const [editorHtml, setEditorHtml] = useState("");

    const [loader, setLoader] = useState(false);
    const [cropedImage, setCropedImage] = useState();
    const [Image, setImage] = useState("");
    const [isSave, setIsSave] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChange = (html) => {
        setEditorHtml(html ? html : "");
    };

    let toggleModal = () => {
        if (props?.initialModalOpen) {
            props?.removeTempSection();
        }
        setCenteredModal(!centeredModal);
        reset({});
        setImage();
        setCropedImage();
        setIsSave(false);
    };

    // Modules for toolbar
    const modules = {
        toolbar: {
            container: "#toolbar",
            handlers: {
                insertHeart: insertHeart,
                addImageButtonHandler: addImageButtonHandler,
            },
        },
        imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize"],
        },
    };

    // Formats for toolbar
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "align",
        "list",
        "formula",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
    ];

    useEffect(() => {
        quillRef = { ...textAreaRef?.current };
        // closeModal = toggleModal()
    }, [textAreaRef?.current]);

    return (
        <div className='quill-text-editor textEditor-section'>
            {loader && <SpinnerComponent />}
            <CustomToolbar
                textAreaRef={textAreaRef}
                setCenteredModal={setCenteredModal}
                centeredModal={centeredModal}
            />
            <ReactQuill
                theme={"snow"}
                ref={textAreaRef}
                value={editorHtml}
                placeholder={"Write something or insert a heart ♥"}
                onChange={(e, a, b, c) => handleChange(e, c)}
                onChangeSelection={(e) => {
                    if (e) setCurrentIndex(e?.index);
                }}
                modules={modules}
                formats={formats}
                className='quill-area'
            />
        </div>
    );
};
export default QuillComponent;
