"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <>
      <SessionProvider>
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
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        />
      </SessionProvider>
    </>
  );
};

export default Providers;
