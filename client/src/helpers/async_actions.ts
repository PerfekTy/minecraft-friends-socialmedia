import axios from "axios";
import { useToken } from "../../hooks/useToken.ts";
import toast from "react-hot-toast";

const { token } = useToken();

const POST_REQUEST_HEADERS = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const GET = async (url: string | undefined) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/${url}`,
      POST_REQUEST_HEADERS,
    );
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Can't fetch the data");
  }
};

export const POST = async (url: string, values: any) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/api/${url}`,
      values,
      POST_REQUEST_HEADERS,
    );
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Can't post the data");
  }
};

export const DELETE = async (url: string) => {
  try {
    await axios.delete(
      `http://localhost:8080/api/${url}`,
      POST_REQUEST_HEADERS,
    );
  } catch (error) {
    console.log(error);
    toast.error("Can't delete data");
  }
};
