import GithubContext from "../../context/github/GithubContext"
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const User = () => {

    const {getUser, user} = useContext(GithubContext);
    const {login} = useParams();

useEffect(() => {
    getUser(login);
}, []);

    return (
        <div>

        </div>
    )
}

export default User
