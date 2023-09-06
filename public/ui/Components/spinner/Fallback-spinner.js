// ** Logo
import './loader.scss'

const SpinnerComponent = () => {
    return (
        <div className='fallback-spinner vh-100 d-flex flex-column justify-content-center' style={{ position: "relative" }}>
            <div className="position-relative">
                {/* <img className='fallback-logo' height="90px" width="150px" src={logo} alt='logo' style={{ position: "inherit", top: 0 }} /> */}
                <div className='loading' style={{ position: "absolute", top: "80% ", }}>
                    <div className='effect-1 effects'></div>
                    <div className='effect-2 effects'></div>
                    <div className='effect-3 effects'></div>
                </div>
            </div>
        </div >
    )
}

export default SpinnerComponent
