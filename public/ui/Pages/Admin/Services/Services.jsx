import React, { useState } from 'react'
import { Card, CardBody } from 'reactstrap';
import { serviceColumns } from '../../../../configs/columns';
import TableHeader from "../../../Components/Table/TableHeader"
import ServiceTab from "../../../Components/Table"
import SpinnerComponent from '../../../Components/spinner/Fallback-spinner';
import { Settings } from 'react-feather';
import ServiceForm from './ServicesForm';
import { useForm } from 'react-hook-form';
import CommanModal from '../../../Components/Modal/CommanModal';
import "./Service.scss"
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SERVICES } from './ServicesQuery';
import { CREATE_SERVICES, DELETE_SERVICES, UPDATE_SERVICES } from './ServicesMutation';
import { notification } from 'antd';
import { FormatError } from '../../../Components/Common/FormatError';
import { ConfirmationModal } from '../../../Components/ConfirmationModal';
import { BE_URL } from '../../../../config';

const Dashboard = () => {

    // Comman states
    const [loader, setloader] = useState(false);
    const [centeredModal, setCenteredModal] = useState(false);
    const [file, setFile] = useState();
    const [service, setService] = useState();

    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState({ key: "sortOrder", type: -1 });
    const [filterText, setFilterText] = useState("{}");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [color, setcolor] = useState({ upArrow: "currentColor", downArrow: "currentColor" });

    const { control, watch, register, reset, formState: { errors }, handleSubmit, setValue } = useForm({});

    const { data, error, refetch, loading } = useQuery(GET_ALL_SERVICES, {
        variables: {
            page: currentPage + 1,
            limit: limit,
            sort: sort,
            filter: "{}",
            search: searchText,
        },
        fetchPolicy: "cache-and-network"
    })

    const [createMutation] = useMutation(CREATE_SERVICES)
    const [updateMutation] = useMutation(UPDATE_SERVICES)
    const [deleteMutation] = useMutation(DELETE_SERVICES)

    const toggleModal = () => {
        setCenteredModal(!centeredModal);
        reset({});
        // setData([]);
    };
    const editData = (data) => {
        reset({
            id: data?.id,
            serviceName: data?.serviceName,
            sortOrder: data?.sortOrder,
            description: data?.description,
            isCategory: data?.isCatagory,
        })
        setFile(BE_URL + data?.flagIcon)
        setCenteredModal(true)
        setService(data)
    }

    const addData = () => {
        reset({});
        setCenteredModal(!centeredModal)
        setFile()
        setService()
    }

    const addChapterButtonHandler = (data) => {
        setloader(true)
        createMutation({
            variables: {
                input: {
                    serviceName: data?.serviceName,
                    sortOrder: data?.sortOrder,
                    flagIcon: file,
                    description: data?.description,
                    isCatagory: data?.isCategory,
                }
            }
        }).then((response) => {
            setCenteredModal(false)
            reset({})
            setloader(false)
            setFile()
            setCurrentPage(0)
            refetch()
            notification.success({
                message: `Service added successfully`,
                placement: "top",
            });
        }).catch((error) => {
            notification?.error({ message: FormatError(error), placement: "top" })
            setloader(false)
        })
    }

    const updateButtonHandler = (data) => {
        setloader(true)
        let fileName
        if (!file?.includes(";base64,")) {
            fileName = file?.split("/")?.[3]
        }
        updateMutation({
            variables: {
                input: {
                    id: data?.id,
                    serviceName: data?.serviceName,
                    sortOrder: data?.sortOrder,
                    oldIndex: service?.sortOrder,
                    flagIcon: fileName ? fileName : file,
                    description: data?.description,
                    isCatagory: data?.isCategory,
                }
            }
        }).then((response) => {
            setCenteredModal(false)
            reset({})
            setloader(false)
            setCurrentPage(0)
            refetch()
            setFile()
            notification.success({
                message: `Service updated successfully`,
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
            deleteMutation({ variables: { deleteServiceId: id } })
                .then(async (response) => {
                    setloader(false)
                    refetch()
                    setCenteredModal(false)
                    await ConfirmationModal(
                        "success",
                        "Deleted",
                        "Service has been deleted successfully",
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
                title={"Services"}
                langTitle={"Services"}
                addData={() => addData()}
                addTitle={"Service"}
                setLimit={setLimit}
                setSearchText={setSearchText}
                setCurrentPage={setCurrentPage}
            />

            <Card className="w-100">
                {(loader) && <SpinnerComponent />}
                <CardBody>
                    <ServiceTab
                        tblTitle="Services"
                        columns={serviceColumns}
                        data={data?.getAllServiceWithPaginate?.data || []}
                        currentPage={currentPage}
                        totalRecords={data?.getAllServiceWithPaginate?.count || 0}
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
                <ServiceForm
                    control={control}
                    register={register}
                    errors={errors}
                    updateId={service?.id}
                    file={file}
                    setFile={setFile}
                    toggleHandler={toggleModal}
                    setValue={setValue}
                    updateButtonHandler={handleSubmit(updateButtonHandler)}
                    addButtonHandler={handleSubmit(addChapterButtonHandler)}
                />
            </CommanModal>
        </div>
    )
}

export default Dashboard