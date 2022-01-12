import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext([]);

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
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

  // set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // clear users
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
