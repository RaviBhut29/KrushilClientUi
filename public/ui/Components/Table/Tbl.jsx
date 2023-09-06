import React, { useState, useEffect, useContext } from "react";
import { Table, Badge, Input, Spinner } from "reactstrap";
import { Edit, Trash, ChevronUp, ChevronDown, Filter, Clock, Edit2, Copy, Delete, Download } from "react-feather";
import randomstring from "randomstring";
import moment from "moment";
import { BE_URL } from "../../../config"
import "./table.scss";
import { badgeStates } from "../../../configs/conts";
import { Image } from "antd";
import { ReactImageCarouselViewer } from "react-image-carousel-viewer";

const Tbl = ({
    columns,
    tblTitle,
    sort,
    items,
    editData,
    deleteData,
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

    const [displayColumns, setDisplayColumns] = useState(false);
    const [displayVersionHistory, setDisplayVersionHistory] = useState(false);
    const [versionHistoryId, setVersionHistoryId] = useState(null);
    const [displayCalCalculationStatusColumns, setDisplayCalCalculationStatusColumns] = useState(false);
    const [displayCalCalculationCreatorColumns, setDisplayCalCalculationCreatorColumns] = useState(false);
    const [isRowClick, setIsRowClick] = useState(EnableRowClick);
    const [isOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState([]);

    useEffect(() => {
        closeAllModal();
    }, [items]);

    useEffect(() => {
        if (EnableRowClick) setIsRowClick(true)
        else setIsRowClick(false)
    }, [EnableRowClick])

    const closeAllModal = () => {
        setDisplayCalCalculationStatusColumns(false);
        setDisplayCalCalculationCreatorColumns(false);
        setDisplayColumns(false);
    };

    const FilterIconhandler = (data) => {
        if (data?.watchlist_value == "calculation_status") {
            setDisplayCalCalculationStatusColumns(!displayCalCalculationStatusColumns);
        } else if (data?.watchlist_value == "calculation_createdBy") {
            setDisplayCalCalculationCreatorColumns(!displayCalCalculationCreatorColumns);
        }
    };

    const SelectCheckbox = (data, e) => {
    };

    const showVersionHistory = (id) => {
        console.log("clicked");
        setDisplayVersionHistory(!displayVersionHistory);
        versionHistoryId ? setVersionHistoryId(null) : setVersionHistoryId(id);
    };

    const onImageCorosule = (data) => {
        const srcs = data?.image?.map((d) => {
            return { src: BE_URL + d }
        })
        setImageSrc(srcs)
        setIsOpen(true)
    }

    return (
        <div>
            <ReactImageCarouselViewer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                images={imageSrc}
                startIndex={0}
            />
            <Table className='table-hover-animations ' responsive>
                <thead>
                    <tr key='thead'>
                        {columns && columns.length > 0
                            ? columns.map((data, index) => {
                                let label = data.label.replace(/\s+/g, "");

                                return (
                                    <th id={data.value} key={index} style={data?.isLatex ? { textTransform: "none", fontSize: "14px" } : {}}>
                                        <div className=' for-scroll-stop d-flex align-items-center justify-content-start'>
                                            {
                                                <>
                                                    {
                                                        data?.value == "qk" ?
                                                            <div className="text-transform-none">{label}</div>
                                                            : label?.toUpperCase()
                                                    }

                                                    {data.isSort && (
                                                        <div className='for-scroll-stop d-flex flex-column' style={{ marginLeft: 4 }} id={data.value}>
                                                            <ChevronUp
                                                                id={data.value}
                                                                width='15'
                                                                height='15'
                                                                style={{ cursor: "pointer", marginBottom: "-3px" }}
                                                                className='for-scroll-stop'
                                                                stroke={sort.key == data.value && sort.type == 1 ? `${color.upArrow}` : "currentColor"}
                                                                onClick={() => UpArrowSroting(data)}
                                                            />
                                                            <ChevronDown
                                                                id={data.value}
                                                                width='15'
                                                                height='15'
                                                                style={{ cursor: "pointer", marginTop: "-4px" }}
                                                                className='for-scroll-stop'
                                                                stroke={sort.key == data.value && sort.type == -1 ? `${color.downArrow}` : "currentColor"}
                                                                onClick={() => DownArrowSroting(data)}
                                                            />
                                                        </div>
                                                    )}
                                                </>
                                            }
                                        </div>
                                    </th>
                                );
                            })
                            : null}
                    </tr>
                </thead>
                <tbody>
                    {items &&
                        items.length > 0 &&
                        items.map((item, index) => {
                            return (
                                <tr
                                    key={item.id + "_" + index}
                                    style={{ cursor: `${isRowClick ? "pointer" : ""}` }}
                                >
                                    {columns &&
                                        columns.map((column, i) => {
                                            let tags = item?.[`${column.value}`];

                                            if (column.value == "date") {
                                                if (tags) {
                                                    tags = moment(tags).format("DD/MM/YYYY");
                                                } else {
                                                    tags = "-";
                                                }
                                            }
                                            if (column.value == "updatedAt" || column.value == "createdAt") {
                                                if (tags) {
                                                    tags = moment(tags).format("DD-MM-YYYY");
                                                } else {
                                                    tags = "-";
                                                }
                                            }
                                            if (column?.value == "updatedBy" || column?.value == "preparedBy" || column?.value == "controlledBy") {
                                                if (!tags) {
                                                    tags = item?.createdBy?.firstName
                                                } else tags = tags?.firstName;
                                            }
                                            if (column?.value == "serviceId") {
                                                tags = item?.serviceId?.serviceName
                                            }
                                            if (column?.value == "categoryId") {
                                                tags = item?.categoryId?.catagoryName
                                            }
                                            if (column?.isShowUpdatedAgo) {
                                                tags = moment(item?.updatedAt).fromNow()
                                            }
                                            return column?.isDisplay && column?.isBadge && column?.watchlist_value == "calculation_status" ? (
                                                <td key={randomstring.generate(5)} onClick={() => isRowClick && onRowClick(item)} >
                                                    <Badge
                                                        color={`${tags == "draft"
                                                            ? badgeStates.success
                                                            : tags == "live"
                                                                ? badgeStates.primary
                                                                : tags == "test"
                                                                    ? badgeStates.warning
                                                                    : badgeStates.danger
                                                            }`}
                                                        className='capital_first'>
                                                        {tags}
                                                    </Badge>
                                                </td>
                                            ) : column?.isBadge && column?.watchlist_value == "calculation_tags" ? (
                                                <td key={randomstring.generate(5)} onClick={() => isRowClick && onRowClick(item)}>
                                                    {tags?.map((tag, ind) => {
                                                        return (
                                                            <Badge key={ind} color='secondary' style={{ marginRight: 8 }} className='table-tag-badge'>
                                                                {tag}
                                                            </Badge>
                                                        );
                                                    })}
                                                </td>
                                            ) : column?.isBadge && column?.watchlist_value == "report_status" ? (
                                                <td key={randomstring.generate(5)}>
                                                    <Badge color='light-primary' style={{ marginRight: 8 }} className='table-tag-badge'>
                                                        {tags}
                                                    </Badge>
                                                </td>
                                            ) : column?.isImage ? (
                                                <td key={randomstring.generate(5)} className="d-flex">
                                                    {/* <img src={tags ? BE_URL + tags : ""} alt="" width={55} height={55} style={{ borderRadius: "4px" }} /> */}
                                                    <Image
                                                        width={55} height={55}
                                                        src={tags ? BE_URL + tags : ""}
                                                    />
                                                </td>
                                            ) : column?.isCorosule ? (
                                                <td key={randomstring.generate(5)} onClick={() => onImageCorosule(item)} >
                                                    <img src={tags ? BE_URL + tags?.[0] : ""} alt="" style={{ borderRadius: "4px", cursor: "pointer", width: "55px", height: "55px" }} />
                                                </td>
                                            ) : column?.value == "select" ? (
                                                <td key={randomstring.generate(5)}>
                                                    <input type='checkbox' className='custom-control actionInput' onChange={(e) => SelectCheckbox(item, e)} />
                                                </td>
                                            ) : column?.value == "Action" && tblTitle == "exports" ? (
                                                <td key={randomstring.generate(5)}>
                                                    <a
                                                        className='w-100'
                                                        style={{ marginRight: 8, color: "#081D40" }}
                                                        target='_blank'
                                                        onClick={() => editData(item)}>
                                                        {/* <img src={editImg} /> */}
                                                        {item?.id == loaderExportId ? <Spinner color="dark" size="sm" /> : <Download size={16} />}

                                                        {/* <Edit size={15} /> */}
                                                    </a>

                                                    <a className='w-100' target='_blank' style={{ color: "#081D40" }} onClick={() => deleteData(item.id)}>
                                                        <Delete size={16} />

                                                        {/* <Trash size={15} /> */}
                                                    </a>
                                                </td>
                                            ) : column?.value == "Action" ? (
                                                <td key={randomstring.generate(5)}>
                                                    <a
                                                        className='w-100'
                                                        style={{ marginRight: 8, color: "#081D40" }}
                                                        target='_blank'
                                                        onClick={() => editData(item)}>
                                                        {/* <img src={editImg} /> */}
                                                        <Edit2 size={16} />

                                                        {/* <Edit size={15} /> */}
                                                    </a>

                                                    {clone && cloneData && (
                                                        <a
                                                            // className='w-100'
                                                            target='_blank'
                                                            style={{ marginRight: 8, color: "#081D40" }}
                                                            onClick={() => cloneData(item?.id)}>
                                                            <Copy size={16} />

                                                            {/* <Edit size={15} /> */}
                                                        </a>
                                                    )}

                                                    <a className='w-100' target='_blank' style={{ color: "#081D40" }} onClick={() => deleteData(item.id)}>
                                                        <Delete size={16} />

                                                        {/* <Trash size={15} /> */}
                                                    </a>
                                                </td>
                                            ) : column?.value == "version" ? (
                                                <td className='d-flex align-items-center' key={randomstring.generate(5)}>
                                                    <span style={{ marginRight: 3 }} className='align-middle'>
                                                        {item?.[`${column.value}`]}
                                                    </span>
                                                    <div className='position-relative'>
                                                        <Clock
                                                            color='#0457D3'
                                                            style={{ cursor: "pointer" }}
                                                            size={14}
                                                            onClick={() => showVersionHistory(item?.id)}
                                                        />
                                                    </div>
                                                </td>
                                            ) : (
                                                <td key={randomstring.generate(5)} onClick={() => isRowClick && onRowClick(item)} style={{ width: column?.width }}>
                                                    <span className='align-middle'>{tags}</span>
                                                </td>
                                            );
                                        })}
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div >
    );
};

export default Tbl;

