// @ts-check
import { createContext, useContext, useReducer } from "react";
import { toSnippet } from "./utils";

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
 *  user: User
 *  snippet: string
 *  timestamp: string
 * }} Chat
 *
 * @typedef {{
 *  partner: User
 *  messages: Message[]
 *  chats: Chat[]
 * }} State
 *
 * @param {State} state
 * @param {{type: string; payload: any}} action
 * @returns {State}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CHAT": {
      return {
        ...state,
        partner: action.payload.partner,
        messages: action.payload.messages,
      };
    }
    case "ADD_CHATS": {
      return {
        ...state,
        chats: action.payload.map((c) => {
          return {
            ...c,
            snippet: toSnippet(c.snippet),
          };
        }),
      };
    }
    case "ADD_MESSAGE": {
      const msgs = [...state.messages];
      msgs.push(action.payload);
      return {
        ...state,
        messages: msgs,
      };
    }
    case "UPDATE_CHATS": {
      let chats = [...state.chats];
      const chat = chats.find(
        (x) => x.user.username === action.payload.user.username
      );

      if (chat) {
        chats = chats.filter((x) => x !== chat);
      }

      chats.push({
        user: action.payload.user,
        snippet: toSnippet(action.payload.snippet),
        timestamp: action.payload.timestamp,
      });

      return {
        ...state,
        chats: chats,
      };
    }
    case "CLEAR": {
      return initialState;
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
  chats: [],
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
