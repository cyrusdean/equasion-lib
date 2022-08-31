import { FiPlay } from 'react-icons/fi'
import './Notification.scss'
import Swal from 'sweetalert2'

// https://www.npmjs.com/package/sweetalert2
export default (title, text, timerSeconds = 4, icon = 'success') => {
  // @ts-ignore
  Swal.fire({
    position: 'top-end',
    // allowOutsideClick: true,
    allowEscapeKey: true,
    toast: true,
    title,
    text,
    icon, // error success info
    timer: timerSeconds * 1000,
    showConfirmButton: false,
    timerProgressBar: true,
    showCancelButton: true,
    cancelButtonText: 'x',
  })
}
