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
      // update state with messages between user and selected chat-partner
      return {
        ...state,
        partner: action.payload.partner,
        messages: action.payload.messages,
      };
    }
    case "ADD_CHATS": {
      // update state with all the user's recenct chats
      return {
        ...state,
        chats: action.payload
          .map((c) => {
            return {
              ...c,
              snippet: toSnippet(c.snippet),
            };
          })
          .sort((a, b) => {
            return new Date(b.timestamp) > new Date(a.timestamp);
          }),
      };
    }
    case "ADD_MESSAGE": {
      // update the state of the current chat with a new message
      const msgs = [...state.messages];
      msgs.push(action.payload);
      return {
        ...state,
        messages: msgs,
      };
    }
    case "UPDATE_CHATS": {
      //
      let chats = [...state.chats];
      // 1. check if chat to be updated already exists
      const chat = chats.find(
        (x) => x.user.username === action.payload.user.username
      );

      //2. if it does, remove it
      if (chat) {
        chats = chats.filter((x) => x !== chat);
      }

      // 3. put the updated chat at the beginning of chats
      chats.unshift({
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
      // reset to an empty state
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
