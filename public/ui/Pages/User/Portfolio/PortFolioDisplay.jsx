import React from 'react'
import { BE_URL } from '../../../../config';
import "../Services/Services.scss"

const PortFolioDisplay = (props) => {

    const { data, centredModal, setCentredModal } = props;

    return (
        <div className="row">
            {
                data?.map((d, i) => {
                    return (
                        <div className="col-3">
                            <div className='portfolio-card cursor-pointer mt-5 w-100'>
                                <div className='portfolio-img' onClick={() => setCentredModal(!centredModal)}>
                                    <img src={BE_URL + d?.flagIcon} alt="minimalistLogo" className='img-fluid w-100' style={{ height: "218px" }} />
                                </div>
                                <div className='portfolio-content'>
                                    <h5>{d?.name}</h5>
                                    <p>{d?.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PortFolioDisplay