import React from 'react'
import pen from '../../../Images/pen.svg'
import star from '../../../Images/star.svg'
import branding from '../../../Images/branding.svg'
import { Button, Card, CardBody } from 'reactstrap'
const ExploreSection = () => {
    return (
        <div className="exploreCategories container">
            <h3 className='head gradient-text'>Explore By Category</h3>
            <p className='subtext'>Explore all the all services by category and find perfect and suitable service for you badly need</p>
            <div className="brandingCards row">
                <div className="col-lg-4">
                    <div className="brands-card">
                        <img src={star} alt="star" />
                        <h3>Logo Design</h3>
                        <p>Stand out from the crowd with a <strong>logo</strong> that fits your brand personality.</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="brands-card">
                        <img src={branding} alt="star" />
                        <h3>Branding</h3>
                        <p>Go beyond the logo to establish your brand's <strong>identity</strong>,<strong>colors</strong>, and <strong>Fonts</strong></p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="brands-card">
                        <img src={pen} alt="star" />
                        <h3>Graphic Design</h3>
                        <p>Do social media better than the rest with custom-designed <strong> skins</strong>, <strong>avatars</strong> & more</p>
                    </div>
                </div>
            <Button  className='blue-btn d-flex align-items-center justify-content-center'>See all</Button>
            </div>
        </div>
    )
}

export default ExploreSection