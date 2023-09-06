import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
export const ConfirmationModal = (status, title, text, btnText, defaultClass) => {
    let informationMessage = {
        title: title,
        text: text,
        icon: status,
        buttonsStyling: false
    }
    if (status !== 'success') {
        // informationMessage.showCancelButton = true,
        informationMessage.confirmButtonText = btnText
        informationMessage.customClass = {
            confirmButton: `btn btn-primary ${defaultClass}`,
            cancelButton: 'btn btn-outline-danger ml-1'
        }
    } else {
        informationMessage.customClass = {
            confirmButton: 'btn btn-success'
        }
    }
    return MySwal.fire(informationMessage).then(function (result) {
        return result.value;
    })
}

