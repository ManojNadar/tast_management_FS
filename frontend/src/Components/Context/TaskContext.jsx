import React, { createContext, useEffect, useReducer } from "react";
import api from "../AuthConfig/Api";

export const MyContext = createContext();
const initialState = { currentuser: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentuser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentuser: null,
      };

    default:
      return state;
  }
};
const TaskContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);

  const login = (userData, token) => {
    localStorage.setItem("tasktoken", JSON.stringify(token));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem("tasktoken");
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const token = JSON.parse(localStorage.getItem("tasktoken"));
        const response = await api.post("/currentuser", { token });
        if (response.data.success) {
          // console.log(response?.data?.currentuser, "currentuser");
          dispatch({
            type: "LOGIN",
            payload: response?.data?.currentuser,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentUser();
  }, []);

  return (
    <MyContext.Provider value={{ state, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export default TaskContext;
