import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap';
import { FaqColumns } from '../../../../configs/columns';
import TableHeader from "../../../Components/Table/TableHeader"
import PortfolioTable from "../../../Components/Table"
import SpinnerComponent from '../../../Components/spinner/Fallback-spinner';
import { useForm } from 'react-hook-form';
import CommanModal from '../../../Components/Modal/CommanModal';
import "./faq.scss"
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_FAQ, DELETE_FAQ, GET_ALL_FAQ, CREATE_FAQ } from './FaqGQL';
import { notification } from 'antd';
import { FormatError } from '../../../Components/Common/FormatError';
import { ConfirmationModal } from '../../../Components/ConfirmationModal';
import { GET_CATEGORIES } from '../Category/CategoryQuery';
import { BE_URL } from '../../../../config';
import FAQForm from './FAQForm';

const FAQ = () => {

    // Comman states
    const [loader, setloader] = useState(false);
    const [centeredModal, setCenteredModal] = useState(false);


    const [categoryOptions, setCategoriesOptions] = useState([]);
    const [isUpdate, setIsUpdate] = useState()
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState({ key: "sortOrder", type: -1 });
    const [filterText, setFilterText] = useState("{}");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [color, setcolor] = useState({ upArrow: "currentColor", downArrow: "currentColor" });

    const { control, watch, register, reset, formState: { errors }, handleSubmit, setValue } = useForm({});



    const { data: faq, refetch } = useQuery(GET_ALL_FAQ, {
        variables: {
            page: currentPage + 1,
            limit: limit,
            sort: sort,
            filter: "{}",
            search: searchText,
        },
        fetchPolicy: "cache-and-network"
    })
    const { data: categories } = useQuery(GET_CATEGORIES, { fetchPolicy: "cache-and-network" })
    const [createMutation] = useMutation(CREATE_FAQ)
    const [updateMutation] = useMutation(UPDATE_FAQ)
    const [deleteMutation] = useMutation(DELETE_FAQ)

    useEffect(() => {
        if (categories?.getAllCategory) {
            const options = categories?.getAllCategory?.map((d) => {
                return { label: d?.catagoryName, value: d?.id }
            })
            setCategoriesOptions(options)
        }
    }, [categories])

    const toggleModal = () => { setCenteredModal(!centeredModal); reset({}); };

    const editData = (data) => {
        setIsUpdate(true)
        reset({
            id: data?.id,
            question: data?.question,
            categoryId: data?.categoryId,
            answer: data?.answer,
        })
        setCenteredModal(true)
    }

    const addData = () => {
        setIsUpdate(false)
        setCenteredModal(!centeredModal)
        reset({});
    }

    const addButtonHandler = ({ question, categoryId, answer }) => {
        setloader(true)
        createMutation({
            variables: { input: { question, categoryId: categoryId?.value, answer, } }
        }).then((response) => {
            setCenteredModal(false)
            reset({})
            setloader(false)
            setCurrentPage(0)
            notification.success({
                message: `FAQ added successfully`,
                placement: "top",
            });
        }).catch((error) => {
            notification?.error({ message: FormatError(error), placement: "top" })
            setloader(false)
        })
    }

    const updateButtonHandler = ({ id, question, categoryId, answer }) => {
        setloader(true)
        updateMutation({ variables: { input: { id, question, categoryId: categoryId?.value, answer } } }).then((response) => {
            setCenteredModal(false)
            reset({})
            setloader(false)
            setCurrentPage(0)
            refetch()
            notification.success({
                message: `FAQ updated successfully`,
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
            "Are you sure want to delete this FAQ",
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
                title={"faqs"}
                langTitle={"faqs"}
                addData={() => addData()}
                addTitle={"FAQ"}
                setLimit={setLimit}
                setSearchText={setSearchText}
                setCurrentPage={setCurrentPage}
            />

            <Card className="w-100">
                {(loader) && <SpinnerComponent />}
                <CardBody>
                    <PortfolioTable
                        tblTitle="faqs"
                        columns={FaqColumns}
                        data={faq?.getAllFAQWithPaginate?.data || []}
                        currentPage={currentPage}
                        totalRecords={faq?.getAllFAQWithPaginate?.count || 0}
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
                <FAQForm
                    control={control}
                    register={register}
                    errors={errors}
                    isUpdate={isUpdate}
                    categoryOptions={categoryOptions}
                    toggleHandler={toggleModal}
                    setValue={setValue}
                    updateButtonHandler={handleSubmit(updateButtonHandler)}
                    addButtonHandler={handleSubmit(addButtonHandler)}
                />
            </CommanModal>
        </div>
    )
}

export default FAQ