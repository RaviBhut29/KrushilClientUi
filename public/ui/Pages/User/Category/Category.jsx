import React from 'react'
import ratingReview from '../../../Images/rating-review.svg'
import salesMarketing from '../../../Images/sales-marketing.svg'
import customerExperience from '../../../Images/customer-experience.svg'
import { GET_CATEGORIES } from '../../Admin/Category/CategoryQuery'
import { useQuery } from '@apollo/client'
import Image from "../../../Components/ImageComp/Image";
import "../Services/Services.scss"
import '../Home/Home.scss'
import "./Category.scss"
import '../../../Scss/common.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { BE_URL } from '../../../../config'
import minimalistLogo from '../../../Images/minimalist-logo.png'

const Category = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { data, loading } = useQuery(GET_CATEGORIES, {
        variables: { serviceId: params?.id },
        fetchPolicy: "cache-and-network"
    })

    return (
        <div className='service'>
            <div className='container'>
                <div className="service-section row align-items-center">
                    <div className="col-lg-6">
                        <div className="branding">
                            <h2 className="heading gradient-text">Many Types of Logos to <br /> Inspire  Your Next Design </h2>
                            <span className="text">There are many different types of logos, and we’re going to provide all of them in this plate-form. we’ll pinpoint the pros and cons, so you can make the best decision when creating a logo design.</span>
                        </div>
                    </div>

                </div>

            </div>
            <div className="service-categories container">
                <div className="branding-cards row">
                    {
                        data?.getAllCategory?.map((res) => {
                            return (
                                <div className="col-lg-4 mt-4" onClick={() => { navigate(`/product/${res?.id}`) }} key={res?.id}>
                                    <div className="brands-card p-0">
                                        {/* <div className="image"><Image src={BE_URL + res?.image[0]} /></div> */}
                                        <div className="image"><Image src={minimalistLogo} style={{ width: '100%', height: '250px' }} /></div>
                                        <div className="details p-1">
                                            <div className="headings">
                                                <h3>{res?.catagoryName}</h3>
                                                <p>Like: {res?.llikeReference}</p>
                                            </div>
                                            <div className='price'>
                                                <span className="bold">₹{res?.price} </span>
                                                <span>from starting</span>
                                            </div>
                                            {/* <div className="details" dangerouslySetInnerHTML={{ __html: res?.description }}></div> */}
                                            <div className="details">We will design modern logo and unique for your next level business </div>
                                            <div className="discount">
                                                Save up to {res?.discount}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="grow-customer">
                    <h3 className='gradient-text'>Grow faster with help your customers</h3>
                    <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <div className="row">
                        <div className="col-4">
                            <div className="grow-customer-col">
                                <div className='grow-customer-img'>
                                    <img src={ratingReview} alt="ratingReview" className='img-fluid' />
                                </div>
                                <h5>Ratings & Reviews</h5>
                                <p>Collect reviews, Q&A and other content from your customers started.</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="grow-customer-col">
                                <div className='grow-customer-img'>
                                    <img src={salesMarketing} alt="salesMarketing" className='img-fluid' />
                                </div>
                                <h5>Sales and Marketing</h5>
                                <p>Use your user-generated content in sales and marketing. </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="grow-customer-col">
                                <div className='grow-customer-img'>
                                    <img src={customerExperience} alt="customerExperience" className='img-fluid' />
                                </div>
                                <h5>Customer Experience</h5>
                                <p>In the end, it's all about your customers. Build their trust and help.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category