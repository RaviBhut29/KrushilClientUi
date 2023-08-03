import React from 'react'
import "./Services.scss"
import '../Home/Home.scss'
import '../../../Scss/common.scss'
import ServiceBanner from './ServiceBanner'
import ServiceBox from './ServiceBox'


const Services = () => {
    return (
        <div className='service'>
            <ServiceBanner />
            <ServiceBox />
        </div>
    )
}

export default Services