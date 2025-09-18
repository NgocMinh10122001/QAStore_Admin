"use client"

import { Toaster, ToastOptions } from 'react-hot-toast';


export const ToastProvider = ({...props}: ToastOptions) => {
    return <Toaster {...props}/>
}