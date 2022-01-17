import axios from "axios";

const github = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_URL,
});

// get search results;
export const searchUsers = async (name) => {
  const response = await github.get(`/search/users?q=${name}`);

  return response.data.items;
};

// get user and repos

export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);

  if (user.status === 404) {
    return (window.location = "/notfound");
  }

  return { user: user.data, repos: repos.data };
};
