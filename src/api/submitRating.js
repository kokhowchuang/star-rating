import axios from "axios";
import { add } from "../reducer/ratingSlice";

const { REACT_APP_API_URL } = process.env;

export const submitRating = (data) => async (dispatch) => {
  try {
    const formDataParams = new FormData();

    formDataParams.append("score", data.score);
    formDataParams.append("review", data.review);

    const resp = await axios.post(
      `${REACT_APP_API_URL}/product/id/review`,
      formDataParams
    );

    if (resp.status === 200) {
      dispatch(add(resp.data));
    }
  } catch (error) {
    // Dispatch error handling function here
  }
};
