import React from 'react'
import '../../../Scss/common.scss'
import '../Home/Home.scss'
import './portfolio.scss'

const PortfolioBanner = () => {
    return (
        <div className='container'>
            <div className="portfolio-section row align-items-center">
                <div className="col-lg-8">
                    <div className="">
                        <h2 className="heading gradient-text">Here Some of our finest-work. </h2>
                        <span className="text">A quick view of industry specific problems solved with design by the awesome team at Abstrak.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioBanner