import axios from "axios";
import { add } from "../reducer/ratingSlice";

const { REACT_APP_API_URL } = process.env;

export const submitRating = (data) => async (dispatch) => {
  try {
    const param = {
      score: data.rating,
      review: data.review,
    };

    const resp = await axios.post(
      `${REACT_APP_API_URL}/product/6245b0414bb8b70aff189bc1/review`,
      param
    );

    if (resp.status === 200) {
      dispatch(add(param));
    }
  } catch (error) {
    // Dispatch error handling function here
  }
};
