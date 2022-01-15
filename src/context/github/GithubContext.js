import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext([]);

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
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

  // get user repos
  const getRepos = async (user) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${user}/repos?${params}`
    );

    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
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
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
