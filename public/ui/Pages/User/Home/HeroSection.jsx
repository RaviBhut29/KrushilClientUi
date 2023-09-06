import React from 'react'
import downloadCircle from '../../../Images/downloadCircle.svg'
import menuCircle from '../../../Images/menuCircle.svg'
import userImage from '../../../Images/userImage.png'
import heroContent from '../../../Images/hero-content.png'
import chart from '../../../Images/chart.png'
import { Button, Card, CardBody } from 'reactstrap'
const HeroSection = () => {
    return (
        <div className='container'>
            <div className="hero-section row align-items-center">
                <div className="col-lg-5">
                    <div className="branding">
                        <h2 className="heading gradient-text">Designing, Branding, Experiences and Connecting</h2>
                        <span className="text">Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.</span>
                        <div className="d-flex">
                            <Button color='primary' className='me-2'>Order Now</Button>
                            <Button className='btn msg-btn-outline'>Message us</Button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="cards">
                        <div>
                            <img src={heroContent} alt="heroContent" className='w-100' />
                        </div>
                        {/* <div className='position-relative'>
                            <Card className="userCard">
                                <CardBody className='position-relative d-flex flex-column align-items-center'>
                                    <div className="userImage"> <img src={userImage} alt="user Image" /></div>
                                    <p className="name">Amanda M. Data</p>
                                    <div className="growth">
                                        <p>Your Growth</p>
                                        <h3>3,000</h3>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="followerCard">
                                <CardBody>
                                    <div className="cardHeader">
                                        <span>Follower Growth</span>
                                        <div className="actions">
                                            <img src={menuCircle} alt="downloadCircle" />
                                            <img src={downloadCircle} alt="downloadCircle" />
                                        </div>
                                    </div>
                                    <div className="count">
                                        <p><span>16.2k</span> New Followers</p>
                                    </div>
                                    <img src={chart} alt="chart" />
                                </CardBody>
                            </Card>
                        </div> */}
                        {/* <div>
                                <Card className="mediaCard">
                                    <CardBody></CardBody>
                                </Card>
                                <Card className="lineCard">
                                    <CardBody></CardBody>
                                </Card>
                                <Card className="emojiCard">
                                    <CardBody></CardBody>
                                </Card>
                            </div> */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <div className='portfolio-card'>
                        <div className='portfolio-img'>
                            <img src={""} alt="minimalistLogo" className='img-fluid' />
                        </div>
                        <div className='portfolio-content'>
                            <h5>Minimalist Logo</h5>
                            <p>We will design modern logo and unique for your next level business</p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className='portfolio-card'>
                        <div className='portfolio-img'>
                            <img src={""} alt="minimalistLogo" className='img-fluid' />
                        </div>
                        <div className='portfolio-content'>
                            <h5>Minimalist Logo</h5>
                            <p>We will design modern logo and unique for your next level business</p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className='portfolio-card'>
                        <div className='portfolio-img'>
                            <img src={""} alt="minimalistLogo" className='img-fluid' />
                        </div>
                        <div className='portfolio-content'>
                            <h5>Minimalist Logo</h5>
                            <p>We will design modern logo and unique for your next level business</p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className='portfolio-card'>
                        <div className='portfolio-img'>
                            <img src={""} alt="minimalistLogo" className='img-fluid' />
                        </div>
                        <div className='portfolio-content'>
                            <h5>Minimalist Logo</h5>
                            <p>We will design modern logo and unique for your next level business</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroSection