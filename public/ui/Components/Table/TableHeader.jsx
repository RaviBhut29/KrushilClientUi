//library
import React, { useContext, useRef, useState } from "react";
import { Plus, Check, X, Clock, ChevronLeft, Search } from "react-feather";
import { Button, Col, Input, Label, Row } from "reactstrap";
import $ from "jquery";

import "./table.scss";

//components
import { PaginationDropDown } from "../Pagination/PaginationDropDown";

const Index = ({
    limit,
    langTitle,
    addData,
    importData,
    exportData,
    title,
    addTitle,
    setLimit,
    setCurrentPage,
    setSearchText,
    addDataStatic,
    sampleHeaders = [],
    sampleData = [],
    GoBack,
    selectedProject,
    isReports,
    setFilterText,
    isMyProject,
    setIsMyProject,
}) => {
    const changeLimit = (e) => {
        e.preventDefault();
        setLimit(parseInt(e?.target?.value));
        setCurrentPage(0);
    };

    //function is being called on search of value
    const SearchHandling = (e) => {
        setSearchText(e?.target?.value);
        setCurrentPage(0);
    };

    const importDataHandler = () => {
        $("#importLoadMaster").click();
    };

    return (
        <div className='d-flex align-items-center mt-sm-0 mt-1 mb-2 justify-content-between user-common-table_header'>
            {title == "Reports" ? (
                <div className='d-flex align-items-center'>
                    <div className='cursor-pointer mr-1' onClick={GoBack}>
                        <ChevronLeft size={16} /> Goback
                    </div>
                    <div className='d-flex align-items-center'>
                        <h3 style={{ fontWeight: "400", marginRight: "10px" }}>{langTitle}</h3>
                        <h2>{`for  ${selectedProject?.postalCode} ${selectedProject?.streetNumber}`}</h2>
                    </div>
                </div>
            ) : (
                <div className='justify-content-sm-start'>
                    <h1>{langTitle}</h1>
                </div>
            )}

            <div className='d-flex pull-right'>
                {setSearchText && (
                    <div className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1  position-relative table-search-box mr-1'>
                        <Input
                            className='dataTable-filter mx-5'
                            type='search'
                            id='search-input'
                            onChange={(e) => SearchHandling(e)}
                            placeholder={"EnterSearch"}
                        />
                        {/* <img className='search-icon' src={search} /> */}
                        <Search className='search-icon mx-5' size={16} />
                    </div>
                )}
                {addData && addTitle == "Company" ? (
                    <button className='btn btn-primary new-collection-btn d-flex align-items-center' onClick={addData}>
                        {"Invite"} {addTitle} <Plus width={18} style={{ marginLeft: 10 }} />
                    </button>
                ) : (
                    <button className='btn btn-primary new-collection-btn d-flex align-items-center' onClick={addData}>
                        {"New"} {addTitle} <Plus width={18} style={{ marginLeft: 10 }} />
                    </button>
                )}
            </div>
        </div>

        // <div className="invoice-list-table-header w-100  py-1">
        //     <Row className="w-100">
        //         <Col lg="6" className="d-flex align-items-center  lg-1">
        //             {limit && (
        //                 <div className="d-flex align-items-center me-2 ps-1 w-25">
        //                     <PaginationDropDown
        //                         title="Show"
        //                         limit={limit}
        //                         changeLimit={(e) => changeLimit(e)}
        //                     />
        //                 </div>
        //             )}
        //         </Col>
        //         <Col
        //             lg="6"
        //             className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 lg-1 p-0"
        //         >

        //             {setSearchText && (
        //                 <div className="d-flex align-items-center ">
        //                     <label htmlFor="search-invoice">Search</label>
        //                     <Input
        //                         id="search-invoice"
        //                         className="ms-50  w-100"
        //                         type="text"
        //                         onChange={SearchHandling}
        //                         placeholder={`Search ${title} ...`}
        //                     />
        //                 </div>
        //             )}
        //             {addData && (
        //                 <Button
        //                     color="primary"
        //                     className="btn btn-primary d-flex btn-sm align-items-center ms-2"
        //                     onClick={() => {
        //                         addData();
        //                     }}
        //                 >
        //                     <Plus />
        //                     Add {title}
        //                 </Button>
        //             )}

        //         </Col>
        //     </Row>
        // </div>
    );
};

export default Index;
