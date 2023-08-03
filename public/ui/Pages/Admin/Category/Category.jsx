import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap';
import { categoryColumns } from '../../../../configs/columns';
import TableHeader from "../../../Components/Table/TableHeader"
import CategoryTab from "../../../Components/Table"
import SpinnerComponent from '../../../Components/spinner/Fallback-spinner';
import CategoryForm from './CategoryForm';
import { useForm } from 'react-hook-form';
import CommanModal from '../../../Components/Modal/CommanModal';
import "./Category.scss"
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_CATEGORY } from './CategoryQuery';
import { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from './CategoryMutation';
import { GET_SERVICES } from '../Services/ServicesQuery';
import { notification } from 'antd';
import { FormatError } from '../../../Components/Common/FormatError';
import { ConfirmationModal } from '../../../Components/ConfirmationModal';
import { BE_URL } from '../../../../config';

const Dashboard = () => {

    // Comman states
    const [loader, setloader] = useState(false);
    const [centeredModal, setCenteredModal] = useState(false);
    const [file, setFile] = useState();
    const [category, setCategory] = useState();
    const [editorHtml, setEditorHtml] = useState();
    const [servicesOptions, setServicesOptions] = useState();
    const [fileList, setFileList] = useState([])
    // For reset images in upload antd
    // {
    //     uid: '-2',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },

    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState({ key: "sortOrder", type: -1 });
    const [filterText, setFilterText] = useState("{}");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [color, setcolor] = useState({ upArrow: "currentColor", downArrow: "currentColor" });

    const { control, watch, register, reset, formState: { errors }, handleSubmit, setValue } = useForm({});

    const { data, error, refetch, loading } = useQuery(GET_ALL_CATEGORY, {
        variables: {
            page: currentPage + 1,
            limit: limit,
            sort: sort,
            filter: "{}",
            search: searchText,
        },
        fetchPolicy: "cache-and-network"
    })

    const { data: services, loading: servicesRefetch } = useQuery(GET_SERVICES, {
        variables: {
            page: currentPage + 1,
            limit: limit,
            sort: sort,
            filter: "{}",
            search: searchText,
        },
        fetchPolicy: "cache-and-network"
    })

    const [createMutation] = useMutation(CREATE_CATEGORY)
    const [updateMutation] = useMutation(UPDATE_CATEGORY)
    const [deleteMutation] = useMutation(DELETE_CATEGORY)

    useEffect(() => {
        if (services?.getAllService) {
            const options = services?.getAllService?.map((d) => {
                return { label: d?.serviceName, value: d }
            })
            setServicesOptions(options)
        }
    }, [services])

    const toggleModal = () => {
        setCenteredModal(!centeredModal);
        reset({});
        setFile({})
        setEditorHtml("")
        setFileList([])
        // setData([]);
    };

    const resetAllData = () => {
        setCenteredModal(false)
        reset({})
        setloader(false)
        setFile()
        setFileList([])
        setEditorHtml("")
        setCurrentPage(0)
    }

    const editData = (data) => {
        reset({
            id: data?.id,
            categoryName: data?.catagoryName,
            categoryTitle: data?.categoryTitle,
            discount: data?.discount,
            formatIncluded: data?.formatIncluded,
            llikeReference: data?.llikeReference,
            sortOrder: data?.sortOrder,
            price: data?.price,
            service: servicesOptions?.find((d) => data?.serviceId?.id == d?.value?.id),
        })
        setFile(BE_URL + data?.tumbnail)
        setEditorHtml(data?.description)
        const fileList = data?.image?.map((d, i) => {
            return {
                uid: i,
                name: d,
                status: 'done',
                url: BE_URL + d,
            }
        })
        setFileList(fileList)
        setCenteredModal(true)
        setCategory(data)
    }

    const addData = () => {
        reset({});
        setCenteredModal(!centeredModal)
        setFile()
        setCategory()
        setEditorHtml("")
        setFileList([])
    }

    const addButtonHandler = (data) => {
        const images = fileList?.map((d) => {
            return d?.thumbUrl
        })
        setloader(true)
        createMutation({
            variables: {
                input: {
                    catagoryName: data?.categoryName,
                    categoryTitle: data?.categoryTitle,
                    description: editorHtml,
                    discount: data?.discount,
                    formatIncluded: data?.formatIncluded,
                    image: images,
                    llikeReference: data?.llikeReference,
                    price: data?.price,
                    serviceId: data?.service?.value?.id,
                    tumbnail: file
                }
            }
        }).then((response) => {
            setCenteredModal(false)
            reset({})
            setloader(false)
            setFile()
            setFileList([])
            setEditorHtml("")
            setCurrentPage(0)
            refetch()
            notification.success({
                message: `Category added successfully`,
                placement: "top",
            });
        }).catch((error) => {
            notification?.error({ message: FormatError(error), placement: "top" })
            setloader(false)
        })
    }

    const updateButtonHandler = (data) => {
        const images = fileList?.map((d) => {
            return d?.thumbUrl ? d?.thumbUrl : d?.name;
        });
        let fileName
        if (!file?.includes(";base64,")) {
            fileName = file?.split("/")?.[3]
        }
        setloader(true)
        updateMutation({
            variables: {
                input: {
                    id: data?.id,
                    catagoryName: data?.categoryName,
                    categoryTitle: data?.categoryTitle,
                    description: editorHtml,
                    discount: data?.discount,
                    formatIncluded: data?.formatIncluded,
                    image: images,
                    llikeReference: data?.llikeReference,
                    price: data?.price,
                    serviceId: data?.service?.value?.id,
                    tumbnail: fileName ? fileName : file,
                    sortOrder: data?.sortOrder,
                    oldIndex: category?.sortOrder,
                }
            }
        }).then((response) => {
            setCenteredModal(false)
            reset({})
            setloader(false)
            setFile()
            setFileList([])
            setEditorHtml("")
            setCurrentPage(0)
            refetch()
            notification.success({
                message: `Category updated successfully`,
                placement: "top",
            });
        }).catch((error) => {
            notification?.error({ message: FormatError(error), placement: "top" })
            setloader(false)
        })
    }

    const deleteData = async (id) => {
        let Status = await ConfirmationModal(
            "warning",
            "Are you sure",
            "You wont be able to revert this",
            "Yes delete it",
        );
        if (Status) {
            setloader(true)
            deleteMutation({ variables: { deleteCategoryId: id } })
                .then(async (response) => {
                    setloader(false)
                    refetch()
                    setCenteredModal(false)
                    await ConfirmationModal(
                        "success",
                        "Deleted",
                        "Category has been deleted successfully",
                        ""
                    );
                })
                .catch((error) => {
                    setloader(false)
                    notification?.error({ message: FormatError(error), placement: "top" })
                })
        }
    }


    return (
        <div>

            <TableHeader
                limit={limit}
                title={"Categories"}
                langTitle={"Categories"}
                addData={() => addData()}
                addTitle={"Category"}
                setLimit={setLimit}
                setSearchText={setSearchText}
                setCurrentPage={setCurrentPage}
            />

            <Card className="w-100">
                {(loader) && <SpinnerComponent />}
                <CardBody>
                    <CategoryTab
                        tblTitle="Categories"
                        columns={categoryColumns}
                        data={data?.getAllCategoryWithPaginate?.data || []}
                        currentPage={currentPage}
                        totalRecords={data?.getAllCategoryWithPaginate?.count || 0}
                        limit={limit}
                        editData={editData}
                        deleteData={deleteData}
                        sort={sort}
                        setSort={setSort}
                        setCurrentPage={setCurrentPage}
                        clone={true}
                        color={color}
                        filterText={filterText}
                    />
                </CardBody>
            </Card>
            <CommanModal
                modal={centeredModal}
                setModal={setCenteredModal}
                toggleHandler={toggleModal}
                className='modal-dialog-centered edit-modals'>
                <CategoryForm
                    control={control}
                    register={register}
                    errors={errors}
                    updateId={category?.id}
                    file={file}
                    setFile={setFile}
                    toggleHandler={toggleModal}
                    setValue={setValue}
                    editorHtml={editorHtml}
                    setEditorHtml={setEditorHtml}
                    fileList={fileList}
                    setFileList={setFileList}
                    servicesOptions={servicesOptions}
                    updateButtonHandler={handleSubmit(updateButtonHandler)}
                    addButtonHandler={handleSubmit(addButtonHandler)}
                />
            </CommanModal>
        </div>
    )
}

export default Dashboard