import React from 'react'
import { Button, Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import userImage from '../../../Images/userImage.png'
import rightArrow from '../../../Images/rightarrow.svg'
import checkLogo from '../../../Images/checkLogo.svg'
import Profilebig from '../../../Images/Profilebig.png'
import randomDots from '../../../Images/24.svg'
const ProfileSection = () => {
    return (
        <div className="profile-section container">
            <div className="row">
                <div className="col-md-6">
                    <div className="textContainer">
                        <h3 className="heading gradient-text">Getting work done has never been easier</h3>
                        <ul>
                            <li>Get matched with expert designers in minutes</li>
                            <li>Dedicated 24/7 customer service team</li>
                            <li>Money back guarantee and anti-fraud protection</li>
                        </ul>
                        <Button className='blue-btn'>About Flyses</Button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="cardContainer position-relative">
                        <Card className='client-card'>
                            <CardBody className='position-relative'>
                                <img src={checkLogo} alt="checkmark Logo" className='green-check-mark' />
                                <h3>100+ Trusted Clients</h3>
                                <div className="profiles">
                                    <div className="profile">
                                        <img src={userImage} alt="" />
                                        <div className="info">
                                            <p>Ben Stokes</p>
                                            <span>Mentor of Web Design</span>
                                        </div>
                                    </div>
                                    <div className="profile">
                                        <img src={userImage} alt="" />
                                        <div className="info">
                                            <p>Hardik Pandya</p>
                                            <span>Mentor of Web Design</span>
                                        </div>
                                    </div>
                                    <div className="profile">
                                        <img src={userImage} alt="" />
                                        <div className="info">
                                            <p>Joe Root</p>
                                            <span>Mentor of UI/UX</span>
                                        </div>
                                    </div>

                                </div>
                                <Link to="#" className='d-flex align-items-center'>See More <img src={rightArrow} alt="right" /></Link>
                            </CardBody>
                        </Card>
                        <div className="dots" style={{ backgroundImage: `url(${randomDots})` }}></div>
                        <Card className='profile-card'>
                            <CardBody className='d-flex justify-content-center align-items-center flex-column'>
                                <img src={Profilebig} alt="userImage" />
                                <h3>Vishal Ponkiya</h3>
                                <span>Professional Logo Designer</span>
                                <button className='green-btn'>CONTACT</button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileSection