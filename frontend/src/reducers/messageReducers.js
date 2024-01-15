import { RESET_MESSAGE, SET_MESSAGE } from "../constants/message_constants";

export const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        message: action.message,
        error: action.error,
        variant: action.variant,
      };

    case RESET_MESSAGE:
      return {};

    default:
      return state;
  }
};
