import axios from "axios";
import { fetch } from "../reducer/ratingSlice";

const { REACT_APP_API_URL } = process.env;

export const getRating = (data) => async (dispatch) => {
  try {
    const resp = await axios.get(
      `${REACT_APP_API_URL}/product/6245b0414bb8b70aff189bc1/reviews`
    );

    if (resp.status === 200) {
      dispatch(fetch(resp.data));
    }
  } catch (error) {
    // Dispatch error handling function here
  }
};
