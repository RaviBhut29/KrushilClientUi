import React from 'react'
import '../../../Scss/common.scss'
import '../Home/Home.scss'
import './portfolio.scss'
// import "./Services.scss"
import PortfolioBanner from './PortfolioBanner'
import PortFolioList from './PortFolioList'


const portfolio = () => {
    return (
        <div className='portfolio'>
            <PortfolioBanner />
            <PortFolioList />
        </div>
    )
}

export default portfolio