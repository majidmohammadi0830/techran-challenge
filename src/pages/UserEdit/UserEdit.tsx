import React from 'react';
import Classes from './Edit.module.scss';
import { Navigate, useParams } from 'react-router';
import UserInfoForm from '../../components/UserInfoForm/UserInfoForm';
import Master from '../../layout/Master';

export type UserEditProps =  {

}

const UserEdit: React.FunctionComponent<UserEditProps> = (props) => {
    const params = useParams();
    const id = parseInt(params["id"]!);
    return <Master>
        <UserInfoForm formType="Edit" id={id} />
    </Master>
}

export default UserEdit;