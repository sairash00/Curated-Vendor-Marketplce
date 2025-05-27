import toast from "react-hot-toast";

type ToastType = "success" | "error";

export function showToast(message: string, type: ToastType = "success") {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    toast(message);
  }
}
