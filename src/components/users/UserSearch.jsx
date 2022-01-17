import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubAction";
const UserSearch = () => {
  const { users, dispatch } = useContext(GithubContext);
  const {setAlert} = useContext(AlertContext);

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      // alert("please enter something!");
      setAlert("please Enter something", "error");
    } else {
      dispatch({type: "SET_LOADING"})
      const users = await searchUsers(name);
      dispatch({
        type: "GET_USERS",
        payload: users
      })

    }

    setName("");
  };
const clearUsers = () => dispatch({ type: "CLEAR_USERS" });
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <button
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                type="submit"
              >
                go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={clearUsers}>
            clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
