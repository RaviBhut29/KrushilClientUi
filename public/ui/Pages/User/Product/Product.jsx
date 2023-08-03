import React, { useEffect, useState } from 'react'
import "./product.scss"
import '../Home/Home.scss'
import '../../../Scss/common.scss'
import productImg from '../../../Images/product-img.png'
import ratingReview from '../../../Images/rating-review.svg'
import salesMarketing from '../../../Images/sales-marketing.svg'
import customerExperience from '../../../Images/customer-experience.svg'

import { Share2, Star } from 'react-feather'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { GET_CATEGORIES } from "../../Admin/Category/CategoryQuery"
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Rate } from 'antd';
import { abbrNum } from './../../../Functions/abbrNum';
import rightTick from "../../../Images/right-tick.png"
import SpinnerComponent from './../../../Components/spinner/Fallback-spinner';
import ImageGallery from 'react-image-gallery';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const Product = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [open, setOpen] = useState('1');
    const [active, setActive] = useState("1");
    const [product, setProduct] = useState();

    const { data, loading } = useQuery(GET_CATEGORIES, {
        variables: { getAllCategoryId: id },
        fetchPolicy: "cache-and-network"
    })

    useEffect(() => {
        if (data?.getAllCategory) setProduct(data?.getAllCategory?.[0])
    }, [data])

    const toggleOpen = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const toggle = (tab) => {
        if (active !== tab) {
            setActive(tab);
        }
    };

    return (
        <div className='container'>
            {loading && <SpinnerComponent />}
            <div className='row product-wrap d-flex align-items-center'>
                <div className="col-8">
                    <div className='product-content-col'>
                        <p className='modern-text'>{product?.catagoryName}</p>
                        <h1>{product?.categoryTitle}</h1>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center '>
                            <Rate disabled allowHalf defaultValue={product?.rating ? Number(product?.rating) : 0} />
                        </div>
                        <div className='count-text d-flex align-items-center ms-1'>
                            <p className='mb-0'>{product?.rating ? product?.rating : 0}</p>
                            <p className='ms-1 mb-0'>|</p>
                            <p className='ms-1 mb-0'> {abbrNum(product?.ratignCount ? product?.ratignCount : 0, 3)}</p>
                        </div>
                        <ul className='ms-3'>
                            <li className='list-time'>
                                Avg. response time: Less than 2hr
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-4">
                    <div className="product-pricing-col">
                        <div className='row'>
                            <div className='col-11'>
                                <button className='conversation-btn w-100'>Start Conversation</button>
                            </div>
                            <div className='col-1 p-0'>
                                <div className='share-wrap w-100 h-100  '>
                                    <Share2 size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div>
                        {/* <ImageGallery
                            items={images}
                            thumbnailPosition="left"
                        /> */}
                    </div>
                </div>
                <div className="col-4">
                    <div className="pricing-card position-relative">
                        <div className='d-flex align-items-center justify-content-between mb-1 pricing-plan pb-1'>
                            <h4 className='m-0'>Pricing Plan</h4>
                            <h1 className='m-0 pink-text'>$49</h1>
                        </div>
                        <div className='pricing-card-body'>
                            <p className='green-text'>Save up to 5%</p>
                            <p className='grey-text'>All the basic features to boost your career</p>
                            <div>
                                <div className='d-flex align-items-center'>
                                    <img src={rightTick} alt="" className='mb-1 me-1' />
                                    <p className='bold-content'>1 Day Delivery</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <img src={rightTick} alt="" className='mb-1 me-1' />
                                    <p className='bold-content'>Unlimited Revisions</p>
                                </div>
                            </div>

                            <p className='capital-text'>Included Features</p>
                            <ul className='pricing-list'>
                                <li>
                                    <a href="#">
                                        4 concepts included
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        Logo Transparency
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Vector file
                                    </a>
                                </li>
                            </ul>
                            <button className='explore-btn mt-2' onClick={() => navigate(`/packages/${id}`)}>Explore all Package</button>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <Nav tabs style={{ marginTop: "-2rem" }}>
                        <NavItem>
                            <NavLink
                                active={active === "1"}
                                onClick={() => {
                                    toggle("1");
                                }}
                            >
                                Description
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === "2"}
                                onClick={() => {
                                    toggle("2");
                                }}
                            >
                                Review
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === "3"}
                                onClick={() => {
                                    toggle("3");
                                }}
                            >
                                FAQs
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent className="py-50" activeTab={active}>
                        <TabPane tabId="1">
                            <div className='mt-2 product-tab'>
                                <h6>Welcome to Community, non profit and charity logo design gig.</h6>
                                <p className='grey-text product-content-head'>Here in this gig I will exclusively provide creative and professional services for non profit logo designing. I have 5 years industrial experience in this field.</p>
                                <p className='grey-text product-content-head'>Your logo will be designed as per your brand requirements so that it may get the maximum attention of the audience.</p>
                                <p className='grey-text product-content-head'> Unique features of this gig.</p>
                                <ol className='product-num-list product-content-head'>
                                    <li className='grey-text'>Unlimited revisions until you say we love our design.</li>
                                    <li className='grey-text'>Modern fonts and ideas  according to requirements of your brand.</li>
                                    <li className='grey-text'>Cordial communication during whole design process so that we get your desired results.</li>
                                    <li className='grey-text'>Fast turnaround time to meet the deadlines and express delivery.</li>
                                    <li className='grey-text'>Logo pack of all file formats for the final logo and life time support guarantee.</li>
                                    <li className='grey-text'>Refund if you are not happy.</li>
                                </ol>
                                <div>
                                    <p className='yellow-text'>Note:</p>
                                    <ul className='note-content'>
                                        <li className='grey-text product-content-head'> I don’t design character or mascot logos.</li>
                                        <li className='grey-text product-content-head'> If you have any question contact me and never hesitate to ask.</li>
                                        <li className='grey-text product-content-head'> I can design professional logo for each and every industry.</li>
                                        <li className='grey-text product-content-head'> Order my gig and get started.</li>
                                    </ul>
                                </div>
                                {product?.formatIncluded?.length > 0 &&
                                    <div className='format-including mt-2 d-inline-block'>
                                        <p className='text-green'> Format included:</p>
                                        <div className='format-including-box d-flex align-items-center'>
                                            {
                                                product?.formatIncluded?.map((d, i) => <p className='m-0'>{d}</p>)
                                            }
                                        </div>
                                    </div>
                                }

                                <div className='mt-5'>
                                    <p className='recommended-text'>Recommended for you</p>
                                    <div className="row">
                                        <div className='col-6'>
                                            <div className="reco-card">
                                                <div className='w-100 h-100'>
                                                    <img src={productImg} alt="productImg" className='w-100 h-100' />
                                                </div>
                                                <div className='recommended-card-body'>
                                                    <div className='d-flex align-items-center justify-content-between reco-card-head'>
                                                        <h1>Typography logo</h1>
                                                        <p className='grey-text'>Like: Airbnb</p>
                                                    </div>
                                                    <p className='grey-text text-sm'><span className='orange-text'>₹2500</span>from Starting</p>
                                                    <p className='grey-text dark-text'>We will design modern logo and unique for your next level business </p>
                                                    <button className='yellow-btn'>Save up to 70% </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="reco-card">
                                                <div>
                                                    <img src={productImg} alt="productImg" className='w-100 h-100' />
                                                </div>
                                                <div className='recommended-card-body'>
                                                    <div className='d-flex align-items-center justify-content-between reco-card-head'>
                                                        <h1>Typography logo</h1>
                                                        <p className='grey-text'>Like: Airbnb</p>
                                                    </div>
                                                    <p className='grey-text text-sm'><span className='orange-text'>₹2500</span>from Starting</p>
                                                    <p className='grey-text dark-text'>We will design modern logo and unique for your next level business </p>
                                                    <button className='yellow-btn'>Save up to 70% </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </TabPane>
                        <TabPane tabId="2">
                            <div className='review-section mt-5'>
                                <div className='review-col-wrap'>
                                    <div className='review-col d-flex align-items-center'>
                                        <div className='review-img-wrap'>
                                            <img src={productImg} alt="productImg" className='w-100 h-100' />
                                        </div>
                                        <div className='review-col-head ms-1'>
                                            <h1 className='mb-0'>Esther Howard</h1>
                                            <div>
                                                <p className='grey-text'>United Kingdom</p>
                                            </div>
                                        </div>

                                    </div>
                                    <p className='dark-text my-1 review-content'>The seller was faster than I had expected and delivered a bunch of different options. From them choices I picked one and we refined it twice to get the perfect design for my studio. I recommend you make a feel board first before contacting logoflow and really nail down the concept on paper. Otherwise it's like walking in the dark and that's not good.</p>
                                    <div className='d-flex align-items-center '>

                                        <div className='d-flex align-items-center '>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                        </div>
                                        <div className='count-text d-flex align-items-center ms-1'>
                                            <p className='mb-0 me-1'>4.6</p>
                                            <p className='light-text mb-0'>| 23th january, 2022</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='review-col-wrap'>
                                    <div className='review-col d-flex align-items-center'>
                                        <div className='review-img-wrap'>
                                            <img src={productImg} alt="productImg" className='w-100 h-100' />
                                        </div>
                                        <div className='review-col-head ms-1'>
                                            <h1 className='mb-0'>Esther Howard</h1>
                                            <div>
                                                <p className='grey-text'>United Kingdom</p>
                                            </div>
                                        </div>

                                    </div>
                                    <p className='dark-text my-1 review-content'>The seller was faster than I had expected and delivered a bunch of different options. From them choices I picked one and we refined it twice to get the perfect design for my studio. I recommend you make a feel board first before contacting logoflow and really nail down the concept on paper. Otherwise it's like walking in the dark and that's not good.</p>
                                    <div className='d-flex align-items-center '>

                                        <div className='d-flex align-items-center '>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                        </div>
                                        <div className='count-text d-flex align-items-center ms-1'>
                                            <p className='mb-0 me-1'>4.6</p>
                                            <p className='light-text mb-0'>| 23th january, 2022</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='review-col-wrap'>
                                    <div className='review-col d-flex align-items-center'>
                                        <div className='review-img-wrap'>
                                            <img src={productImg} alt="productImg" className='w-100 h-100' />
                                        </div>
                                        <div className='review-col-head ms-1'>
                                            <h1 className='mb-0'>Esther Howard</h1>
                                            <div>
                                                <p className='grey-text'>United Kingdom</p>
                                            </div>
                                        </div>

                                    </div>
                                    <p className='dark-text my-1 review-content'>The seller was faster than I had expected and delivered a bunch of different options. From them choices I picked one and we refined it twice to get the perfect design for my studio. I recommend you make a feel board first before contacting logoflow and really nail down the concept on paper. Otherwise it's like walking in the dark and that's not good.</p>
                                    <div className='d-flex align-items-center '>

                                        <div className='d-flex align-items-center '>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                        </div>
                                        <div className='count-text d-flex align-items-center ms-1'>
                                            <p className='mb-0 me-1'>4.6</p>
                                            <p className='light-text mb-0'>| 23th january, 2022</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='review-col-wrap'>
                                    <div className='review-col d-flex align-items-center'>
                                        <div className='review-img-wrap'>
                                            <img src={productImg} alt="productImg" className='w-100 h-100' />
                                        </div>
                                        <div className='review-col-head ms-1'>
                                            <h1 className='mb-0'>Esther Howard</h1>
                                            <div>
                                                <p className='grey-text'>United Kingdom</p>
                                            </div>
                                        </div>

                                    </div>
                                    <p className='dark-text my-1 review-content'>The seller was faster than I had expected and delivered a bunch of different options. From them choices I picked one and we refined it twice to get the perfect design for my studio. I recommend you make a feel board first before contacting logoflow and really nail down the concept on paper. Otherwise it's like walking in the dark and that's not good.</p>
                                    <div className='d-flex align-items-center '>

                                        <div className='d-flex align-items-center '>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                            <div>
                                                <Star color='#FFC107' fill='#FFC107' className='ms-1' />
                                            </div>
                                        </div>
                                        <div className='count-text d-flex align-items-center ms-1'>
                                            <p className='mb-0 me-1'>4.6</p>
                                            <p className='light-text mb-0'>| 23th january, 2022</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="3">
                            <div className="faq-section my-5">
                                <div className='container'>

                                    <Accordion open={open} toggle={toggleOpen}>
                                        <AccordionItem>
                                            <AccordionHeader targetId="1">Why should i choose Flyses?</AccordionHeader>
                                            <AccordionBody accordionId="1">
                                                Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="2">How does it work?</AccordionHeader>
                                            <AccordionBody accordionId="2">
                                                Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="3">How can i believe on flyses before payment? </AccordionHeader>
                                            <AccordionBody accordionId="3">
                                                Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="4">How will this help to grow my business? </AccordionHeader>
                                            <AccordionBody accordionId="4">
                                                Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="5">Can i get my refund if i am not satisfied with work? </AccordionHeader>
                                            <AccordionBody accordionId="5">
                                                Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
                                            </AccordionBody>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                        </TabPane>

                    </TabContent>
                </div>
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

export default Product