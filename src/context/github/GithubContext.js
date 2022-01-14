import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext([]);

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (name) => {
    setLoading();
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/search/users?q=${name}`
    );

    const data = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: data.items,
    });
  };

  // add user
  const getUser = async (user) => {
    setLoading();
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${user}`
    );
    if (response.status === 404) {
      return (window.location = "/notfound");
    }

    const data = await response.json();

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };

  // set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // clear users
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
