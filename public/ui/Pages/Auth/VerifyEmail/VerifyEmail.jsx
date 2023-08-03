import React from 'react'
import './VerifyEmail.scss';
import logosmall from '../../../Images/logo-small.svg';
import pinkCheck from '../../../Images/pinkMail.svg';
import AuthLayout from '../../../Components/AuthLayout/AuthLayout';
import { Button } from 'reactstrap';
import Back from '../../../Components/BackBtn/Back';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL } from './VerifyEmailMutation';
import { notification } from 'antd';
import { FormatError } from '../../../Components/Common/FormatError';


const VerifyEmail = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const tempArray = id?.split("_")

    const [verifyEmailMutation] = useMutation(VERIFY_EMAIL)

    const VerifyEmailHandler = () => {
        verifyEmailMutation({
            variables: {
                verifyEmailId: tempArray[0],
                code: tempArray[1],
            }
        }).then((response) => {
            if (response.data.verifyEmail == true) {
                notification.success({
                    message: `Your email is verified successfully`,
                    placement: "top",
                });
                navigate("/verify-success");
            } else {
                notification?.error({ message: "something wrong ...", placement: "top" })
            }
        }).catch((error) => {
            notification?.error({ message: FormatError(error), placement: "top" })
        })
    }

    return <AuthLayout>
        <div className="ResetForm" key={Math.random(6)}>
            <div className="header d-flex align-items-center">
                {/* <Back onClick={() => navigate("/login")} /><img src={logosmall} alt="logo" /> */}
            </div>
            <div className="description d-flex flex-column justify-content-center align-items-center">
                <img src={pinkCheck} alt="successCheckmark" className='mt-2' />
                <h2>Verify Email 🔒</h2>
                <p className='m-0'>Click this  button to verify your email</p>
                {/* <p className='m-0'>to you.</p> */}
            </div>
            <Button style={{ marginTop: "33px" }} color='primary' className='w-100 btn login-btn' onClick={() => { VerifyEmailHandler() }}> Verify </Button>
        </div>
    </AuthLayout>
}

export default VerifyEmail