import axios from "axios";

import { MY_CART_API } from "../../api";
import {
  GET_CART,
  ADD_PLANT_TO_CART,
  REMOVE_PLANT_FROM_CART,
  EMPTY_CART,
  UNAUTHORIZED_ACCESS,
} from "../actions/types";
import { tokenConfig } from "../../utils";

// Get Cart
export const getCart = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  axios
    .get(MY_CART_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
    });
};

// Add Plant Cart
export const addPlantToCart = (plantId) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  const plantIds = getState().cart.cart.plants;

  axios
    .patch(
      MY_CART_API,
      { plants: [...plantIds, plantId] },
      tokenConfig(accessToken)
    )
    .then((res) => {
      dispatch({
        type: ADD_PLANT_TO_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
    });
};

// Remove Plant fROM Cart
export const removePlantFromCart = (plantId) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  const plants = getState().cart.cart.plants;
  const plantIds = plants.filter((prevPlantId) => prevPlantId !== plantId);

  axios
    .patch(MY_CART_API, { plants: plantIds }, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: REMOVE_PLANT_FROM_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
    });
};

// Empty Cart
export const emptyCart = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  axios
    .patch(MY_CART_API, { plants: [] }, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: EMPTY_CART,
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
    });
};
