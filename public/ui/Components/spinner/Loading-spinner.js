import "./app-loader.scss"
import "./loader.scss"
const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner vh-70 d-flex align-items-center justify-content-center'>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default ComponentSpinner
