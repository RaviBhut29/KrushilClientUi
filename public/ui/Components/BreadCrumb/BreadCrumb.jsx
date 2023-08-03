import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ReactComponent as ReactLogo } from '../../Images/home-icon.svg'
import { useQuery } from '@apollo/client';
import { GET_ALL_SERVICE } from './../../Pages/User/Services/query';
import { categoryColumns } from './../../../configs/columns';
import { GET_CATEGORIES } from '../../Pages/Admin/Category/CategoryQuery';
import { useEffect } from 'react';
import SpinnerComponent from './../spinner/Fallback-spinner';
import classNames from 'classnames';

const BreadCrumb = () => {
    const { id } = useParams()
    const location = useLocation();
    let currentLink = "";
    const crumbs = location?.pathname?.split("/")?.filter(d => d !== "").map(e => {
        currentLink += `/${e}`;
        return <div className='crumb' key={e}>
            <Link to={currentLink} >{e}</Link>
        </div>
    });

    const [product, setProduct] = useState();

    const { data: categories, loading: categoryLoading } = useQuery(GET_CATEGORIES, {
        variables: { getAllCategoryId: id },
        fetchPolicy: "cache-and-network"
    })

    useEffect(() => {
        if (categories?.getAllCategory) setProduct(categories?.getAllCategory?.[0])
    }, [categories])

    const { data, refetch, loading, error } = useQuery(GET_ALL_SERVICE, {
        skip: location?.pathname.match(/category\/(.*)/) ? false : true,
        fetchPolicy: "cache-and-network"
    })

    return (
        <div className='breadCrumbs d-block'>
            {(loading || categoryLoading) && <SpinnerComponent />}
            <div className='d-flex align-items-center'>
                {
                    location?.pathname !== '/' &&

                    <div className='crumb d-flex align-items-center' >
                        <div className='user-image'>
                            <ReactLogo />
                        </div>
                        <Link to={"/"} className="text-decoration">Home </Link>/
                    </div>
                }
                {crumbs?.map((d) => {
                    if (d?.key == "category" || d?.key == "product" || d?.key == "packages") {
                        return (
                            <div className='crumb' key="Services">
                                <Link to={"/services"} className="text-decoration" >Services</Link>
                            </div>
                        )
                    } else if (d?.key.match(/^[0-9a-fA-F]{24}$/) && location?.pathname?.includes("category")) {
                        return (
                            <> / <div className='crumb' key="Services">
                                <Link to="#" >{data?.getAllService?.find(e => e?.id == d?.key)?.serviceName}</Link>
                            </div></>
                        )
                    } else if (d?.key.match(/^[0-9a-fA-F]{24}$/) && (location?.pathname?.includes("product") || location?.pathname?.includes("packages"))) {
                        return (
                            <>
                                {!product?.serviceId?.isCatagory &&
                                    <> /
                                        <div className='crumb' key="Services">
                                            <Link to={`/category/${product?.serviceId?.id}`} className="text-decoration">{product?.serviceId?.serviceName}</Link>
                                        </div>
                                    </>
                                }
                                /
                                <div className='crumb' key="Services">
                                    <Link to={location?.pathname?.includes("packages") ? `/product/${id}` : "#"} className={classNames({ "text-decoration": location?.pathname?.includes("packages") })}>{product?.catagoryName}</Link>
                                </div>
                                {location?.pathname?.includes("packages") &&
                                    <>
                                        /
                                        <div className='crumb' key="Services">
                                            <Link to="#" >Pricing</Link>
                                        </div>
                                    </>
                                }
                            </>
                        )
                    } else return d
                })}
            </div>
        </div >
    )
}

export default BreadCrumb