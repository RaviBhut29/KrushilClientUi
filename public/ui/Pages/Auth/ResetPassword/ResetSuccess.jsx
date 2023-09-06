import React from 'react'
import './ResetPassword.scss';
import logosmall from '../../../Images/logo-small.svg';
import pinkCheck from '../../../Images/pinkCheck.svg';
import AuthLayout from '../../../Components/AuthLayout/AuthLayout';
import { Button } from 'reactstrap';
import Back from '../../../Components/BackBtn/Back';
import { useNavigate } from 'react-router-dom';


const ResetSuccess = () => {

    const navigate = useNavigate()
    return <AuthLayout>
        <div className="ResetForm" key={Math.random(6)}>
            <div className="header d-flex align-items-center">
                <Back onClick={() => navigate("/login")} /><img src={logosmall} alt="logo" /></div>
            <div className="description d-flex flex-column justify-content-center align-items-center">
                <img src={pinkCheck} alt="successCheckmark" className='mt-2' />
                <h2>Password reset</h2>
                <p className='m-0'>Your password has been successfully reset, </p>
                <p className='m-0'>Click below to login magically.</p>
            </div>
            <Button style={{ marginTop: "33px" }} color='primary' className='w-100 btn login-btn' onClick={() => { navigate('/login') }}> Go to Login </Button>
        </div>
    </AuthLayout>
}

export default ResetSuccess