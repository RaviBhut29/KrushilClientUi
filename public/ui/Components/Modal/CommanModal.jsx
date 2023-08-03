import { Modal } from 'reactstrap'
import "./_modal.scss"

const CommanModal = (props) => {
    return (
        <Modal
            isOpen={props.modal}
            toggle={() => props.toggleHandler()}
            className={props.className}
            backdrop="static"
        >
            {props.children}
        </Modal >
    )
}

export default CommanModal;
