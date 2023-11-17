import toast from "react-hot-toast";
import axios from "axios";
import { REQUEST_HEADERS } from "../store/consts.ts";

export const DELETE = async (url: string) => {
  try {
    await axios.delete(`http://localhost:8080/api/${url}`, REQUEST_HEADERS);
  } catch (e) {
    console.log(e);
    toast.error("Can't delete the data");
  }
};

export const POST = async (url: string, values: any) => {
  try {
    await axios.post(
      `http://localhost:8080/api/${url}`,
      values,
      REQUEST_HEADERS,
    );
  } catch (e) {
    console.log(e);
    toast.error("Can't post the data");
  }
};
