import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router";
import { Button, Col, Row } from "reactstrap";
import './pagination.scss'
import classNames from 'classnames';

export const Pagination = ({
    currentPage,
    handlePagination,
    totalRecords,
    limit,
    tableData,
    page
}) => {
    const location = useLocation();

    const path = location.pathname
    let check = ["/stocks", "/home", "/stock-watchlist", "/user"]
    return (
        <div>
            <Row className={classNames({ "mx-0 pt-1 my-0 align-items-center table_pagination": page !== "portFolio", "portFolio-pagination": page == "portFolio" })}>
                {page !== "portFolio" ?
                    <Col sm="6">
                        {/* {!check.includes(path) ?
                        <p className="ml-0 mb-0 cursor-pointer showing-page-limit">
                            showing page {currentPage + 1} of{" "}
                            {Math.ceil(totalRecords / limit) == 0
                                ? "1"
                                : Math.ceil(totalRecords / limit)}
                        </p>
                        : */}
                        <p className="ml-0 mb-0 cursor-pointer showing-page-limit">
                            {"Showing"} {currentPage == 0 ? "1" : limit * currentPage + 1} {"to"} {
                                totalRecords > limit * (currentPage + 1) ? limit * (currentPage + 1) : totalRecords} of{" "}
                            {totalRecords}  {"entries"}
                        </p>

                        {/* } */}
                    </Col>
                    :
                    <p className="ml-0 mb-0">Total {totalRecords} items</p>
                }
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    forcePage={currentPage}
                    onPageChange={(page) => handlePagination(page)}
                    pageCount={totalRecords / limit || 1}
                    breakLabel={"..."}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    nextClassName={"page-item next"}
                    previousClassName={"page-item prev"}
                    previousLinkClassName={"page-link"}
                    pageLinkClassName={"page-link"}
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName={
                        classNames("pagination react-paginate separated-pagination pagination-sm pr-1 mt-0 mb-0 col-sm-6", { "justify-content-lg-end justify-content-center": page !== "portFolio" })
                    }
                />
            </Row>
        </div>
    );
};
