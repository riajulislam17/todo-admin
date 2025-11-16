import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface ResourceHandler {
  method: "post" | "get" | "patch" | "delete" | "put";
  endpoint: string;
  data?: Record<string, unknown> | FormData;
  id?: string | number;
  isMultipart?: boolean;
  isFormUrlEncoded?: boolean;
  popupMessage?: boolean;
  popupText?: string;
}

export const handleResource = async ({
  method,
  endpoint,
  data,
  id,
  isMultipart,
  popupMessage,
  popupText,
}: ResourceHandler) => {
  const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);

  try {
    if (method === "delete") {
      const confirmDelete = window.confirm("Are You Sure To Delete ?");

      if (!confirmDelete) {
        return;
      }
    }

    const baseURL = process.env.NEXT_PUBLIC_BASE_API;
    let url = baseURL + endpoint;
    if (id) {
      url += `/${id}/`;
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (isMultipart) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const response = await axios.request({
      method,
      url,
      data,
      headers,
    });

    if (response && popupMessage) {
      toast.success(popupText || "Success!");
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : JSON.stringify(error.response?.data?.detail || error.response?.data?.message || "An error occurred");

      toast.error(errorMessage || "An unexpected error occurred.");
    } else {
      toast.error("An unexpected error occurred.");
    }
    throw error;
  }
};