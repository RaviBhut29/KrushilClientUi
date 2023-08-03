import React from 'react'
import { ChevronLeft } from 'react-feather'
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate = useNavigate();
    const divStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "34px",
        height: "34px",
        border: "1px solid  #ADB5BD",
        borderRadius: "5px",
        marginRight: "21px",
    }
    const svgStyle = {
        width: "25px",
        height: "25px"
    }

    return (<div style={divStyle} className="chevron-icon cursor-pointer" onClick={() => navigate(-1)}><ChevronLeft style={svgStyle} size={16} /></div>)
}
export default Back