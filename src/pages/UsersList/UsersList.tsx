import React from 'react';
import Master from '../../layout/Master';
import Classes from './UsersList.module.scss';
import UsersInfoList  from '../../components/UsersInfoList/UsersInfoList'
export type UsersListProps = {

}

const UsersList: React.FunctionComponent<UsersListProps> = (props) => {
    return <Master>
        <UsersInfoList />
    </Master>
}

export default UsersList;