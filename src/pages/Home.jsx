import { Fragment } from "react"
import UserResult from "../components/users/UserResult"
import UserSearch from "../components/users/UserSearch"

const Home = () => {
    return (
        <Fragment>

            <UserSearch />
            <UserResult />

        </Fragment>
    )
}

export default Home
