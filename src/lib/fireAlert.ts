import { enqueueSnackbar } from "notistack";
export const fireAlert = (
  message: string,
  variant: "success" | "error" | "warning" | "info",
) => {
  return enqueueSnackbar(message, {
    variant: variant,
  });
};
