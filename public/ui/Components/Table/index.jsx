import React, { Fragment, useEffect, useState } from 'react';
import { Pagination } from "../Pagination";
import Tbl from './Tbl';
import moment from 'moment';


const Index = ({
    tblTitle,
    columns,
    data,
    currentPage,
    totalRecords,
    limit,
    editData,
    deleteData,
    sort,
    setSort,
    setCurrentPage,
    ActiveDeactiveHandler,
    ApproveHandler,
    clone,
    cloneData,
    color,
    UpArrowSroting,
    DownArrowSroting,
    applyCalculationStatus,
    applyCalculationCreator,
    filterText,
    onRowClick,
    EnableRowClick,
    loaderExportId,
}) => {

    const [renderData, setRenderData] = useState([]);

    const customStyles = {
        rows: {
            style: {
                border: "1px solid #f3f2f7",
                backgroundColor: "transparent",
            },
        },
        headCells: {
            style: {
                minHeight: "40px",
                // backgroundColor: '#f3f2f7'
            },
        },
        table: {
            style: {
                // minHeight: preview ? "" : window.innerHeight - 315,
                padding: "1rem",
                backgroundColor: "transparent",
            },
        },
    };

    useEffect(() => {
        if (data) {
            let tempdata = data?.map(d => {
                if (tblTitle == 'calculations' || tblTitle == 'exports') {
                    // d = { ...d, createdBy: d?.createdBy?.userName, date: moment(d?.data).format('YYYY-MM-DD') };
                    // d = { ...d, createdBy: d?.createdBy?.firstName + ' ' + d?.createdBy?.lastName, date: moment(d?.date).format('YYYY-MM-DD') };
                    d = { ...d, createdBy: d?.createdBy?.firstName + ' ' + d?.createdBy?.lastName };
                } else if (tblTitle == 'users') {
                    d = { ...d, role: d?.roleId?.roleName };
                }
                return d;
            })

            setRenderData(tempdata);
        }
    }, [data])

    const handlePagination = (page) => {
        setCurrentPage(page?.selected);
    };

    return (
        <Fragment>
            <div className="react-dataTable user-common-table">
                <Tbl
                    columns={columns}
                    sort={sort}
                    items={renderData}
                    editData={editData}
                    deleteData={deleteData}
                    ActiveDeactiveHandler={ActiveDeactiveHandler}
                    ApproveHandler={ApproveHandler}
                    clone={clone}
                    cloneData={cloneData}
                    color={color}
                    UpArrowSroting={UpArrowSroting}
                    DownArrowSroting={DownArrowSroting}
                    applyCalculationStatus={applyCalculationStatus}
                    applyCalculationCreator={applyCalculationCreator}
                    filterText={filterText}
                    onRowClick={onRowClick}
                    EnableRowClick={EnableRowClick}
                    tblTitle={tblTitle}
                    loaderExportId={loaderExportId}
                />
            </div>
            {limit && (
                <Pagination
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    totalRecords={totalRecords}
                    limit={limit}
                />
            )}
        </Fragment>
    );

}


export default Index;