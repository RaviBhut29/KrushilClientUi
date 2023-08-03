import React from 'react'
import cloud from '../../Images/cloud.svg'
import './index.scss'
const AuthLayout = (props) => {
    return (<div className='auth-layout '>

        <img src={cloud} alt="cloud" className='cloud' />
        <img src={cloud} alt="cloud" className='cloud' />
        <img src={cloud} alt="cloud" className='cloud' />
        <img src={cloud} alt="cloud" className='cloud' />
        <img src={cloud} alt="cloud" className='cloud' />
        <img src={cloud} alt="cloud" className='cloud' />

        <div className="content">
            {props.children}
        </div>

    </div>)
}

export default AuthLayout