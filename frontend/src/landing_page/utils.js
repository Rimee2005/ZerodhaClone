// utils.js
import { toast } from 'react-toastify';

export const handleError = (msg) => {
  toast.error(msg || "Something went wrong", {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};

export const handleSuccess = (msg) => {
  toast.success(msg || "Success!", {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};
