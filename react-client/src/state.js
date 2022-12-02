// @ts-check
import { createContext, useContext, useReducer } from "react";

/**
 * @typedef {{
 *  username: string
 *  avatar: string
 * }} User
 *
 * @typedef {{
 *  id: string
 *  from: string
 *  timestamp: string
 *  message: string
 * }} Message
 *
 * @typedef {{
 *  partner: User
 *  messages: Message[]
 * }} State
 *
 * @param {State} state
 * @param {{type: string; payload: any}} action
 * @returns {State}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PARTNER": {
      return {
        partner: action.payload.partner,
        messages: action.payload.messages,
      };
    }
    default:
      return state;
  }
};

/**@type {State} */
const initialState = {
  partner: {
    username: "",
    avatar: "",
  },
  messages: [],
};

const useAppStateContext = () => {
  return useReducer(reducer, initialState);
};

// @ts-ignore
export const AppContext = createContext();

/**
 * @returns {[
 *  State,
 *  React.Dispatch<{
 *   type: string;
 *   payload: any;
 * }>
 * ]}
 */
export const useAppState = () => {
  const [state, dispatch] = useContext(AppContext);
  return [state, dispatch];
};

export default useAppStateContext;
