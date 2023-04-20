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
    cancelButtonText:
      '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
  })
}
