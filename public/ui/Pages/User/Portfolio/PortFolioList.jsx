import React, { useEffect, useState } from "react";
import { Nav, Modal, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ImagePreview from "./ImagePreview";
import "../../../Scss/common.scss";
import "../Home/Home.scss";
import PortFolioDisplay from "./PortFolioDisplay";
import { useQuery } from "@apollo/client";
import { GET_ALL_PORTFOLIO } from "./../../Admin/Portfolio/ProtfolioQuery";
import { Pagination } from './../../../Components/Pagination/index';
import SpinnerComponent from './../../../Components/spinner/Fallback-spinner';
import { GET_SERVICES_BY_PORTFOLIO } from './../../Admin/Services/ServicesQuery';

const PortFolioList = () => {
    const [active, setActive] = useState("1");
    const [centredModal, setCentredModal] = useState(false);
    const [limit, setLimit] = useState(12);
    const [sort, setSort] = useState({ key: "createdAt", type: -1 });
    const [filterText, setFilterText] = useState("{}");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const [usedServices, setUsedServices] = useState();

    const toggle = (tab, id) => {
        if (active !== tab) {
            setActive(tab);
            id ? setFilterText(JSON?.stringify({ serviceId: id })) : setFilterText("{}")
        }
    };

    const toggleModal = () => {
        setCentredModal(!centredModal);
    };

    const { data, error, refetch, loading } = useQuery(GET_ALL_PORTFOLIO, {
        variables: {
            page: currentPage + 1,
            limit: limit,
            sort: sort,
            filter: filterText,
            search: searchText,
        },
        fetchPolicy: "cache-and-network",
    });

    const { data: serviceData, refetch: serviceRefetch, loading: serviceLoading } = useQuery(GET_SERVICES_BY_PORTFOLIO, {
        fetchPolicy: "cache-and-network",
    });

    useEffect(() => {
        if (serviceData?.getAllServiceByPortfolio) {
            setUsedServices(serviceData?.getAllServiceByPortfolio)
        }
    }, [serviceData])

    const handlePagination = (page) => {
        setCurrentPage(page?.selected);
    };

    return (
        <div className="container portfolioList-page">
            {(loading) && <SpinnerComponent />}
            <Nav tabs style={{ marginTop: "-2rem" }}>
                <NavItem>
                    <NavLink
                        active={active === "1"}
                        onClick={() => {
                            toggle("1");
                        }}
                    >
                        All Works
                    </NavLink>
                </NavItem>
                {
                    usedServices?.map((d, i) => {
                        return (
                            <NavItem>
                                <NavLink
                                    active={active === `${i + 2}`}
                                    onClick={() => {
                                        toggle(`${i + 2}`, d?.id);
                                    }}
                                >
                                    {d?.serviceName}
                                </NavLink>
                            </NavItem>
                        )
                    })
                }
            </Nav>
            <TabContent className="py-50" activeTab={active}>
                <TabPane tabId="1">
                    <PortFolioDisplay
                        data={data?.getAllPortfolioWithPaginate?.data}
                        count={data?.getAllPortfolioWithPaginate?.count}
                        centredModal={centredModal}
                        setCentredModal={setCentredModal}
                    />
                </TabPane>
                {
                    usedServices?.map((d, i) => {
                        return (
                            <TabPane tabId={`${i + 2}`}>
                                <PortFolioDisplay
                                    data={data?.getAllPortfolioWithPaginate?.data}
                                    count={data?.getAllPortfolioWithPaginate?.count}
                                    centredModal={centredModal}
                                    setCentredModal={setCentredModal}
                                />
                            </TabPane>
                        )
                    })
                }
            </TabContent>
            <Pagination
                currentPage={currentPage}
                handlePagination={handlePagination}
                totalRecords={data?.getAllPortfolioWithPaginate?.count}
                limit={limit}
                page="portFolio"
            />
            <Modal isOpen={centredModal} toggle={toggleModal} className="modal-dialog-centered image-preview-modals">
                <ImagePreview />
            </Modal>
        </div>
    );
};

export default PortFolioList;
