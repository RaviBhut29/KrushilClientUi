import React from 'react'
import adminIcon from '../../../Images/admin-icon.png'
import securityIcon from '../../../Images/security-icon.png'
import communityIcon from '../../../Images/community-icon.png'
import sheildIcon from '../../../Images/sheild-icon.png'


const AboutSection = () => {
    return (
        <div className='about-section container'>
            <div className="top-area">
                <h3 className='gradient-text head'>What's great about us?</h3>
                <p>We derive from the culture of obeying regulations and follow the path of staying true to our core values. In order to level up profitability, we never choose unethical practices.
                </p>
            </div>
            <div className="bottom-area">
                <div className="row">
                    <div className="col-md-4">
                        <div className="about-card">
                            <div>
                                <img src={communityIcon} />
                            </div>
                            <h5 className='mt-3'>Community Support</h5>
                            <p>General Committee for National and General Association Activities for General Society Association</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="about-card">
                            <div>
                                <img src={sheildIcon} />
                            </div>
                            <h5 className='mt-3'>Security First</h5>
                            <p>Website security is thus important to protect your business, brand, and website.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="about-card">
                            <div>
                                <img src={securityIcon} />
                            </div>
                            <h5 className='mt-3'>24/7 Admin Support</h5>
                            <p>24×7 Internet Technologies having experienced team of Designer</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* <div className='container'>
                <div className="contact-us-section">
                    <div className='row'>
                        <div className="col-md-4">
                            <h3 className='contact-head'>126</h3>
                            <h6>Projects Done</h6>
                        </div>
                        <div className="col-md-4">
                            <h3 className='contact-head'>4+</h3>
                            <h6> Years Experience</h6>
                        </div>
                        <div className="col-md-4">
                            <h3 className='contact-head'>98%</h3>
                            <h6>Happy Customers</h6>
                        </div>
                    </div>
                    <div className='contact-text'>
                        <h3>Want to start a Project With us?</h3>
                        <p>Enter your email address to receive all news from our
                            awesome services and offers.</p>
                        <button className='btn btn-primary'>Contact Us</button>
                    </div>

                </div>
            </div> */}
        </div>


    )
}

export default AboutSection