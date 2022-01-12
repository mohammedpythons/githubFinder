import {useContext } from 'react'
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/GithubContext';

const UserResult = () => {

const {users, isLoading} = useContext(GithubContext);


 ;

    return (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {!isLoading? users.map((user) => (
                <UserItem user={user} key={user.id} />
            )): <Spinner />}
        </div>
    )
}

UserResult.propTypes = {

}

export default UserResult
