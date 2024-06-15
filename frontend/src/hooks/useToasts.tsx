import { toast } from "sonner";

export default function useToasts() {
  function getToastError(message?: string) {
    return toast.error(message ?? "Something went wrong! Please try again.", {
      duration: 5000,
      style: {
        color: "red",
        borderRadius: "0.5rem",
      },
    });
  }

  function getToastWarning(message: string) {
    return toast.warning(message, {
      duration: 5000,
      style: {
        color: "orange",
        borderRadius: "0.5rem",
      },
    });
  }

  function getSuccessToast(message: string) {
    return toast.success(message, {
      duration: 5000,
      classNames: {
        title: " text-green-900",
      },
      style: {
        borderRadius: "0.5rem",
        color: "green",
      },
    });
  }

  return { getSuccessToast, getToastError, getToastWarning };
}
