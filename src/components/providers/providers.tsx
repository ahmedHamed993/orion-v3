import React from 'react'
import { ToastContainer, Slide } from 'react-toastify';

type Props = {
    children:React.ReactNode;
}

const Providers = ({children}: Props) => {
  return (
    <>
        {children}
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
        />

    </>
  )
}

export default Providers