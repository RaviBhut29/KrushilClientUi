import React from 'react'
import ratingReview from '../../../Images/rating-review.svg'
import salesMarketing from '../../../Images/sales-marketing.svg'
import customerExperience from '../../../Images/customer-experience.svg'
import { GET_ALL_SERVICE } from './query'
import { useQuery } from '@apollo/client'
import Image from "../../../Components/ImageComp/Image";
import "./Services.scss"
import '../Home/Home.scss'
import '../../../Scss/common.scss'
import { useNavigate } from 'react-router-dom'
import { BE_URL } from '../../../../config'

const ServiceBox = () => {
    const navigate = useNavigate();
    const { data: services, loading } = useQuery(GET_ALL_SERVICE, {
        variables: {},
        fetchPolicy: "cache-and-network"
    })
    return (
        <div className="service-categories container">
            <div className="branding-cards row">
                {
                    services?.getAllService?.map((res) => {
                        return (
                            <div className="col-lg-4 mt-4" onClick={() => { navigate(`/category/${res?.id}`) }} key={res?.id}>
                                <div className="brands-card">
                                    <Image src={BE_URL + res?.flagIcon} alt="Icon" />
                                    <h3>{res?.serviceName}</h3>
                                    <p>{res?.description}</p>
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

    )
}

export default ServiceBox