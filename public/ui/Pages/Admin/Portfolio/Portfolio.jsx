import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap';
import { portfolioColumns } from '../../../../configs/columns';
import TableHeader from "../../../Components/Table/TableHeader"
import PortfolioTable from "../../../Components/Table"
import SpinnerComponent from '../../../Components/spinner/Fallback-spinner';
import PortfolioForm from './PortfolioForm';
import { useForm } from 'react-hook-form';
import CommanModal from '../../../Components/Modal/CommanModal';
import "./Portfolio.scss"
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_PORTFOLIO } from './ProtfolioQuery';
import { CREATE_PORTFOLIO, DELETE_PORTFOLIO, UPDATE_PORTFOLIO } from './ProtfolioMutation';
import { notification } from 'antd';
import { FormatError } from '../../../Components/Common/FormatError';
import { ConfirmationModal } from '../../../Components/ConfirmationModal';
import { GET_CATEGORIES } from '../Category/CategoryQuery';
import { BE_URL } from '../../../../config';

const PortFolio = () => {

    // Comman states
    const [loader, setloader] = useState(false);
    const [centeredModal, setCenteredModal] = useState(false);
    const [file, setFile] = useState();
    const [fileList, setFileList] = useState([])
    const [portfolio, setPortfolio] = useState();
    const [categoriesOptions, setCategoriesOptions] = useState([]);

    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState({ key: "sortOrder", type: -1 });
    const [filterText, setFilterText] = useState("{}");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [color, setcolor] = useState({ upArrow: "currentColor", downArrow: "currentColor" });

    const { control, watch, register, reset, formState: { errors }, handleSubmit, setValue } = useForm({});

    const { data, error, refetch, loading } = useQuery(GET_ALL_PORTFOLIO, {
        variables: {
            page: currentPage + 1,
            limit: limit,
            sort: sort,
            filter: "{}",
            search: searchText,
        },
        fetchPolicy: "cache-and-network"
    })

    const { data: categories, loading: categoriesRefetch } = useQuery(GET_CATEGORIES, {
        fetchPolicy: "cache-and-network"
    })

    const [createMutation] = useMutation(CREATE_PORTFOLIO)
    const [updateMutation] = useMutation(UPDATE_PORTFOLIO)
    const [deleteMutation] = useMutation(DELETE_PORTFOLIO)

    useEffect(() => {
        if (categories?.getAllCategory) {
            const options = categories?.getAllCategory?.map((d) => {
                return { label: d?.catagoryName, value: d }
            })
            setCategoriesOptions(options)
        }
    }, [categories])

    const toggleModal = () => {
        setCenteredModal(!centeredModal);
        reset({});
        // setData([]);
    };

    const editData = (data) => {
        reset({
            id: data?.id,
            name: data?.name,
            description: data?.description,
            serviceId: data?.category?.value?.serviceId?.id,
            isCatagory: data?.isCatagory,
            sortOrder: data?.sortOrder,
            category: categoriesOptions?.find((d) => data?.categoryId?.id == d?.value?.id),
        })
        setFile(BE_URL + data?.flagIcon)
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
        setPortfolio(data)
    }

    const addData = () => {
        setCenteredModal(!centeredModal)
        reset({});
        setFile()
        setFileList()
        setPortfolio()
    }

    const addButtonHandler = (data) => {
        const images = fileList?.map((d) => {
            return d?.thumbUrl
        })
        setloader(true)
        createMutation({
            variables: {
                input: {
                    name: data?.name,
                    flagIcon: file,
                    description: data?.description,
                    categoryId: data?.category?.value?.id,
                    serviceId: data?.category?.value?.serviceId?.id,
                    image: images,
                    sortOrder: data?.sortOrder
                }
            }
        }).then((response) => {
            setCenteredModal(false)
            reset({})
            setloader(false)
            setFile()
            setFileList()
            setCurrentPage(0)
            refetch()
            notification.success({
                message: `Portfolio added successfully`,
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
        })
        let fileName
        if (!file?.includes(";base64,")) {
            fileName = file?.split("/")?.[3]
        }
        setloader(true)
        updateMutation({
            variables: {
                input: {
                    id: data?.id,
                    name: data?.name,
                    flagIcon: fileName ? fileName : file,
                    description: data?.description,
                    categoryId: data?.category?.value?.id,
                    serviceId: data?.category?.value?.serviceId?.id,
                    image: images,
                    sortOrder: data?.sortOrder,
                }
            }
        }).then((response) => {
            setCenteredModal(false)
            reset({})
            setloader(false)
            setFile()
            setFileList()
            setCurrentPage(0)
            refetch()
            notification.success({
                message: `Portfolio updted successfully`,
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
            deleteMutation({ variables: { deletePortfolioId: id } })
                .then(async (response) => {
                    setloader(false)
                    refetch()
                    setCenteredModal(false)
                    await ConfirmationModal(
                        "success",
                        "Deleted",
                        "Portfolio has been deleted successfully",
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
                title={"Portfolios"}
                langTitle={"Portfolios"}
                addData={() => addData()}
                addTitle={"Portfolio"}
                setLimit={setLimit}
                setSearchText={setSearchText}
                setCurrentPage={setCurrentPage}
            />

            <Card className="w-100">
                {(loader) && <SpinnerComponent />}
                <CardBody>
                    <PortfolioTable
                        tblTitle="Portfolios"
                        columns={portfolioColumns}
                        data={data?.getAllPortfolioWithPaginate?.data || []}
                        currentPage={currentPage}
                        totalRecords={data?.getAllPortfolioWithPaginate?.count || 0}
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
                <PortfolioForm
                    control={control}
                    register={register}
                    errors={errors}
                    updateId={portfolio?.id}
                    file={file}
                    setFile={setFile}
                    fileList={fileList}
                    categoriesOptions={categoriesOptions}
                    setFileList={setFileList}
                    toggleHandler={toggleModal}
                    setValue={setValue}
                    updateButtonHandler={handleSubmit(updateButtonHandler)}
                    addButtonHandler={handleSubmit(addButtonHandler)}
                />
            </CommanModal>
        </div>
    )
}

export default PortFolio