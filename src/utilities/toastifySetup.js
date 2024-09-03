import { toast } from 'react-toastify';

export const showToast = (message) => {
    return toast(message)
}

export const showSuccessToast = (message) => {
    return toast.success(message)
}

export const showErrorToast = (message) => {
    return toast.error(message)
}

export { toast };
