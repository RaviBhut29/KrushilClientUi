import './personalspinner.scss'
const PersonalSpinner = () => {
    return (
        <div className='fallback-spinner personalspinner vh-70 d-flex align-items-center justify-content-center'>
            <div className='loading component-loader'>
                <div className='effect-1 effects'></div>
                <div className='effect-2 effects'></div>
                <div className='effect-3 effects'></div>
            </div>
        </div>
    )
}

export default PersonalSpinner
