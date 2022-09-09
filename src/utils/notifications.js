import { toast } from "react-toastify";

export const successMsg = (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 2000,
    });
};

export const errorMsg = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    });
};
