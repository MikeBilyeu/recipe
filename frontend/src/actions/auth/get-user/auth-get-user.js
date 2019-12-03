import axios from "axios";
import { GET_USER, GET_ERRORS } from "../../types";

const getUser = () => async dispatch => {
  try {
    const { data } = await axios.get("/user");
    dispatch({
      type: GET_USER,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export default getUser;